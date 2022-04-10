import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './styles/reset.scss';
import './styles/layout_dark.scss';
import './styles/dpod.scss';
import PageHome from '../custom/components/PageHome';
import * as config from '../system/config';
import * as qarr from '../system/qtools/qarr';
import data_versioning from './data/json/data_versioning.json';

// DYNAMIC_CODE_AREA: loadPageComponentLines
import PageShowcaseCounterUsingState from './pages/PageShowcaseCounterUsingState'; // ::showcaseCounterUsingState
import PageShowcaseCounterUsingReducer from './pages/PageShowcaseCounterUsingReducer'; // ::showcaseCounterUsingReducer
import PageShowcaseTypeScriptClasses from './pages/PageShowcaseTypeScriptClasses'; // ::showcaseTypeScriptClasses
import PageShowcaseJavaScriptComponent from './pages/PageShowcaseJavaScriptComponent'; // ::showcaseJavaScriptComponent
import PageShowcaseSqliteReader from './pages/PageShowcaseSqliteReader'; // ::showcaseSqliteReader
import PageShowcaseJsonReadWrite from './pages/PageShowcaseJsonReadWrite'; // ::showcaseJsonReadWrite
import PageDeletePage from './pages/PageDeletePage'; // ::deletePage
import PageCreatePage from './pages/PageCreatePage'; // ::createPage
import PageShowcaseNewsApi from './pages/PageShowcaseNewsApi'; // ::showcaseNewsApi
import PageManageShowcaseReports from './pages/PageManageShowcaseReports'; // ::manageShowcaseReports
import PageShowcaseUseToggle from './pages/PageShowcaseUseToggle'; // ::showcaseUseToggle
import PageShowcaseClassInState from './pages/PageShowcaseClassInState'; // ::showcaseClassInState
import PageShowcaseFetchTryCatch from './pages/PageShowcaseFetchTryCatch'; // ::showcaseFetchTryCatch
import PageShowcaseReactIcons from './pages/PageShowcaseReactIcons'; // ::showcaseReactIcons
import PageCurriculumFlashcardParser from './pages/PageCurriculumFlashcardParser'; // ::curriculumFlashcardParser
import PageImportAssessmentJSONIntoSQLite from './pages/PageImportAssessmentJSONIntoSQLite'; // ::importAssessmentJSONIntoSQLite
import PageShowcaseSampleDataWithFaker from './pages/PageShowcaseSampleDataWithFaker'; // ::showcaseSampleDataWithFaker
import PageShowcaseMongoDBDriverCRUD from './pages/PageShowcaseMongoDBDriverCRUD'; // ::showcaseMongoDBDriverCRUD
import PageGenerateMockData from './pages/PageGenerateMockData'; // ::generateMockData
import PageShowcaseMongooseCRUD from './pages/PageShowcaseMongooseCRUD'; // ::showcaseMongooseCRUD
import PageSiteVersions from './pages/PageSiteVersions'; // ::siteVersions
import { itemPageManager } from '../custom/pages/itemPages/itemPageManager';
import _PageHowtos from '../custom/pages/PageHowtos'; // ::howtos
import PageFlashcards from './pages/PageFlashcards'; // ::flashcards
import pages from './data/json/itemTypes/itemType_pages.json';
import _initialHowtos from '../custom/models/model_howtos';
import { IItem } from '../custom/models/interfaces';

const currentSiteVersion = (data_versioning as any).versions[0];

const PageHowtos = itemPageManager(
	_PageHowtos,
	_initialHowtos,
	'howtos',
	'Howtos',
	`Edward's howtos and code examples`,
	(title: string) => `Howto: ${title}`,
	[
		{
			idCode: 'lastThree',
			title: 'Last Three',
			getItems: (items: IItem[]) =>
				qarr
					.sortObjects(items, 'systemWhenCreated', 'desc')
					.slice(0, 3),
		},
	]
);

const displayOrderSortedPages = qarr.sortObjects(pages, 'displayOrder');

const userHasAccess = (pageIdCode: string) => {
	return pages.find(
		(page) =>
			page.idCode === pageIdCode &&
			(page.environment === 'frontendOnly' ||
				config.getSiteMode() === 'development')
	);
};

