import ShowcaseReport from '../itemTypes/showcaseReport';
import ShowcaseReports from '../itemTypes/showcaseReports';

// === SINGULAR: MAIN COMPONENT ======================================

interface IShowcaseReportMainProps {
	item: ShowcaseReport;
	kind: ShowcaseReportMainKind;
}

export enum ShowcaseReportMainKind {
	display,
	displayAndEdit
}

export const ShowcaseReportMain = (props: IShowcaseReportMainProps) => {
	const showcaseReport = props.item;
	const kind = props.kind
	return (
		<div>Display: {showcaseReport.get_title()} {kind === ShowcaseReportMainKind.displayAndEdit && <span>[EDIT]</span>}</div>
	)
}

// === SINGULAR: LIST COMPONENT ======================================

interface IShowcaseReportListProps {
	item: ShowcaseReport;
}

export const ShowcaseReportList = (props: IShowcaseReportListProps) => {
	const showcaseReport = props.item;
	return (
		<div>List: {showcaseReport.get_title()}</div>
	)
}

// === PLURAL: DISPLAY COMPONENT ======================================

interface IShowcaseReportsMainProps {
	items: ShowcaseReports;
	kind: ShowcaseReportsMainKind;
}

export enum ShowcaseReportsMainKind {
	display,
	displayAndEdit,
	list
}

export const ShowcaseReportsMain = (props: IShowcaseReportsMainProps) => {
	const showcaseReports = props.items;
	// const kind = props.kind
	return (
		<>
			{showcaseReports.getItems<ShowcaseReport>().map((showcaseReport, index) => {
				return (
					<div key={index}>
						<ShowcaseReportMain item={showcaseReport} kind={ShowcaseReportMainKind.display} />
						<ShowcaseReportMain item={showcaseReport} kind={ShowcaseReportMainKind.displayAndEdit} />
						<ShowcaseReportList item={showcaseReport} />
						<hr />
					</div>
				)
			})}
		</>
	)
}