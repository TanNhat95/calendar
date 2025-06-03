import { EventType } from "../types/event";

export interface EventColors {
  bg: string;
  text: string;
  border: string;
  strip?: string;
}

export const getEventColors = (type: EventType): EventColors => {
  switch (type) {
    case "appointment":
      return {
        bg: "bg-light-orange",
        text: "text-light-blue",
        border: "border-light-blue",
        strip: "bg-light-blue",
      };
    case "event":
      return {
        bg: "bg-dark-orange",
        text: "text-light-blue",
        border: "border-light-blue",
        strip: "bg-light-blue",
      };
    case "task":
      return {
        bg: "bg-light-blue",
        text: "text-white",
        border: "border-deep-orange",
        strip: "bg-deep-orange",
      };
    default:
      throw new Error(`Unknown event type: ${type}`);
  }
};
