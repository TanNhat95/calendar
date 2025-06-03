import { Event } from "../types/event";

// Danh sách tất cả các khoảng thời gian (30 phút mỗi khoảng)
export const ALL_TIME_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});

// Hàm lấy các khoảng thời gian bị chặn
export const getBlockedSlots = (
  events: Event[],
  dateStr: string
): Set<string> => {
  const bookedSlots = new Set<string>();
  const eventsOnDay = events.filter((event) => event.date === dateStr);

  eventsOnDay.forEach((event) => {
    const startIndex = ALL_TIME_SLOTS.indexOf(event.startTime);
    const endIndex = ALL_TIME_SLOTS.indexOf(event.endTime);
    if (startIndex !== -1 && endIndex !== -1) {
      for (let i = startIndex; i < endIndex; i++) {
        bookedSlots.add(ALL_TIME_SLOTS[i]);
      }
    }
  });
  return bookedSlots;
};

// Hàm lấy các khoảng thời gian bắt đầu khả dụng
export const getAvailableStartTimes = (blockedSlots: Set<string>): string[] => {
  return ALL_TIME_SLOTS.filter((slot) => !blockedSlots.has(slot));
};

// Hàm lấy các khoảng thời gian kết thúc khả dụng
export const getAvailableEndTimes = (
  startTime: string,
  blockedSlots: Set<string>
): string[] => {
  if (!startTime) return [];

  const startIndex = ALL_TIME_SLOTS.indexOf(startTime);
  if (startIndex === -1) return [];

  const potentialEndTimes = ALL_TIME_SLOTS.slice(startIndex + 1);
  const nextBlockedSlotIndex = potentialEndTimes.findIndex((slot) =>
    blockedSlots.has(slot)
  );

  if (nextBlockedSlotIndex !== -1) {
    return potentialEndTimes.slice(0, nextBlockedSlotIndex + 1);
  }

  return potentialEndTimes;
};
