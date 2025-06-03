import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Event } from "../types/event";

type DayCellShape = "square" | "circle";

interface DayCellProps {
  day: number;
  date: string;
  isCurrentDay?: boolean;
  isOutsideMonth?: boolean;
  shape?: DayCellShape;
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
  events?: Event[];
}

export const DayCell = React.forwardRef<
  HTMLDivElement,
  DayCellProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      day,
      date,
      isCurrentDay = false,
      isOutsideMonth = false,
      shape = "square",
      onClick,
      onDoubleClick,
      className,
      events = [],
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleSingleClick = () => {
      if (isOutsideMonth) return;
      if (date && onClick) onClick();
      else if (date) navigate("/dummy-event");
    };

    const handleDoubleClick = () => {
      if (isOutsideMonth) return;
      if (date && onDoubleClick) onDoubleClick();
    };

    if (shape === "circle") {
      const circleClasses = clsx(
        "flex items-center justify-center text-xs w-6 h-6 transition-colors rounded-full",
        {
          "bg-dark-blue text-white": isCurrentDay,
          "bg-white": !isCurrentDay,
          "hover:bg-gray-100": !isCurrentDay && !isOutsideMonth,
          "text-gray-400": isOutsideMonth && !isCurrentDay,
          "text-gray-800": !isOutsideMonth && !isCurrentDay,
          "cursor-pointer": !isOutsideMonth,
          "cursor-default": isOutsideMonth,
        },
        className
      );
      return (
        <div
          ref={ref}
          className={circleClasses}
          onClick={handleSingleClick}
          onDoubleClick={handleDoubleClick}
          {...props}
        >
          <span>{day}</span>
        </div>
      );
    }

    const baseClass = clsx(
      "p-2 bg-white w-full h-full",
      !isOutsideMonth ? "cursor-pointer hover:bg-gray-100" : "cursor-default",
      isOutsideMonth ? "text-gray-400" : "text-gray-800",
      className
    );

    const dayClass = clsx("flex justify-center items-center text-sm w-5 h-5", {
      "bg-dark-blue text-white rounded-full": isCurrentDay,
    });

    return (
      <div
        ref={ref}
        className={baseClass}
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
        {...props}
      >
        <div className="flex flex-col items-center">
          <div className={dayClass}>{day}</div>
        </div>
      </div>
    );
  }
);

DayCell.displayName = "DayCell";
