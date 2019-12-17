import Axios from "axios";

export const getMeetupICalUrl = (groupName: string): string =>
    `https://www.meetup.com/${groupName}/events/ical/`;

export const checkMeetupGroupExists = async (
    groupName: string,
): Promise<boolean> => {
    try {
        await Axios.head(getMeetupICalUrl(groupName), { maxRedirects: 0 });
        return true;
    } catch (error) {
        return false;
    }
};
