import ShowcaseReport from '../itemTypes/showcaseReport';

// === SINGULAR: MAIN COMPONENT ======================================

interface IShowcaseReportComponentProps {
	item: ShowcaseReport;
	kind: ShowcaseReportComponentKind;
}

export enum ShowcaseReportComponentKind {
	display,
	displayAndEdit
}

export const ShowcaseReportComponent = (props: IShowcaseReportComponentProps) => {
	const showcaseReport = props.item;
	const kind = props.kind
	kind === ShowcaseReportComponentKind.displayreturn (
		<div>Display: {showcaseReport.get_title()} {kind === ShowcaseReportComponentKind.displayAndEdit && <span>[EDIT]</span>}</div>
	)
	return (
		<div>List: {showcaseReport.get_title()}</div>
	)
}

// === SINGULAR: LIST COMPONENT ======================================

interface IShowcaseReportListProps {
	item: ShowcaseReport;
}

export const ShowcaseReportList = (props: IShowcaseReportListProps) => {
	const showcaseReport = props.item;
}

// === PLURAL: DISPLAY COMPONENT ======================================

interface IShowcaseReportsComponentProps {
	items: ShowcaseReports;
	kind: ShowcaseReportsComponentKind;
}

export enum ShowcaseReportsComponentKind {
	display,
	displayAndEdit,
	list
}

export const ShowcaseReportsComponent = (props: IShowcaseReportsComponentProps) => {
	const showcaseReports = props.items;
	const kind = props.kind
	return (
		<>
			{showcaseReports.getItems<ShowcaseReport>().map((showcaseReport, index) => {
				return (
					<div key={index}>
						<ShowcaseReportComponent item={showcaseReport} kind={ShowcaseReportComponentKind.display} />
						<ShowcaseReportComponent item={showcaseReport} kind={ShowcaseReportComponentKind.displayAndEdit} />
						<ShowcaseReportList item={showcaseReport} />
						<hr />
					</div>
				)
			})}
		</>
	)
}