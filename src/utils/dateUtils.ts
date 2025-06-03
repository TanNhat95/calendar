export const convertToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const formatDateToString = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

export const parseDateFromString = (dateStr: string): Date => {
  const parts = dateStr.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

export const generateCalendarDays = (
  year: number,
  month: number
): { day: number; date: string; isOutsideMonth: boolean }[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - dayOfWeek);

  const days: { day: number; date: string; isOutsideMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = formatDateToString(currentDate);
    days.push({
      day: currentDate.getDate(),
      date: dateStr,
      isOutsideMonth: currentDate.getMonth() !== month,
    });
  }
  return days;
};

export const getPreviousMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getNextMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const formatMonthYear = (
  date: Date,
  monthFormat: "long" | "short" = "long"
): string =>
  date.toLocaleString("default", { month: monthFormat, year: "numeric" });

export const isCurrentDay = (dateStr: string): boolean =>
  dateStr === formatDateToString(new Date());
