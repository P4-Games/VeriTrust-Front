export const formatTX = (value: string): string => value.slice(0, 6) + "****" + value.slice(value.length - 6, value.length);
export const formatAddress = (value: string): string => value.slice(0,4) + "***" + value.slice(value.length - 4, value.length)
export const formatDeadlines = (value: string): string => {
    const commitDeadline = value.split("T")[0].split("-");
    const commitDeadlineDay = commitDeadline[2];
    const commitDeadlineMonth = commitDeadline[1];
    const commitDeadlineYear = commitDeadline[0];
    const commitDeadlineHours = value.split("T")[1].split(":")[0];
    const commitDeadlineMinutes = value.split("T")[1].split(":")[1];

    return `${commitDeadlineDay}/${commitDeadlineMonth}/${commitDeadlineYear} - ${commitDeadlineHours}:${commitDeadlineMinutes}`;
}