import React, { useState, useMemo } from "react";
import { Event } from "../types/event";
import { EventList } from "../components/EventList";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { formatDateToString } from "../utils/dateUtils";
import {
  getBlockedSlots,
  getAvailableStartTimes,
  getAvailableEndTimes,
} from "../utils/timeUtils";
import { YearView } from "../views/YearView";
import { MainCalendar } from "../views/MainCalendar";
import { MiniCalendar } from "../views/MiniCalendar";

interface CalendarLayoutProps {
  currentDate: Date;
  initialEvents: Event[];
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  currentDate,
  initialEvents,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [viewMode, setViewMode] = useState<"day" | "month">("day");
  const [mainView, setMainView] = useState<"month" | "year">("month");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventStartTime, setNewEventStartTime] = useState("");
  const [newEventEndTime, setNewEventEndTime] = useState("");
  const [newEventType, setNewEventType] = useState<
    "appointment" | "event" | "task"
  >("appointment");

  const blockedSlotsSet = useMemo(() => {
    const selectedDateStr = formatDateToString(selectedDate);
    return getBlockedSlots(events, selectedDateStr);
  }, [selectedDate, events]);

  const availableStartTimes = useMemo(() => {
    return getAvailableStartTimes(blockedSlotsSet);
  }, [blockedSlotsSet]);

  const availableEndTimes = useMemo(() => {
    return getAvailableEndTimes(newEventStartTime, blockedSlotsSet);
  }, [newEventStartTime, blockedSlotsSet]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setViewMode("day");
  };

  const handleDateDoubleClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      toast.error("Không thể tạo sự kiện trong quá khứ.");
      return;
    }

    setSelectedDate(date);
    setNewEventTitle("");

    const firstAvailableTime = availableStartTimes[0] || "";
    setNewEventStartTime(firstAvailableTime);

    if (firstAvailableTime) {
      const startTimeIndex = availableStartTimes.indexOf(firstAvailableTime);
      const potentialEndTime = availableEndTimes[startTimeIndex + 1] || "";
      const isEndTimeAvailable = availableEndTimes.some(
        (time) => time === potentialEndTime
      );
      setNewEventEndTime(isEndTimeAvailable ? potentialEndTime : "");
    } else {
      setNewEventEndTime("");
    }

    setNewEventType("appointment");
    setShowAddEventForm(true);
  };

  const handleViewAll = () => {
    setViewMode("month");
  };

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || !newEventStartTime || !newEventEndTime) {
      toast.warn("Vui lòng điền đầy đủ thông tin sự kiện.");
      return;
    }

    const dateStr = formatDateToString(selectedDate);

    const newEvent: Event = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: dateStr,
      startTime: newEventStartTime,
      endTime: newEventEndTime,
      type: newEventType,
    };
    setEvents([...events, newEvent]);
    toast.success(`Đã tạo sự kiện "${newEvent.title}"!`);
    setShowAddEventForm(false);
  };

  const handleCloseForm = () => {
    setShowAddEventForm(false);
  };

  const handleMonthSelectFromYearView = (month: number) => {
    handleMonthChange(new Date(selectedDate.getFullYear(), month, 1));
    setMainView("month");
  };

  const handleYearChangeFromYearView = (year: number) => {
    handleMonthChange(new Date(year, selectedDate.getMonth(), 1));
  };

  return (
    <div className="flex flex-wrap gap-3 py-4 px-4 md:py-2 bg-calendar-tile min-h-screen justify-center">
      <div className="flex flex-col w-[18.75rem]">
        <MiniCalendar
          onDateSelect={handleDateSelect}
          onDateDoubleClick={handleDateDoubleClick}
          onMonthChange={handleMonthChange}
        />
        <EventList
          events={events}
          selectedDate={selectedDate}
          viewMode={viewMode}
          onViewAll={handleViewAll}
        />
      </div>
      <div className="w-[43.75rem]">
        {mainView === "month" ? (
          <MainCalendar
            events={events}
            viewDate={selectedDate}
            onDateSelect={handleDateSelect}
            onDateDoubleClick={handleDateDoubleClick}
            onMonthChange={handleMonthChange}
            mainView={mainView}
            onMainViewChange={setMainView}
          />
        ) : (
          <YearView
            year={selectedDate.getFullYear()}
            onMonthSelect={handleMonthSelectFromYearView}
            onYearChange={handleYearChangeFromYearView}
          />
        )}
      </div>
      {showAddEventForm && (
        <div className="fixed inset-0 bg-dark-blue/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold text-dark-blue mb-4">
              Add New Event for {selectedDate.toLocaleDateString()}
            </h3>
            <input
              type="text"
              placeholder="Event Title"
              className="border border-light-blue/50 p-2 mb-4 w-full rounded-md focus:border-light-blue"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <div className="flex gap-2 mb-4">
              <div className="w-1/2">
                <label className="text-sm font-medium text-dark-blue">
                  Start Time
                </label>
                <select
                  className="border p-2 w-full rounded-md"
                  value={newEventStartTime}
                  onChange={(e) => {
                    setNewEventStartTime(e.target.value);
                    setNewEventEndTime("");
                  }}
                >
                  <option value="" disabled>
                    -- Select --
                  </option>
                  {availableStartTimes.map((slot) => (
                    <option key={`start-${slot}`} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium text-dark-blue">
                  End Time
                </label>
                <select
                  className="border p-2 w-full rounded-md"
                  value={newEventEndTime}
                  onChange={(e) => setNewEventEndTime(e.target.value)}
                  disabled={!newEventStartTime}
                >
                  <option value="" disabled>
                    -- Select --
                  </option>
                  {availableEndTimes.map((slot) => (
                    <option key={`end-${slot}`} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <select
              className="border p-2 mb-4 w-full rounded-md"
              value={newEventType}
              onChange={(e) =>
                setNewEventType(
                  e.target.value as "appointment" | "event" | "task"
                )
              }
            >
              <option value="appointment">Appointment</option>
              <option value="event">Event</option>
              <option value="task">Task</option>
            </select>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                onPress={handleCloseForm}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onPress={handleAddEvent}
                className="bg-light-blue text-white py-2 px-4 rounded-md hover:bg-dark-blue"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
