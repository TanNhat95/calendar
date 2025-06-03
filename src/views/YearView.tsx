import React from "react";
import { MonthCard } from "../components/MonthCard";
import { ArrowLeftButton, ArrowRightButton } from "../components/ArrowButton";

interface YearViewProps {
  year: number;
  onMonthSelect: (month: number) => void;
  onYearChange: (year: number) => void;
}

export const YearView: React.FC<YearViewProps> = ({
  year,
  onMonthSelect,
  onYearChange,
}) => {
  const today = new Date();
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-center items-center mb-4">
        <ArrowLeftButton onPress={() => onYearChange(year - 1)} />
        <span className="text-xl font-bold">{year}</span>
        <ArrowRightButton onPress={() => onYearChange(year + 1)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {months.map((month) => (
          <MonthCard
            key={month}
            year={year}
            month={month}
            today={today}
            onMonthSelect={onMonthSelect}
          />
        ))}
      </div>
    </div>
  );
};
