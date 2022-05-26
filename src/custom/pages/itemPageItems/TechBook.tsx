import { ITechBook } from '../../models/interfaces';

interface IProps {
	items: ITechBook[];
	getCurrentItem: any;
	convertNotesToNotesParsed: any;
}

export const TechBook = (props: IProps) => {
	const { items, getCurrentItem, convertNotesToNotesParsed } = props;
	return (
		<>
			{items.length === 1 && (
				<div className="item">
					<div className="header">
						<img
							src={`customImages/techBooks/${
								getCurrentItem().idCode
							}.jpg`}
							alt="book"
						/>
						<div className="info">
							<div className="title">
								{getCurrentItem().title}
							</div>
							<div className="additionalInfo">
								<span className="publishedDate">published {getCurrentItem().yearMonth}</span>
							</div>
							<div className="description">
								{getCurrentItem().description}
							</div>
						</div>
					</div>
					<div className="body">
						<div
							dangerouslySetInnerHTML={{
								__html: convertNotesToNotesParsed(
									getCurrentItem()
								),
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
};
