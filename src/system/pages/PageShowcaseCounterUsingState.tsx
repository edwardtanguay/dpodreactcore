import { useState } from 'react';
import '../styles/page_showcaseCounterUsingState.scss';

function PageShowcaseCounterUsingState() {
	const [count, setCount] = useState(0);

	const incrementCountHandler = () => {
		setCount(prevCount => prevCount + 1);
	};

	const decrementCountHandler = () => {
		setCount(prevCount => prevCount - 1);
	};

	const resetCountHandler = () => {
		setCount(0);
	};

	return (
		<div className="page page_showcaseCounterUsingState">
			<h2 className="title">Showcase: Counter Using useState()</h2>
			<p className="description">This is a simple demonstration how to use state on a React page</p>
			<div className='button'>
				<p>You can count between 0 and 10:</p>
				<button onClick={decrementCountHandler} disabled={count === 0}>
					Click - 1
				</button>
				<button onClick={resetCountHandler}>Click 0</button>
				<button onClick={incrementCountHandler} disabled={count === 10}>
					Click + 1
				</button>
			</div>

			<p className="theCount">{count}</p>
		</div>
	)
}

export default PageShowcaseCounterUsingState;