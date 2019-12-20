import * as ical from "ical";
export declare class CalendarService {
    getCalendarFromUrl(url: string): Promise<ical.FullCalendar>;
    mergeEventsToString(calendars: ical.FullCalendar[]): string;
}
