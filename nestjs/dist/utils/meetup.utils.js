"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
exports.getMeetupICalUrl = (groupName) => `https://www.meetup.com/${groupName}/events/ical/`;
exports.checkMeetupGroupExists = async (groupName) => {
    try {
        await axios_1.default.head(exports.getMeetupICalUrl(groupName), { maxRedirects: 0 });
        return true;
    }
    catch (error) {
        return false;
    }
};
//# sourceMappingURL=meetup.utils.js.map