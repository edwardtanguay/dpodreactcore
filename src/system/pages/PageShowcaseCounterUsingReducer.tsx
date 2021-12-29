import { useReducer } from 'react'
import '../styles/page_showcaseCounterUsingReducer.scss';

const initialState = { count: 0, lastAction: '' };

interface ICounterState {
	count: number;
	lastAction: string;
}

interface ICounterAction {
	type: string;
}

function reducer(state: ICounterState, action: ICounterAction) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1, lastAction: 'increment' };
		case 'decrement':
			return { count: state.count - 1, lastAction: 'decrement' };
		default:
			throw new Error();
	}
}

function PageShowcaseCounterUsingReducer() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<div className="page page_showcaseCounterUsingReducer">
			<h2 className="title">Showcase: Counter Using useReducer()</h2>
			<p className="description">This shows how to use useReducer to change state</p>
			<div className="page page_showcaseCounterUsingReducer">
				<div className="countArea">
					<div>Count: {state.count}</div>
					<div>Last Action: {state.lastAction}</div>
				</div>
				<div className="buttonArea">
					<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
					<button onClick={() => dispatch({ type: 'increment' })}>+</button>
				</div>
			</div>
		</div>
	);
}

export default PageShowcaseCounterUsingReducer;