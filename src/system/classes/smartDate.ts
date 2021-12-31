// import * as moment from "moment";

const moment = require("moment");

class SmartDate {

	baseDateMoment: any = null;

	constructor(flexDate: any) {
		this.baseDateMoment = moment(new Date(flexDate));
	}

	getIsoDate() {
		return this.baseDateMoment.format('YYYY-MM-DD');
	}
	getIsoDateTime() {
		return this.baseDateMoment.format('YYYY-MM-DD HH:mm:ss');
	}

	getBaseDateMoment() {
		return this.baseDateMoment;
	}

	isToday() {
		const todaySmartDate = this.getTodayAsSmartDate();
		return todaySmartDate.getIsoDate() === this.getIsoDate();
	}

	isYesterday() {
		const yesterdaySmartDate = this.getTodayAsSmartDate();
		yesterdaySmartDate.addDays(-1);
		return yesterdaySmartDate.getIsoDate() === this.getIsoDate();
	}

	addDays(daysToAdd: number) {
		this.baseDateMoment.add(daysToAdd, 'days');
	}

	getTodayAsSmartDate() {
		return new SmartDate(new Date());
	}

	getYesterdayAsSmartDate() {
		return new SmartDate(new Date());
	}

	// "Nov 02" or "Nov 02, 2013"
	smartDateWithYear() {
		const todaySmartDate = this.getTodayAsSmartDate();
		if (this.getYearAsFourDigits() === todaySmartDate.getYearAsFourDigits()) {
			return `${this.getMonthAbbreviationThreeLetters()} ${this.getDayOfMonthPaddedAsTwoDigits()}`;
		}
		return `${this.getMonthAbbreviationThreeLetters()} ${this.getDayOfMonthPaddedAsTwoDigits()}, ${this.getYearAsFourDigits()}`;
	}

	// "Monday, Nov 02" or "Monday, Nov 02, 2013"
	smartDateWithWeekdayAndYear() {
		const todaySmartDate = this.getTodayAsSmartDate();
		if (this.getYearAsFourDigits() === todaySmartDate.getYearAsFourDigits()) {
			return `${this.getDayOfWeekFull()}, ${this.getMonthAbbreviationThreeLetters()} ${this.getDayOfMonthPaddedAsTwoDigits()}`;
		}
		return `${this.getDayOfWeekFull()}, ${this.getMonthAbbreviationThreeLetters()} ${this.getDayOfMonthPaddedAsTwoDigits()}, ${this.getYearAsFourDigits()}`;
	}

	// "Mon, Nov 02" or "Mon, Nov 02, 2013"
	smartDateWithAbbreviatedWeekdayAndYear() {
		const todaySmartDate = this.getTodayAsSmartDate();
		if (this.getYearAsFourDigits() === todaySmartDate.getYearAsFourDigits()) {
			return `${this.getDayOfWeekAbbreviated()}, ${this.getMonthAbbreviationThreeLetters()} ${this.getDayOfMonthPaddedAsTwoDigits()}`;
		}
		return `${this.getDayOfWeekAbbreviated()}, ${this.getMonthAbbreviationThreeLetters()} ${this.getDayOfMonthPaddedAsTwoDigits()}, ${this.getYearAsFourDigits()}`;
	}

	// e.g. "2020"
	getYearAsFourDigits() {
		return this.baseDateMoment.format('YYYY');
	}

	// e.g. "01"
	getDayOfMonthPaddedAsTwoDigits() {
		return this.baseDateMoment.format('DD');
	}

	// e.g. "Jan"
	getMonthAbbreviationThreeLetters() {
		return this.baseDateMoment.format('MMM');
	}

	// e.g. "Monday"
	getDayOfWeekFull() {
		return this.baseDateMoment.format('dddd');
	}

	// e.g. "Mon"
	getDayOfWeekAbbreviated() {
		return this.getDayOfWeekFull().substring(0, 3);
	}


}

export default SmartDate;
