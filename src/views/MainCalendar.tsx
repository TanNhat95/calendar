import React, { useMemo } from "react";
import { Event } from "../types/event";
import { NavigationBar } from "../components/NavigationBar";
import { DayRow } from "../components/DayRow";
import {
  generateCalendarDays,
  formatMonthYear,
  getPreviousMonth,
  getNextMonth,
} from "../utils/dateUtils";

interface MainCalendarProps {
  events: Event[];
  viewDate: Date;
  onDateSelect: (date: Date) => void;
  onDateDoubleClick: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  mainView: "month" | "year";
  onMainViewChange: (view: "month" | "year") => void;
}

export const MainCalendar: React.FC<MainCalendarProps> = ({
  events,
  viewDate,
  onDateSelect,
  onDateDoubleClick,
  onMonthChange,
  mainView,
  onMainViewChange,
}) => {
  const { weeks, monthYear } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthYearLabel = formatMonthYear(viewDate, "long");
    const days = generateCalendarDays(year, month);
    const weeksData = Array.from({ length: 6 }, (_, i) =>
      days.slice(i * 7, (i + 1) * 7)
    );
    return { weeks: weeksData, monthYear: monthYearLabel };
  }, [viewDate]);

  return (
    <div className="bg-white flex flex-col rounded-md shadow-md border-2">
      <NavigationBar
        month={monthYear}
        onPrev={() => onMonthChange(getPreviousMonth(viewDate))}
        onNext={() => onMonthChange(getNextMonth(viewDate))}
        onToday={() => onMonthChange(new Date())}
        mainView={mainView}
        onMainViewChange={onMainViewChange}
      />
      <div className="grid grid-cols-7 gap-1 text-center text-gray-300 text-sm p-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>
      {weeks.map((week, index) => (
        <DayRow
          key={index}
          days={week}
          today={new Date()}
          events={events}
          onDateSelect={onDateSelect}
          onDateDoubleClick={onDateDoubleClick}
        />
      ))}
    </div>
  );
};
