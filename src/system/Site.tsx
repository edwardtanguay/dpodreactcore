import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ShowContext from '../context/ShowContext.jsx';
import './styles/reset.scss';
import './styles/site.scss';
import './styles/dpod.scss';
import PageHome from '../custom/components/PageHome';

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
				<nav>
					<span>
						<Link to='/'>Home</Link>
					</span>
					{isShowing && (
						<>
							{/* DYNAMIC_JSX_AREA: linkPageComponentLines */}
							<span><Link to='/createPage'>Create Page</Link></span>{/* ::createPage */}
							<span><Link to='/deletePage'>Delete Page</Link></span>{/* ::deletePage */}
							<span><Link to='/showcaseCounterUsingState'>Showcase: Counter Using useState()</Link></span> {/* ::showcaseCounterUsingState */}
							<span><Link to='/showcaseCounterUsingReducer'>Showcase: Counter Using useReducer()</Link></span>{/* ::showcaseCounterUsingReducer */}
							<span><Link to='/showcaseTypeScriptClasses'>Showcase: TypeScript Classes</Link></span>{/* ::showcaseTypeScriptClasses */}
							<span><Link to='/showcaseJavaScriptComponent'>Showcase: JavaScript Component</Link></span>{/* ::showcaseJavaScriptComponent */}
							<span><Link to='/showcaseSqliteReader'>Showcase: SQLite Reader</Link></span>{/* ::showcaseSqliteReader */}
							<span><Link to='/showcaseJsonReadWrite'>Showcase: JSON Read/Write</Link></span>{/* ::showcaseJsonReadWrite */}
							<span><Link to='/showcaseNewsApi'>Showcase: News Api</Link></span>{/* ::showcaseNewsApi */}
							<span><Link to='/manageShowcaseReports'>Manage Showcase Reports</Link></span>{/* ::manageShowcaseReports */}
							<span><Link to='/showcaseUseToggle'>Showcase: useToggle()</Link></span>{/* ::showcaseUseToggle */}
							<span><Link to='/showcaseClassInState'>Showcase Class In State</Link></span>{/* ::showcaseClassInState */}
							<span><Link to='/showcaseFetchTryCatch'>Showcase: Fetch Try/Catch</Link></span>{/* ::showcaseFetchTryCatch */}
							<span><Link to='/showcaseReactIcons'>Showcase: React-Icons</Link></span>{/* ::showcaseReactIcons */}
							<span><Link to='/curriculumFlashcardParser'>Curriculum Flashcard Parser</Link></span>{/* ::curriculumFlashcardParser */}
							<span><Link to='/importAssessmentJSONIntoSQLite'>Import Assessment JSON into SQLite</Link></span>{/* ::importAssessmentJSONIntoSQLite */}
							<span><Link to='/showcaseSampleDataWithFaker'>Showcase: Sample Data with Faker</Link></span>{/* ::showcaseSampleDataWithFaker */}
							<span><Link to='/showcaseMongoDBDriverCRUD'>Showcase: MongoDB Driver CRUD</Link></span>{/* ::showcaseMongoDBDriverCRUD */}
							<span><Link to='/generateMockData'>Generate Mock Data</Link></span>{/* ::generateMockData */}
							<span><Link to='/showcaseMongooseCRUD'>Showcase: Mongoose CRUD</Link></span>{/* ::showcaseMongooseCRUD */}
						</>
					)}
				</nav>

				<section className='app_container'>
					<Switch>
						<Route exact path='/'>
							<PageHome />
						</Route>
						{/* DYNAMIC_JSX_AREA: routePageComponentLines */}
						<Route path='/showcaseCounterUsingState'><PageShowcaseCounterUsingState /></Route> {/* ::showcaseCounterUsingState */}
						<Route path='/showcaseCounterUsingReducer'><PageShowcaseCounterUsingReducer /></Route>{/* ::showcaseCounterUsingReducer */}
						<Route path='/showcaseTypeScriptClasses'><PageShowcaseTypeScriptClasses /></Route>{/* ::showcaseTypeScriptClasses */}
						<Route path='/showcaseJavaScriptComponent'><PageShowcaseJavaScriptComponent /></Route>{/* ::showcaseJavaScriptComponent */}
						<Route path='/showcaseSqliteReader'><PageShowcaseSqliteReader /></Route>{/* ::showcaseSqliteReader */}
						<Route path='/showcaseJsonReadWrite'><PageShowcaseJsonReadWrite /></Route>{/* ::showcaseJsonReadWrite */}
						<Route path='/deletePage'><PageDeletePage /></Route>{/* ::deletePage */}
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
					</Switch>
				</section>
			</div>
		</Router>
	);
}

export default Site;