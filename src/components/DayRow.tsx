import React from "react";
import { DayCell } from "./DayCell";
import { Event } from "../types/event";
import { EventTag } from "./EventTag";
import clsx from "clsx";
import { parseDateFromString, isCurrentDay } from "../utils/dateUtils";
import { filterAndSortEventsByDate } from "../utils/eventUtils";

interface DayRowProps {
  days: { day: number; date: string; isOutsideMonth?: boolean }[];
  today: Date;
  events: Event[];
  onDateSelect: (date: Date) => void;
  onDateDoubleClick: (date: Date) => void;
}

export const DayRow: React.FC<DayRowProps> = ({
  days,
  today,
  events,
  onDateSelect,
  onDateDoubleClick,
}) => {
  return (
    <div className="grid grid-cols-7 justify-items-center">
      {days.map((dayObj, index) => {
        const sortedDayEvents = filterAndSortEventsByDate(events, dayObj.date);
        const visibleEvents = sortedDayEvents.slice(0, 2);
        const moreEventsCount = sortedDayEvents.length - visibleEvents.length;
        const isCurrentDayCheck = isCurrentDay(dayObj.date);

        const handleDateClick = () => {
          if (!dayObj.date) return;
          onDateSelect(parseDateFromString(dayObj.date));
        };

        const handleDateDoubleClick = () => {
          if (!dayObj.date) return;
          onDateDoubleClick(parseDateFromString(dayObj.date));
        };

        return (
          <div
            key={index}
            className={clsx(
              "relative group w-full h-28 border-[1.5px] border-dotted"
            )}
          >
            <DayCell
              day={dayObj.day}
              isCurrentDay={isCurrentDayCheck}
              isOutsideMonth={dayObj.isOutsideMonth ?? false}
              date={dayObj.date}
              shape="square"
              onClick={handleDateClick}
              onDoubleClick={handleDateDoubleClick}
              events={sortedDayEvents}
            />
            {sortedDayEvents.length > 0 && (
              <div className="absolute top-10 left-0 right-0 flex flex-col gap-0.5">
                {visibleEvents.map((event, idx) => (
                  <EventTag
                    key={idx}
                    title={event.title}
                    type={event.type}
                    className="text-xs w-full truncate block"
                  />
                ))}
                {moreEventsCount > 0 && (
                  <div className="text-xs text-light-blue mt-1 pl-[0.5rem]">
                    {moreEventsCount} more
                  </div>
                )}
                {moreEventsCount > 0 && (
                  <div className="absolute hidden group-hover:block bg-white p-2 rounded z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 pointer-events-none">
                    {sortedDayEvents.map((event, idx) => (
                      <div key={idx} className="text-xs truncate">
                        {event.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
