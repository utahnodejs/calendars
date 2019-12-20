"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ical = require("ical");
const icalgenerator = require("ical-generator");
const EVENT_COMPONENT_KEY = "VEVENT";
let CalendarService = class CalendarService {
    getCalendarFromUrl(url) {
        return new Promise((resolve, reject) => {
            ical.fromURL(url, {}, (err, data) => err ? reject(err) : resolve(data));
        });
    }
    mergeEventsToString(calendars) {
        const result = icalgenerator();
        for (const calendar of calendars) {
            for (const prop in calendar) {
                if (!calendar.hasOwnProperty(prop)) {
                    continue;
                }
                const component = calendar[prop];
                if (component.type === EVENT_COMPONENT_KEY) {
                    result.createEvent({
                        start: component.start,
                        summary: component.description,
                        end: component.end,
                        location: component.location,
                    });
                }
            }
        }
        return result.toString();
    }
};
CalendarService = __decorate([
    common_1.Injectable()
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map