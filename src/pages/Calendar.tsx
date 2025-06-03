import React from "react";
import { CalendarLayout } from "../layouts/CalendarLayout";
import { events } from "../types/event";

export const CalendarPage: React.FC = () => {
  return <CalendarLayout currentDate={new Date()} initialEvents={events} />;
};
