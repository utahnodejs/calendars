"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_1 = require("../services");
const utils_1 = require("../utils");
let CalendarController = class CalendarController {
    constructor(_calendarService) {
        this._calendarService = _calendarService;
    }
    async getCombinedMeetupCalendar(meetupGroups, res) {
        if (!meetupGroups) {
            throw new common_1.BadRequestException("One or more meetup groups must be provided");
        }
        const groups = meetupGroups.split(",");
        const result = await Promise.all(groups.map(group => utils_1.checkMeetupGroupExists(group)));
        if (result.indexOf(false) > -1) {
            throw new common_1.BadRequestException("One or more meetup groups were not found");
        }
        console.log(`Getting events for: `, groups);
        const calendars = await Promise.all(groups.map(group => this._calendarService.getCalendarFromUrl(utils_1.getMeetupICalUrl(group))));
        const mergedICalString = this._calendarService.mergeEventsToString(calendars);
        res.setHeader("Content-type", "application/octet-stream");
        res.setHeader("Content-disposition", "attachment; filename=calendars.ics");
        res.send(mergedICalString);
    }
};
__decorate([
    common_1.Get("ical"),
    swagger_1.ApiResponse({
        headers: {
            "content-type": {
                schema: { type: "application/octet-stream" },
            },
            "content-disposition": {
                schema: { type: "attachment; filename=calendars.ics " },
            },
        },
    }),
    swagger_1.ApiOperation({
        operationId: "getMergedMeetupICal",
        description: "Takes a list of Meetup groups and returns an iCal file with all of their events",
    }),
    __param(0, common_1.Query("meetup_groups")),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "getCombinedMeetupCalendar", null);
CalendarController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [services_1.CalendarService])
], CalendarController);
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendar.controller.js.map