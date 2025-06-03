import React, { useState, useMemo } from "react";
import { DayCell } from "../components/DayCell";
import { NavigationBar } from "../components/NavigationBar";
import {
  generateCalendarDays,
  formatMonthYear,
  isCurrentDay,
  getPreviousMonth,
  getNextMonth,
  parseDateFromString,
} from "../utils/dateUtils";

interface MiniCalendarProps {
  onDateSelect: (date: Date) => void;
  onDateDoubleClick: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  onDateSelect,
  onDateDoubleClick,
  onMonthChange,
}) => {
  const [viewDate, setViewDate] = useState(new Date());

  const { days, monthYear } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthYearLabel = formatMonthYear(viewDate, "short");
    const generatedDays = generateCalendarDays(year, month);
    return { days: generatedDays, monthYear: monthYearLabel };
  }, [viewDate]);

  const handlePrev = () => {
    const newDate = getPreviousMonth(viewDate);
    setViewDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = getNextMonth(viewDate);
    setViewDate(newDate);
    onMonthChange?.(newDate);
  };

  return (
    <div className="bg-white p-8 pb-4 rounded-md rounded-b-none border-2 shadow-lg">
      <NavigationBar
        month={monthYear}
        onPrev={handlePrev}
        onNext={handleNext}
        isMini
      />
      <div className="grid grid-cols-7 gap-y-2 text-center text-gray-300 text-xs justify-items-center pt-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
        {days.map((dayObj) => (
          <div key={dayObj.date} className="flex justify-center items-center">
            <DayCell
              day={dayObj.day}
              isOutsideMonth={dayObj.isOutsideMonth}
              isCurrentDay={isCurrentDay(dayObj.date)}
              date={dayObj.date}
              onClick={() =>
                dayObj.date && onDateSelect(parseDateFromString(dayObj.date))
              }
              onDoubleClick={() =>
                dayObj.date &&
                onDateDoubleClick(parseDateFromString(dayObj.date))
              }
              shape="circle"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
