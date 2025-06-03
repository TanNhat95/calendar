import { Event } from "../types/event";
import { formatDateToString } from "./dateUtils";
import { convertToMinutes } from "./dateUtils";

// Hàm lọc và sắp xếp sự kiện theo ngày và giờ bắt đầu
export const filterAndSortEventsByDate = (
  events: Event[],
  date: string
): Event[] => {
  const dayEvents = events.filter((event) => event.date === date);
  return [...dayEvents].sort(
    (a, b) => convertToMinutes(a.startTime) - convertToMinutes(b.startTime)
  );
};

// Hàm lọc sự kiện theo ngày cụ thể
export const filterEventsByDay = (
  events: Event[],
  selectedDate: Date
): Event[] => {
  const dateStr = formatDateToString(selectedDate); // Chuyển thành "YYYY-MM-DD"
  return events.filter((event) => event.date === dateStr);
};

// Hàm lọc sự kiện theo tháng
export const filterEventsByMonth = (
  events: Event[],
  selectedDate: Date
): Event[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth()
    );
  });
};
