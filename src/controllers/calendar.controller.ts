import {
    Controller,
    Get,
    Query,
    Res,
    BadRequestException,
} from "@nestjs/common";
import { Response } from "express";

import { CalendarService } from "../services";
import { getMeetupICalUrl, checkMeetupGroupExists } from "../utils";

@Controller()
export class CalendarController {
    public constructor(private readonly _calendarService: CalendarService) {}

    @Get("ical")
    public async getCombinedMeetupCalendar(
        @Query("meetup_groups") meetupGroups: string,
        @Res() res: Response,
    ): Promise<void> {
        if (!meetupGroups) {
            throw new BadRequestException(
                "One or more meetup groups must be provided",
            );
        }

        // Parse the meetup groups, some validation about whether or not they exist would be nice...
        const groups = meetupGroups.split(",");
        const result = await Promise.all(
            groups.map(group => checkMeetupGroupExists(group)),
        );
        if (result.indexOf(false) > -1) {
            throw new BadRequestException(
                "One or more meetup groups were not found",
            );
        }

        console.log(`Getting events for: `, groups);

        const calendars = await Promise.all(
            groups.map(group =>
                this._calendarService.getCalendarFromUrl(
                    getMeetupICalUrl(group),
                ),
            ),
        );

        const mergedICalString = this._calendarService.mergeEventsToString(
            calendars,
        );

        // Set the headers so the response is treated as a downloadable ics file
        res.setHeader("Content-type", "application/octet-stream");
        res.setHeader(
            "Content-disposition",
            "attachment; filename=calendars.ics",
        );

        res.send(mergedICalString);
    }
}
