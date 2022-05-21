import useToggle from '../hooks/useToggle';
import '../styles/page_showcaseUseToggle.scss';

function PageShowcaseUseToggle() {
	const [isOnline, toggleIsOnline] = useToggle(false);
	const [isAdmin, toggleIsAdmin] = useToggle(true);
	const [isComplete, toggleIsComplete] = useToggle(false);

	return (
		<div className="page page_showcaseUseToggle">
			<h2 className="title">Showcase: useToggle()</h2>
			<p className="description">This shows how to use the custom hook useToggle()</p>
			<div className="showArea">User is online: <span className="theValue">{isOnline.toString()}</span></div>
			<div className="showArea">User is admin: <span className="theValue">{isAdmin.toString()}</span></div>
			<div className="showArea">Project is complete: <span className="theValue">{isComplete.toString()}</span></div>
			<div className="controls">
				<div className="buttonArea">
					<div>Online:</div>
					<button onClick={() => toggleIsOnline()}>Toggle</button>
					<button onClick={() => toggleIsOnline(true)}>Make True</button>
					<button onClick={() => toggleIsOnline(false)}>Make False</button>
				</div>
				<div className="buttonArea">
					<div>Admin:</div>
					<button onClick={() => toggleIsAdmin()}>Toggle</button>
					<button onClick={() => toggleIsAdmin(true)}>Make True</button>
					<button onClick={() => toggleIsAdmin(false)}>Make False</button>
				</div>
				<div className="buttonArea">
					<div>Complete:</div>
					<button onClick={() => toggleIsComplete()}>Toggle</button>
					<button onClick={() => toggleIsComplete(true)}>Make True</button>
					<button onClick={() => toggleIsComplete(false)}>Make False</button>
				</div>
			</div>
		</div>
	)
}

export default PageShowcaseUseToggle;