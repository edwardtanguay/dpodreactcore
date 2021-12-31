/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import * as faker from "faker/locale/de";
import * as qdat from '../../system/qtools/qdat';

// faker.locale = 'de';

class ControllerShowcaseSampleDataWithFaker extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {

		// creates a person represented as nested JSON object: 
		// const card = faker.helpers.createCard()
		// console.log(card);

		this.response.send([
			{
				label: "full name",
				data: faker.name.findName()
			},
			{
				label: "email",
				data: faker.internet.email()
			},
			{
				label: "HTML color",
				data: faker.commerce.color()
			},
			{
				label: "city",
				data: faker.address.city()
			},
			{
				label: "country",
				data: faker.address.country()
			},
			{
				label: "past date/time",
				data: qdat.convertIsoDateToDpodDate(faker.date.past().toISOString())
			},
			{
				label: "future date/time",
				data: qdat.convertIsoDateToDpodDate(faker.date.future().toISOString())
			},
			{
				label: "month",
				data: faker.date.month()
			},
			{
				label: "weekday",
				data: faker.date.weekday()
			},
			{
				label: "file Name",
				data: faker.system.commonFileName()
			}
		]);
	}

}

export default ControllerShowcaseSampleDataWithFaker;
