export type EventType = "appointment" | "event" | "task";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface BookingEvent {
  id: string;
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  type: EventType;
  customer?: Customer;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
  recurring?: {
    frequency: "daily" | "weekly" | "monthly";
    interval: number;
    endDate?: Date;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: EventType;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: "2025-06-02",
    startTime: "09:00",
    endTime: "10:30",
    type: "appointment",
  },
  {
    id: "2",
    title: "Project Deadline",
    date: "2025-06-02",
    startTime: "14:00",
    endTime: "15:00",
    type: "event",
  },
  {
    id: "3",
    title: "Client Call",
    date: "2025-06-03",
    startTime: "11:00",
    endTime: "11:30",
    type: "appointment",
  },
  {
    id: "4",
    title: "Past Event - Should not be able to add another one on this day",
    date: "2025-05-30",
    startTime: "15:00",
    endTime: "16:30",
    type: "event",
  },
  {
    id: "5",
    title: "Final testing",
    date: "2025-06-04",
    startTime: "15:00",
    endTime: "16:30",
    type: "task",
  },
  {
    id: "6",
    title: "Testingggggg",
    date: "2025-06-04",
    startTime: "14:00",
    endTime: "15:00",
    type: "appointment",
  },
];

// API Endpoint: GET /api/events?startDate=2025-06-01&endDate=2025-06-30

const API_RES = {
  events: [
    {
      id: "1",
      title: "Meeting with John",
      date: "2025-06-03",
      startTime: "09:00",
      endTime: "10:00",
      type: "appointment",
      customer: {
        id: "c1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        avatar: "https://example.com/avatar.jpg",
      },
      status: "confirmed",
      notes: "Discuss project timeline",
      recurring: {
        frequency: "weekly",
        interval: 1,
        endDate: "2025-12-31",
      },
    },
    {
      id: "2",
      title: "Team Sync",
      date: "2025-06-03",
      startTime: "14:00",
      endTime: "15:00",
      type: "event",
      status: "pending",
    },
  ],
};
