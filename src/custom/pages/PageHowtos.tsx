import '../styles/page_howtos.scss';
import { IItemPageProps } from '../models/interfaces';
// import _initialItems from '../models/model_howtos';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode,  forceConsistentStateData } = props;
	// const [items, setItems] = useState<IHowto[]>([]);

	const handleClick = () => {
		forceConsistentStateData({ idCode: 'lesson002' });
	};

	const handleClick2 = () => {
		forceConsistentStateData({ searchText: 'react router' });
	};

	return (
		<div className="page page_howtos">
			<h2>Testing</h2>
			<ul>
				<li>id: [{id}]</li>
				<li>searchText: [{searchText}]</li>
				<li>idCode: [{idCode}]</li>
			</ul>
			<button onClick={handleClick}>change</button>
			<button onClick={handleClick2}>change2</button>
		</div>
	);
}

export default PageHowtos;
