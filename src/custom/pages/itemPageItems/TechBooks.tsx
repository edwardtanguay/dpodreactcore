import { ITechBook } from '../../models/interfaces';
import * as qdat from '../../../system/qtools/qdat';

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
								<div className="header">
									<span className="createDate">
										{qdat.smartDateWithYear(
											techBook.systemWhenCreated
										)}
									</span>
								</div>
								<div
									key={i}
									className="itemLinkTitle"
									onClick={() => displayOneItem(techBook.id)}
								>
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
							</div>
						);
					})}
				</section>
			)}
		</div>
	);
};