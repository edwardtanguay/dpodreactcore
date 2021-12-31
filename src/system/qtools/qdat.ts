import SmartDate from '../classes/smartDate';
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

/**
 * Returns date/year like "Oct 04" unless it's another year then "Oct 04, 2013"
 * 
 * qdat.smartDateWithYear('2020-10-04 03:49:29');
 * 
 * Oct 04
 * 
 * Oct 04, 2013
 */
export const smartDateWithYear = (dateTime: string) => {
	const smartDate = new SmartDate(dateTime);
	return smartDate.smartDateWithYear();
};

/**
 * Returns date/year like "Oct 04" unless it's another year then "Oct 04, 2013"
 * 
 * qdat.smartDateWithYear('2020-10-04 03:49:29');
 * 
 * Monday, Nov 02
 * 
 * Monday, Nov 02, 2013
 */
export const smartDateWithWeekdayAndYear = (dateTime: string) => {
	const smartDate = new SmartDate(dateTime);
	return smartDate.smartDateWithWeekdayAndYear();
};

/**
 * Returns date/year like "Oct 04" unless it's another year then "Oct 04, 2013"
 * 
 * qdat.smartDateWithYear('2020-10-04 03:49:29');
 * 
 * Mon, Nov 02
 * 
 * Mon, Nov 02, 2013
 */
export const smartDateWithAbbreviatedWeekdayAndYear = (dateTime: string) => {
	const smartDate = new SmartDate(dateTime);
	return smartDate.smartDateWithAbbreviatedWeekdayAndYear();
};

export const smartDateIsToday = (dateTime: string) => {
	const smartDate = new SmartDate(dateTime);
	return smartDate.isToday();
};

export const smartDateIsYesterday = (dateTime: string) => {
	const smartDate = new SmartDate(dateTime);
	return smartDate.isYesterday();
};