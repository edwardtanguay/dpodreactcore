import { useState } from 'react';
import '../styles/page_showcaseTypeScriptClasses.scss';

interface IMessageManager {
	title: string;
	addMessage(arg: string): void;
	getMessage(): string;
}

class MessageManager implements IMessageManager {

	public title: string;
	private messages: string[];

	constructor() {
		this.messages = [];
		this.title = 'Message Manager';
	}

	addMessage(message: string) {
		this.messages.push(message);
	}

	getMessage(): string {
		return `the ${this.title} class says ${this.messages.pop()}` || '';
	}
}

function PageShowcaseTypeScriptClasses() {

	const [message, setMessage] = useState('___________');

	const messageManager = new MessageManager();
	messageManager.addMessage('testing');

	const changeValue = () => {
		setMessage(messageManager.getMessage());
	}
	return (
		<div className="page page_showcaseTypeScriptClasses">
			<h2 className="title">Showcase: TypeScript Classes</h2>
			<p className="description">An info page that displays how to use TypeScript classes with interfaces</p>
			<p>The message from the message manager is <span className="message">{message}</span>.</p>
			<button onClick={() => changeValue()}>Change value</button>
		</div>
	)
}

export default PageShowcaseTypeScriptClasses;