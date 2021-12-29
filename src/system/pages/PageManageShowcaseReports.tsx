/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_manageShowcaseReports.scss';
import PageManager from '../classes/pageManager';
import ShowcaseReports from '../itemTypes/showcaseReports';
import ShowcaseReport from '../itemTypes/showcaseReport';
import ComponentDisplayShowcaseReport from '../components/ComponentDisplayShowcaseReport';
import ComponentDisplayShowcaseReports from '../components/ComponentDisplayShowcaseReports';
import { IShowcaseReport } from '../dataLayer/interfaces';

function PageManageShowcaseReports() {
	const pageIdCode = 'manageShowcaseReports';
	const [showcaseReport, setShowcaseReport] = useState<ShowcaseReport>(new ShowcaseReport());
	const [showcaseReports, setShowcaseReports] = useState<ShowcaseReports>(new ShowcaseReports());
	// const [editable, setEditable] = useState<boolean>(false);

	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		const initialShowcaseReport = await ShowcaseReport.instantiateFromItemObject<ShowcaseReport, IShowcaseReport>(ShowcaseReport, data.showcaseReportItemObject);
		const initialShowcaseReports = await ShowcaseReports.instantiateFromItemObjects<ShowcaseReports, ShowcaseReport, IShowcaseReport>(ShowcaseReports, ShowcaseReport, data.showcaseReportObjects);
		setShowcaseReport(initialShowcaseReport);
		setShowcaseReports(initialShowcaseReports);
	}

	useEffect(() => {
		loadPageData();
	}, []);

	// const toggleEditable = () => {
	// 	setEditable(!editable);
	// }

	return (
		<div className="page page_manageShowcaseReports">
			<h2 className="title">Showcase: Manage Item Types</h2>
			<p className="description">An info page that displays showcase manage item types</p>
			<section>
				<h3>Singular Component</h3>
				<ComponentDisplayShowcaseReport item={showcaseReport} />
				<h3>Plural Components</h3>
				<ComponentDisplayShowcaseReports items={showcaseReports} />
			</section>
		</div>
	)
}

export default PageManageShowcaseReports;