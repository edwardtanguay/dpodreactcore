import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
import PageShowcaseJavaScriptComponent from './pages/PageShowcaseJavaScriptComponent';// ::showcaseJavaScriptComponent
import PageShowcaseSqliteReader from './pages/PageShowcaseSqliteReader';// ::showcaseSqliteReader
import PageShowcaseJsonReadWrite from './pages/PageShowcaseJsonReadWrite';// ::showcaseJsonReadWrite
import PageDeletePage from './pages/PageDeletePage';// ::deletePage
import PageCreatePage from './pages/PageCreatePage';// ::createPage
import PageShowcaseNewsApi from './pages/PageShowcaseNewsApi';// ::showcaseNewsApi
import PageManageShowcaseReports from './pages/PageManageShowcaseReports';// ::manageShowcaseReports
import PageShowcaseUseToggle from './pages/PageShowcaseUseToggle';// ::showcaseUseToggle
import PageShowcaseClassInState from './pages/PageShowcaseClassInState';// ::showcaseClassInState
import PageShowcaseFetchTryCatch from './pages/PageShowcaseFetchTryCatch';// ::showcaseFetchTryCatch
import PageShowcaseReactIcons from './pages/PageShowcaseReactIcons';// ::showcaseReactIcons
import PageCurriculumFlashcardParser from './pages/PageCurriculumFlashcardParser';// ::curriculumFlashcardParser
import PageImportAssessmentJSONIntoSQLite from './pages/PageImportAssessmentJSONIntoSQLite';// ::importAssessmentJSONIntoSQLite
import PageShowcaseSampleDataWithFaker from './pages/PageShowcaseSampleDataWithFaker';// ::showcaseSampleDataWithFaker
import PageShowcaseMongoDBDriverCRUD from './pages/PageShowcaseMongoDBDriverCRUD';// ::showcaseMongoDBDriverCRUD
import PageGenerateMockData from './pages/PageGenerateMockData';// ::generateMockData
import PageShowcaseMongooseCRUD from './pages/PageShowcaseMongooseCRUD';// ::showcaseMongooseCRUD
import PageHowtos from '../custom/pages/PageHowtos';// ::howtos
import PageFlashcards from './pages/PageFlashcards';// ::flashcards

import pages from './data/json/itemTypes/itemType_pages.json';

const displayOrderSortedPages = qarr.sortObjects(pages, 'displayOrder');

const userHasAccess = (pageIdCode: string) => {
	return pages.find(page => page.idCode === pageIdCode);
}

function Site() {

	return (
		<Router>
			<div className='app_site'>
				<div className="topHeader">
					<h1 className='siteTitle'>Edward Tanguay</h1>
				</div>
				<nav>
					{displayOrderSortedPages.filter((page: any) => page.environment === 'frontendOnly' || config.getSiteMode() === 'development').map((page: any, i: number) => {
						const smartIdCode = page.idCode === 'home' ? '/' : '/' + page.idCode;
						return <span key={i}><Link to={`${smartIdCode}`}>{page.title}</Link></span>
					})}
				</nav>

				<section className='app_container'>
					<Switch>
						<Route exact path='/'><PageHome /></Route>
						{/* DYNAMIC_JSX_AREA: routePageComponentLines */}
						<Route path='/showcaseCounterUsingState'>{userHasAccess('showcaseCounterUsingState') && <PageShowcaseCounterUsingState />}</Route> {/* ::showcaseCounterUsingState */}
						<Route path='/showcaseCounterUsingReducer'>{userHasAccess('showcaseCounterUsingReducer') && <PageShowcaseCounterUsingReducer />}</Route> {/* ::showcaseCounterUsingReducer */}
						<Route path='/showcaseTypeScriptClasses'>{userHasAccess('showcaseTypeScriptClasses') && <PageShowcaseTypeScriptClasses />}</Route> {/* ::showcaseTypeScriptClasses */}
						<Route path='/showcaseJavaScriptComponent'>{userHasAccess('showcaseJavaScriptComponent') && <PageShowcaseJavaScriptComponent />}</Route> {/* ::showcaseJavaScriptComponent */}
						<Route path='/showcaseSqliteReader'>{userHasAccess('showcaseSqliteReader') && <PageShowcaseSqliteReader />}</Route> {/* ::showcaseSqliteReader */}
						<Route path='/showcaseJsonReadWrite'>{userHasAccess('showcaseJsonReadWrite') && <PageShowcaseJsonReadWrite />}</Route> {/* ::showcaseJsonReadWrite */}
						<Route path='/deletePage'>{userHasAccess('deletePage') && <PageDeletePage />}</Route> {/* ::deletePage */}
						<Route path='/createPage'>{userHasAccess('createPage') && <PageCreatePage />}</Route> {/* ::createPage */}
						<Route path='/showcaseNewsApi'>{userHasAccess('showcaseNewsApi') && <PageShowcaseNewsApi />}</Route> {/* ::showcaseNewsApi */}
						<Route path='/manageShowcaseReports'>{userHasAccess('manageShowcaseReports') && <PageManageShowcaseReports />}</Route> {/* ::manageShowcaseReports */}
						<Route path='/showcaseUseToggle'>{userHasAccess('showcaseUseToggle') && <PageShowcaseUseToggle />}</Route> {/* ::showcaseUseToggle */}
						<Route path='/showcaseClassInState'>{userHasAccess('showcaseClassInState') && <PageShowcaseClassInState />}</Route> {/* ::showcaseClassInState */}
						<Route path='/showcaseFetchTryCatch'>{userHasAccess('showcaseFetchTryCatch') && <PageShowcaseFetchTryCatch />}</Route> {/* ::showcaseFetchTryCatch */}
						<Route path='/showcaseReactIcons'>{userHasAccess('showcaseReactIcons') && <PageShowcaseReactIcons />}</Route> {/* ::showcaseReactIcons */}
						<Route path='/curriculumFlashcardParser'>{userHasAccess('curriculumFlashcardParser') && <PageCurriculumFlashcardParser />}</Route> {/* ::curriculumFlashcardParser */}
						<Route path='/importAssessmentJSONIntoSQLite'>{userHasAccess('importAssessmentJSONIntoSQLite') && <PageImportAssessmentJSONIntoSQLite />}</Route> {/* ::importAssessmentJSONIntoSQLite */}
						<Route path='/showcaseSampleDataWithFaker'>{userHasAccess('showcaseSampleDataWithFaker') && <PageShowcaseSampleDataWithFaker />}</Route> {/* ::showcaseSampleDataWithFaker */}
						<Route path='/showcaseMongoDBDriverCRUD'>{userHasAccess('showcaseMongoDBDriverCRUD') && <PageShowcaseMongoDBDriverCRUD />}</Route> {/* ::showcaseMongoDBDriverCRUD */}
						<Route path='/generateMockData'>{userHasAccess('generateMockData') && <PageGenerateMockData />}</Route> {/* ::generateMockData */}
						<Route path='/showcaseMongooseCRUD'>{userHasAccess('showcaseMongooseCRUD') && <PageShowcaseMongooseCRUD />}</Route> {/* ::showcaseMongooseCRUD */}
						<Route path='/howtos'>{userHasAccess('howtos') && <PageHowtos />}</Route> {/* ::howtos */}
						<Route path='/flashcards'>{userHasAccess('flashcards') && <PageFlashcards />}</Route>{/* ::flashcards */}
					</Switch>
				</section>
			</div>
		</Router >
	);
}

export default Site;