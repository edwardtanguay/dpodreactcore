import { ITechBook } from '../../models/interfaces';

interface IProps {
	items: ITechBook[];
	displayOneItem: any;
	searchText: string;
}

export const TechBooks = (props: IProps) => {
	const { items, displayOneItem, searchText } = props;

	return (
		<div>
			{items.length > 1 && (
				<section className="techBooks">
					{items.map((techBook: any, i: number) => {
						return (
							<div key={i} className="overviewItem">
								<img
									onClick={() => displayOneItem(techBook.id)}
									src={`customImages/techBooks/${techBook.idCode}.jpg`}
									alt="book"
								/>
								<div className="info">
									<div className="title" onClick={() => displayOneItem(techBook.id)}>
										{searchText !== '' && (
											<span
												dangerouslySetInnerHTML={{
													__html: techBook.highlightedTitle,
												}}
											></span>
										)}
										{searchText === '' && (
											<>{techBook.title}</>
										)}
									</div>
									<div className="publishedDate" onClick={() => displayOneItem(techBook.id)}>
										published {techBook.yearMonth}
									</div>
									<div className="description" onClick={() => displayOneItem(techBook.id)}>
										{techBook.description}
									</div>
								</div>
							</div>
						);
					})}
				</section>
			)}
		</div>
	);
};
