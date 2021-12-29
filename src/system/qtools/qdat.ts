import * as qstr from './qstr';

/**
 * Get short date with day of week, in American format. 
 *
 * qdat.getShortAmericanDateWithDayOfWeek('2021-08-20') 
 *
 * "Fri, Aug 20, 2021"
 */
export const getShortAmericanDateWithDay = (isoDate: string) => {
	const date = new Date(isoDate);
	return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Get short month-day in American format.
 *
 * qdat.getShortAmericanDateWithDayOfWeek('Aug 20') 
 *
 * "Fri, Aug 20, 2021"
 */
export const getShortAmericanMonthDay = (isoDate: string) => {
	// TODO: app wide, change isoDate to dataDate, since isoDate is e.g. "2021-10-31T23:23:22.345Z"
	const date = new Date(isoDate);
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Convert official ISO date to Datapod date
 *
 * qdat.convertIsoDateToDpodDate('2021-10-31T23:23:22.345Z') 
 *
 * "2021-10-31 23:23:22"
 */
export const convertIsoDateToDpodDate = (isoDate: string) => {
	let r = isoDate;
	r = qstr.replaceAll(r, 'T', ' ');
	r = qstr.replaceAll(r, 'Z', ' ');
	r = r.substr(0,19);
	return r;
}