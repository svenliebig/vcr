export const MINUTES_OF_HOUR = 60
export const HOURS_OF_DAY = 24

export default class TimeUtil {
    public static minutesToReadableTimeString(minutes: number) {
        let m = minutes

        const days = Math.floor(m / (MINUTES_OF_HOUR * HOURS_OF_DAY))
        m -= days * MINUTES_OF_HOUR * HOURS_OF_DAY
        const hrs = Math.floor(m / MINUTES_OF_HOUR)
        m -= hrs * MINUTES_OF_HOUR
        return `${days !== 0 ? `${days}d ` : ""}${hrs !== 0 ? `${hrs}h ` : ""}${m !== 0 ? `${m}m` : ""}`
    }

    public static formatDateString(date: string) {
        const dateArray = date.split("-").map(e => parseInt(e, 10))
        return `${dateArray[2]}.${dateArray[1] + 1}.${dateArray[0]}`
    }

    public static getYear(date: string) {
        const dateArray = date.split("-").map(e => parseInt(e, 10))
        return dateArray[0]
    }
}