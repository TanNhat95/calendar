import React from "react";
import { Text } from "./Text";
import { Button } from "@nextui-org/react";
import { Event } from "../types/event";
import { EventCard } from "./EventCard";
import { convertToMinutes } from "../utils/dateUtils";
import { filterEventsByDay, filterEventsByMonth } from "../utils/eventUtils";

interface EventListProps {
  events: Event[];
  selectedDate: Date;
  viewMode: "day" | "month";
  onViewAll: () => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  selectedDate,
  viewMode,
  onViewAll,
}) => {
  const filteredEvents =
    viewMode === "day"
      ? filterEventsByDay(events, selectedDate)
      : filterEventsByMonth(events, selectedDate);

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => convertToMinutes(a.startTime) - convertToMinutes(b.startTime)
  );

  return (
    <div className="bg-white p-4 border-2 border-t-0 shadow-lg overflow-scroll">
      <div className="flex justify-between items-center mb-3 min-h-[2.5rem]">
        <Text className="font-bold text-lg">
          {viewMode === "day"
            ? `Events - ${selectedDate.toLocaleDateString("default", {
                day: "numeric",
                month: "short",
              })}`
            : `Events in ${selectedDate.toLocaleDateString("default", {
                month: "long",
                year: "numeric",
              })}`}
        </Text>
        {viewMode === "day" ? (
          <Button
            onPress={onViewAll}
            size="sm"
            className="bg-[#5684AE] text-white hover:bg-[#40678A]"
            radius="full"
          >
            View All
          </Button>
        ) : (
          <div className="w-[5rem] h-[2rem] opacity-0"></div>
        )}
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-w-full">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div key={event.id} className="flex-shrink-0">
              <EventCard
                title={event.title}
                startTime={event.startTime}
                endTime={event.endTime}
                type={event.type}
                onViewProfile={() =>
                  console.log("View profile clicked for", event.title)
                }
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <Text className="text-gray-500 text-center">
              No events for this {viewMode}.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
