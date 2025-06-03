import React, { useMemo } from "react";
import clsx from "clsx";

interface MonthCardProps {
  year: number;
  month: number;
  today: Date;
  onMonthSelect: (month: number) => void;
}

export const MonthCard: React.FC<MonthCardProps> = ({
  year,
  month,
  today,
  onMonthSelect,
}) => {
  const { monthName, days } = useMemo(() => {
    const date = new Date(year, month, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = date.getDay();
    const dayArray: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) dayArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) dayArray.push(i);
    return { monthName, days: dayArray };
  }, [year, month]);

  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  return (
    <div
      className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={() => onMonthSelect(month)}
    >
      <div
        className={clsx(
          "text-sm font-semibold text-center mb-2",
          isCurrentMonth ? "text-blue-600" : "text-gray-700"
        )}
      >
        {monthName}
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-gray-500">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-xs mt-1">
        {days.map((day, index) => {
          const isToday = isCurrentMonth && day === today.getDate();
          return (
            <div
              key={index}
              className={clsx(
                "w-5 h-5 flex items-center justify-center rounded-full",
                isToday && "bg-blue-500 text-white"
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};
