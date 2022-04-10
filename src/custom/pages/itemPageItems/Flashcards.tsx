import { IFlashcard } from '../../models/interfaces';
import * as qdat from '../../../system/qtools/qdat';

interface IProps {
	items: IFlashcard[];
	displayOneItem: any;
	searchText: string;
}

export const Flashcards = (props: IProps) => {
	const { items, displayOneItem, searchText } = props;

	return (
		<div>
			{items.length > 1 && (
				<section className="flashcards">
					{items.map((flashcard: any, i: number) => {
						return (
							<div key={i} className="overviewItem">
								<div className="header">
									<span className="createDate">
										{qdat.smartDateWithYear(
											flashcard.systemWhenCreated
										)}
									</span>{' '}
									<span className="category">
										{flashcard.categoryTitle}
									</span>
								</div>
								<div
									key={i}
									className="itemLinkTitle"
									onClick={() => displayOneItem(flashcard.id)}
								>
									{searchText !== '' && (
										<span
											dangerouslySetInnerHTML={{
												__html: flashcard.highlightedTitle,
											}}
										></span>
									)}
									{searchText === '' && <>{flashcard.title}</>}
								</div>
							</div>
						);
					})}
				</section>
			)}
		</div>
	);
};
