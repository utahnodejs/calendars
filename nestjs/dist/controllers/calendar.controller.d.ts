import { Response } from "express";
import { CalendarService } from "../services";
export declare class CalendarController {
    private readonly _calendarService;
    constructor(_calendarService: CalendarService);
    getCombinedMeetupCalendar(meetupGroups: string, res: Response): Promise<void>;
}
