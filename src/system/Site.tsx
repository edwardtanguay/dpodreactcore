import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ShowContext from '../context/ShowContext.jsx';
import './styles/reset.scss';
import './styles/site.scss';
import './styles/dpod.scss';
import PageHome from '../custom/components/PageHome';
import * as config from '../system/config';

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
import PageHowtos from './pages/PageHowtos';// ::howtos

import pages from './data/json/itemTypes/itemType_pages.json';



function Site() {
	const { isShowing, setIsShowing } = useContext(ShowContext);

	const showHandler = () => {
		setIsShowing((prevIsShowing: boolean) => !prevIsShowing);
	};

	return (
		<Router>
			<div className='app_site'>
				<div className="topHeader">
					<h1 className='siteTitle'>Datapod for React<span className="version">Version 0.02.00</span></h1>
					<div className='menuToggle'>
						<label htmlFor='myToggle' className='toggle'>
							<input
								className='toggle_input'
								type='checkbox'
								id='myToggle'
								checked={isShowing}
								onChange={showHandler}
							/>
							<div className='toggle_fill'></div>
						</label>
					</div>
				</div>
				[{config.getSiteMode()}] - [{pages.length}]
				<nav>
					{pages.filter(page => page.environment === 'frontendOnly' || config.getSiteMode() === 'development').map((page: any, i: number) => {
						const smartIdCode = page.idCode === 'home' ? '/' : '/' + page.idCode;
						return <span><Link key={i} to={`${smartIdCode}`}>{page.title}</Link></span>
					})}
				</nav>

				<section className='app_container'>
					<Switch>
						<Route exact path='/'><PageHome /></Route>
						{/* DYNAMIC_JSX_AREA: routePageComponentLines */}
						<Route path='/showcaseCounterUsingState'><PageShowcaseCounterUsingState /></Route> {/* ::showcaseCounterUsingState */}
						<Route path='/showcaseCounterUsingReducer'><PageShowcaseCounterUsingReducer /></Route>{/* ::showcaseCounterUsingReducer */}
						<Route path='/showcaseTypeScriptClasses'><PageShowcaseTypeScriptClasses /></Route>{/* ::showcaseTypeScriptClasses */}
						<Route path='/showcaseJavaScriptComponent'><PageShowcaseJavaScriptComponent /></Route>{/* ::showcaseJavaScriptComponent */}
						<Route path='/showcaseSqliteReader'><PageShowcaseSqliteReader /></Route>{/* ::showcaseSqliteReader */}
						<Route path='/showcaseJsonReadWrite'><PageShowcaseJsonReadWrite /></Route>{/* ::showcaseJsonReadWrite */}
						<Route path='/deletePage'>{false && <PageDeletePage />}</Route>{/* ::deletePage */}
						<Route path='/createPage'><PageCreatePage /></Route>{/* ::createPage */}
						<Route path='/showcaseNewsApi'><PageShowcaseNewsApi /></Route>{/* ::showcaseNewsApi */}
						<Route path='/manageShowcaseReports'><PageManageShowcaseReports /></Route>{/* ::manageShowcaseReports */}
						<Route path='/showcaseUseToggle'><PageShowcaseUseToggle /></Route>{/* ::showcaseUseToggle */}
						<Route path='/showcaseClassInState'><PageShowcaseClassInState /></Route>{/* ::showcaseClassInState */}
						<Route path='/showcaseFetchTryCatch'><PageShowcaseFetchTryCatch /></Route>{/* ::showcaseFetchTryCatch */}
						<Route path='/showcaseReactIcons'><PageShowcaseReactIcons /></Route>{/* ::showcaseReactIcons */}
						<Route path='/curriculumFlashcardParser'><PageCurriculumFlashcardParser /></Route>{/* ::curriculumFlashcardParser */}
						<Route path='/importAssessmentJSONIntoSQLite'><PageImportAssessmentJSONIntoSQLite /></Route>{/* ::importAssessmentJSONIntoSQLite */}
						<Route path='/showcaseSampleDataWithFaker'><PageShowcaseSampleDataWithFaker /></Route>{/* ::showcaseSampleDataWithFaker */}
						<Route path='/showcaseMongoDBDriverCRUD'><PageShowcaseMongoDBDriverCRUD /></Route>{/* ::showcaseMongoDBDriverCRUD */}
						<Route path='/generateMockData'><PageGenerateMockData /></Route>{/* ::generateMockData */}
						<Route path='/showcaseMongooseCRUD'><PageShowcaseMongooseCRUD /></Route>{/* ::showcaseMongooseCRUD */}
						<Route path='/howtos'><PageHowtos /></Route>{/* ::howtos */}
					</Switch>
				</section>
			</div>
		</Router >
	);
}

export default Site;