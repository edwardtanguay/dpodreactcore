import '../styles/page_howtos.scss';
import howtos from '../data/json/itemTypes/itemType_howtos.json';
// @ts-ignore
import { Helmet } from 'react-helmet';
import * as qarr from '../../system/qtools/qarr';

// const sortedHowtos = howtos.sort((a,b) => a.systemWhenCreated - b.systemWhenCreated);
const sortedHowtos = qarr.sortObjects(howtos, 'systemWhenCreated', 'desc');

function PageHowtos() {

	return (
		<>
			<Helmet>
				<title>Edward Tanguay - Code Examples</title>
				<meta name="description" content="Edward's code examples, ideas and explanations" />
			</Helmet>
			<div className="page page_howtos">
				<h2 className="title">{howtos.length} Howtos</h2>
				<section className="howtos">
					{sortedHowtos.map((howto: any, i: number) => {
						return (
							<p key={i}>{howto.systemWhenCreated.substr(0, 10)} - <a target="_blank" href={`https://onespace.netlify.app/howtos?id=${howto.id}`} rel="noreferrer">{howto.title}</a></p>
						)
					})}
				</section>
			</div>
		</>
	)
}

export default PageHowtos;