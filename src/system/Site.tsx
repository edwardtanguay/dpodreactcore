import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './styles/reset.scss';
import './styles/site.scss';
import './styles/dpod.scss';
import PageHome from '../custom/components/PageHome';
import * as config from '../system/config';
import * as qarr from '../system/qtools/qarr';

// DYNAMIC_CODE_AREA: loadPageComponentLines
import PageShowcaseCounterUsingState from './pages/PageShowcaseCounterUsingState'; // ::showcaseCounterUsingState
import PageShowcaseCounterUsingReducer from './pages/PageShowcaseCounterUsingReducer';// ::showcaseCounterUsingReducer
import PageShowcaseTypeScriptClasses from './pages/PageShowcaseTypeScriptClasses';// ::showcaseTypeScriptClasses
// import PageShowcaseJavaScriptComponent from './pages/PageShowcaseJavaScriptComponent';// ::showcaseJavaScriptComponent
// import PageShowcaseSqliteReader from './pages/PageShowcaseSqliteReader';// ::showcaseSqliteReader
// import PageShowcaseJsonReadWrite from './pages/PageShowcaseJsonReadWrite';// ::showcaseJsonReadWrite
// import PageDeletePage from './pages/PageDeletePage';// ::deletePage
// import PageCreatePage from './pages/PageCreatePage';// ::createPage
// import PageShowcaseNewsApi from './pages/PageShowcaseNewsApi';// ::showcaseNewsApi
// import PageManageShowcaseReports from './pages/PageManageShowcaseReports';// ::manageShowcaseReports
// import PageShowcaseUseToggle from './pages/PageShowcaseUseToggle';// ::showcaseUseToggle
// import PageShowcaseClassInState from './pages/PageShowcaseClassInState';// ::showcaseClassInState
// import PageShowcaseFetchTryCatch from './pages/PageShowcaseFetchTryCatch';// ::showcaseFetchTryCatch
// import PageShowcaseReactIcons from './pages/PageShowcaseReactIcons';// ::showcaseReactIcons
// import PageCurriculumFlashcardParser from './pages/PageCurriculumFlashcardParser';// ::curriculumFlashcardParser
// import PageImportAssessmentJSONIntoSQLite from './pages/PageImportAssessmentJSONIntoSQLite';// ::importAssessmentJSONIntoSQLite
// import PageShowcaseSampleDataWithFaker from './pages/PageShowcaseSampleDataWithFaker';// ::showcaseSampleDataWithFaker
// import PageShowcaseMongoDBDriverCRUD from './pages/PageShowcaseMongoDBDriverCRUD';// ::showcaseMongoDBDriverCRUD
// import PageGenerateMockData from './pages/PageGenerateMockData';// ::generateMockData
// import PageShowcaseMongooseCRUD from './pages/PageShowcaseMongooseCRUD';// ::showcaseMongooseCRUD
// import PageHowtos from '../custom/pages/PageHowtos';// ::howtos
// import PageFlashcards from './pages/PageFlashcards';// ::flashcards

import pages from './data/json/itemTypes/itemType_pages.json';

const displayOrderSortedPages = qarr.sortObjects(pages, 'displayOrder');

const userHasAccess = (pageIdCode: string) => {
	return pages.find(page => page.idCode === pageIdCode);
}

function Site() {

	return (
		<div className='app_site'>
			<div className="topHeader">
				<h1 className='siteTitle'>Edward Tanguay</h1>
			</div>
			<BrowserRouter>
				<nav>
					{displayOrderSortedPages.filter((page: any) => page.environment === 'frontendOnly' || config.getSiteMode() === 'development').map((page: any, i: number) => {
						const smartIdCode = page.idCode === 'home' ? '/' : '/' + page.idCode;
						return <span key={i}><NavLink to={`${smartIdCode}`}>{page.title}</NavLink></span>
					})}
				</nav>

				<section className='app_container'>
					<Routes>
						<Route path='/' element={<PageHome />} />
						{/* DYNAMIC_JSX_AREA: routePageComponentLines */}
						{userHasAccess('showcaseCounterUsingState') && <Route path='/showcaseCounterUsingState' element={<PageShowcaseCounterUsingState />} />} {/* ::showcaseCounterUsingState */}
						{userHasAccess('showcaseCounterUsingReducer') && <Route path='/showcaseCounterUsingReducer' element={<PageShowcaseCounterUsingReducer />} />} {/* ::showcaseCounterUsingReducer */}
						{userHasAccess('showcaseTypeScriptClasses') && <Route path='/showcaseTypeScriptClasses' element={<PageShowcaseTypeScriptClasses />} />} {/* ::showcaseTypeScriptClasses */}

					</Routes>
				</section>
			</BrowserRouter>
		</div>
	);
}

export default Site;