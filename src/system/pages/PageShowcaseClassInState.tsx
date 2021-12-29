import { useEffect, useState } from 'react';
import '../styles/page_showcaseClassInState.scss';

class Test {
	private message: string = '';
	constructor(message: string) {
		this.message = message;
	}
	getMessage() {
		return this.message;
	}
}

function PageShowcaseClassInState() {
	const [test, setTest] = useState(new Test('nnn'));

	// const test = new Test('this is a test');
	// const message = test.getMessage();

	useEffect(() => {
		setTest(new Test('second test'));
	}, []);

	return (
		<div className="page page_showcaseClassInState">
			<h2 className="title">Showcase Class In State</h2>
			<p className="description">A page that displays a class used in a state variable.</p>
			<p className="message">Welcome to this page.</p>

			<div>{test.getMessage()}</div>

		</div>
	)
}

export default PageShowcaseClassInState;