function Site() {
	return (
		<BrowserRouter>
			<div className="app_site">
				<div className="topArea">
					<div className="headerAndNav">
						<div className="topHeader">
							<h1 className="siteTitle">Edward Tanguay</h1>
						</div>
						<nav>
							<div className="pageLinks">
								{displayOrderSortedPages
									.filter(
										(page: any) =>
											page.environment ===
												'frontendOnly' ||
											config.getSiteMode() ===
												'development'
									)
									.map((page: any, i: number) => {
										const smartIdCode =
											page.idCode === 'home'
												? '/'
												: '/' + page.idCode;
										return (
											<span key={i}>
												<NavLink to={`${smartIdCode}`}>
													{page.title}
												</NavLink>
											</span>
										);
									})}
							</div>
						</nav>
					</div>
					<NavLink to="siteVersions">
						<div className="versionInfo">
							<div className="innerArea">
								<div className="core">
									Built on Datapod-for-React CORE
								</div>
								<div className="versionInfo">
									<span className="version">
										Version {currentSiteVersion.version}
									</span>
									<span className="date">
										{' '}
										- {currentSiteVersion.whenPublished}
									</span>
								</div>
								<div className="details">
									{currentSiteVersion.shortDescription}
								</div>
							</div>
						</div>
					</NavLink>{' '}
				</div>
				<section className="app_container">
					<Routes>
						<Route path="/" element={<PageHome />} />
						{/* DYNAMIC_JSX_AREA: routePageComponentLines */}
						<Route
							path="/showcaseCounterUsingState"
							element={<PageShowcaseCounterUsingState />}
						/>
						{/* ::showcaseCounterUsingState */}
						{userHasAccess('showcaseCounterUsingReducer') && (
							<Route
								path="/showcaseCounterUsingReducer"
								element={<PageShowcaseCounterUsingReducer />}
							/>
						)}{' '}
						{/* ::showcaseCounterUsingReducer */}
						{userHasAccess('showcaseTypeScriptClasses') && (
							<Route
								path="/showcaseTypeScriptClasses"
								element={<PageShowcaseTypeScriptClasses />}
							/>
						)}{' '}
						{/* ::showcaseTypeScriptClasses */}
						{userHasAccess('showcaseJavaScriptComponent') && (
							<Route
								path="/showcaseJavaScriptComponent"
								element={<PageShowcaseJavaScriptComponent />}
							/>
						)}{' '}
						{/* ::showcaseJavaScriptComponent */}
						{userHasAccess('showcaseSqliteReader') && (
							<Route
								path="/showcaseSqliteReader"
								element={<PageShowcaseSqliteReader />}
							/>
						)}{' '}
						{/* ::showcaseSqliteReader */}
						{userHasAccess('showcaseJsonReadWrite') && (
							<Route
								path="/showcaseJsonReadWrite"
								element={<PageShowcaseJsonReadWrite />}
							/>
						)}{' '}
						{/* ::showcaseJsonReadWrite */}
						{userHasAccess('deletePage') && (
							<Route
								path="/deletePage"
								element={<PageDeletePage />}
							/>
						)}{' '}
						{/* ::deletePage */}
						{userHasAccess('createPage') && (
							<Route
								path="/createPage"
								element={<PageCreatePage />}
							/>
						)}{' '}
						{/* ::createPage */}
						{userHasAccess('showcaseNewsApi') && (
							<Route
								path="/showcaseNewsApi"
								element={<PageShowcaseNewsApi />}
							/>
						)}{' '}
						{/* ::showcaseNewsApi */}
						{userHasAccess('manageShowcaseReports') && (
							<Route
								path="/manageShowcaseReports"
								element={<PageManageShowcaseReports />}
							/>
						)}{' '}
						{/* ::manageShowcaseReports */}
						{userHasAccess('showcaseUseToggle') && (
							<Route
								path="/showcaseUseToggle"
								element={<PageShowcaseUseToggle />}
							/>
						)}{' '}
						{/* ::showcaseUseToggle */}
						{userHasAccess('showcaseClassInState') && (
							<Route
								path="/showcaseClassInState"
								element={<PageShowcaseClassInState />}
							/>
						)}{' '}
						{/* ::showcaseClassInState */}
						{userHasAccess('showcaseFetchTryCatch') && (
							<Route
								path="/showcaseFetchTryCatch"
								element={<PageShowcaseFetchTryCatch />}
							/>
						)}{' '}
						{/* ::showcaseFetchTryCatch */}
						{userHasAccess('showcaseReactIcons') && (
							<Route
								path="/showcaseReactIcons"
								element={<PageShowcaseReactIcons />}
							/>
						)}{' '}
						{/* ::showcaseReactIcons */}
						{userHasAccess('curriculumFlashcardParser') && (
							<Route
								path="/curriculumFlashcardParser"
								element={<PageCurriculumFlashcardParser />}
							/>
						)}{' '}
						{/* ::curriculumFlashcardParser */}
						{userHasAccess('importAssessmentJSONIntoSQLite') && (
							<Route
								path="/importAssessmentJSONIntoSQLite"
								element={<PageImportAssessmentJSONIntoSQLite />}
							/>
						)}{' '}
						{/* ::importAssessmentJSONIntoSQLite */}
						{userHasAccess('showcaseSampleDataWithFaker') && (
							<Route
								path="/showcaseSampleDataWithFaker"
								element={<PageShowcaseSampleDataWithFaker />}
							/>
						)}{' '}
						{/* ::showcaseSampleDataWithFaker */}
						{userHasAccess('showcaseMongoDBDriverCRUD') && (
							<Route
								path="/showcaseMongoDBDriverCRUD"
								element={<PageShowcaseMongoDBDriverCRUD />}
							/>
						)}{' '}
						{/* ::showcaseMongoDBDriverCRUD */}
						{userHasAccess('generateMockData') && (
							<Route
								path="/generateMockData"
								element={<PageGenerateMockData />}
							/>
						)}{' '}
						{/* ::generateMockData */}
						{userHasAccess('showcaseMongooseCRUD') && (
							<Route
								path="/showcaseMongooseCRUD"
								element={<PageShowcaseMongooseCRUD />}
							/>
						)}{' '}
						{/* ::showcaseMongooseCRUD */}
						{userHasAccess('howtos') && (
							<Route
								key={Date.now()}
								path="/howtos"
								element={<PageHowtos />}
							/>
						)}{' '}
						{/* ::howtos */}
						<Route
							path="/siteVersions"
							element={<PageSiteVersions />}
						/>
						{/* ::siteVersions */}
						{userHasAccess('flashcards') && (
							<Route
								path="/flashcards"
								element={<PageFlashcards />}
							/>
						)}{' '}
						{/* ::flashcards */}
					</Routes>
				</section>
			</div>
		</BrowserRouter>
	);
}

export default Site;
