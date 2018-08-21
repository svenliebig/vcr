export const MINUTES_OF_HOUR = 60
export const HOURS_OF_DAY = 24

export default class TimeUtil {
	static minutesToReadableTimeString(minutes) {
		var days = Math.floor(minutes / (MINUTES_OF_HOUR * HOURS_OF_DAY))
		minutes -= days * MINUTES_OF_HOUR * HOURS_OF_DAY
		var hrs = Math.floor(minutes / MINUTES_OF_HOUR)
		minutes -= hrs * MINUTES_OF_HOUR
		return `${days !== 0 ? `${days}d ` : ""}${hrs !== 0 ? `${hrs}h ` : ""}${minutes !== 0 ? `${minutes}m` : ""}`
	}
}