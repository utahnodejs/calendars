import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";

import { AppService } from "../services";
import * as ical from "ical";
import * as icalgenerator from "ical-generator";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("ical")
    async getCombinedMeetupCalendar(
        @Query("meetupGroups") meetupGroups: string,
        @Res() res: Response,
    ): Promise<void> {
        let groups = meetupGroups.split(","); //Parse the meetupgroups, some validation about whether or not they exist would be nice...
        console.log(`Getting events for: `, groups);
        const iCals = await Promise.all(
            groups.map(group => this.getMeetupGroupICal(group)), //get all the icals for the groups
        );

        console.log(iCals);
        let mergedICalString = this.mergeMeetupICals(iCals);
        // console.log(mergedICalString);

        res.setHeader("Content-type", "application/octet-stream");

        res.setHeader(
            "Content-disposition",
            "attachment; filename=calendars.ics",
        );

        res.send(mergedICalString);
    }

    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    //TODO: Move to service
    //Merges multiple icals and returns the ical string
    mergeMeetupICals(iCals: ical.FullCalendar[]): string {
        let iCalResult = icalgenerator();
        for (let calendar of iCals) {
            for (let prop in calendar) {
                if (calendar.hasOwnProperty(prop)) {
                    var event = calendar[prop];
                    if (calendar[prop].type == "VEVENT") {
                        // console.log(
                        //   `${event.summary} is in ${
                        //     event.location
                        //   } on the ${event.start.getDate()} of ${
                        //     this.months[event.start.getMonth()]
                        //   } at ${event.start.toLocaleTimeString('en-GB')}`,
                        // );

                        iCalResult.createEvent({
                            start: event.start,
                            summary: event.description,
                            end: event.end,
                            location: event.location,
                        });
                    }
                }
            }
        }
        return iCalResult.toString();
    }

    //TODO: move to service
    getMeetupGroupICal(groupName: string): Promise<ical.FullCalendar> {
        return new Promise((resolve, reject) => {
            ical.fromURL(
                `https://www.meetup.com/${groupName}/events/ical/`,
                {},
                (err, data) => {
                    if (!err) {
                        return resolve(data);
                    } else {
                        return reject(err);
                    }
                },
            );
        });
    }
}
