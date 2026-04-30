import { events, Event, EventType } from "@/data/events";

function parseDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function isPast(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDate(date) < today;
}

function normalize(eventsList: Event[]): Event[] {
  return eventsList.map((e) => {
    if (e.type === "upcoming" && isPast(e.date)) {
      return { ...e, type: "past", status: undefined, result: "Completed" };
    }
    return e;
  });
}

function sort(eventsList: Event[], asc: boolean) {
  return [...eventsList].sort((a, b) =>
    asc
      ? parseDate(a.date).getTime() - parseDate(b.date).getTime()
      : parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );
}

export function getEvents(type?: EventType) {
  const updated = normalize(events);

  if (!type) return updated;

  const filtered = updated.filter((e) => e.type === type);

  if (type === "upcoming") return sort(filtered, true);
  if (type === "past") return sort(filtered, false);

  return filtered;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}