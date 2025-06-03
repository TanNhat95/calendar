import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Text } from "./Text";
import { getEventColors } from "../utils/colors";
import Avatar from "../assets/avatar.jpg";
import { EventType } from "../types/event";

interface EventCardProps {
  title: string;
  startTime: string;
  endTime: string;
  type: EventType;
  onViewProfile: () => void;
}

const GoogleMeeting = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M40.54,52.14H11.25a5.51,5.51,0,0,1-5.5-5.5V17.36a5.51,5.51,0,0,1,5.5-5.5H40.54a5.51,5.51,0,0,1,5.5,5.5V46.64A5.51,5.51,0,0,1,40.54,52.14ZM11.25,14.86a2.5,2.5,0,0,0-2.5,2.5V46.64a2.5,2.5,0,0,0,2.5,2.5H40.54a2.5,2.5,0,0,0,2.5-2.5V17.36a2.5,2.5,0,0,0-2.5-2.5Z" />
    <path d="M56.75,45.25a1.44,1.44,0,0,1-.67-.16L43.87,39A1.49,1.49,0,0,1,43,37.65V26.36A1.49,1.49,0,0,1,43.87,25l12.21-6.11a1.49,1.49,0,0,1,2.17,1.34v23.5A1.52,1.52,0,0,1,57.54,45,1.6,1.6,0,0,1,56.75,45.25ZM46,36.72l9.21,4.6V22.68L46,27.29Z" />
  </svg>
);

export const EventCard = React.forwardRef<
  HTMLDivElement,
  EventCardProps & React.ComponentPropsWithoutRef<typeof Card>
>(({ title, startTime, endTime, type, onViewProfile, ...props }, ref) => {
  const { bg, text, border } = getEventColors(type);

  const titleColor =
    type === "appointment" || type === "event"
      ? "text-dark-blue"
      : "text-white";
  const timeColor =
    type === "appointment" || type === "event"
      ? "text-light-blue"
      : "text-white";
  const cameraColor = type === "appointment" ? "text-white" : "text-dark-blue";
  const cameraBg = type === "task" ? "bg-light-orange" : "bg-dark-blue";
  const buttonTextColor =
    type === "appointment" ? "text-light-blue" : "text-white";

  return (
    <Card
      ref={ref}
      className={`${bg} ${text} shadow-sm rounded-lg w-full max-w-xs border-l-4 ${border}`}
      {...props}
    >
      <CardBody className="p-3 gap-[0.25rem]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col max-w-[calc(100%-4rem)] gap-2">
            <Text
              className={`font-bold text-base break-words overflow-hidden text-ellipsis whitespace-normal line-clamp-2 ${titleColor}`}
            >
              {title}
            </Text>
            <Text className={`text-sm ${timeColor}`}>
              {startTime} - {endTime}
            </Text>
          </div>
          {type !== "event" && (
            <div
              className={`flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full ${cameraBg}`}
            >
              <GoogleMeeting
                className={`w-6 h-6 rounded-full cursor-pointer ${cameraColor}`}
              />
            </div>
          )}
        </div>
        {type !== "event" && (
          <div className="flex gap-2 items-center">
            <img src={Avatar} alt="Avatar" className="h-6 w-6 rounded-full" />
            <div
              onClick={onViewProfile}
              className={`${buttonTextColor} text-xs cursor-pointer underline`}
            >
              View Client Profile
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
});

EventCard.displayName = "EventCard";
