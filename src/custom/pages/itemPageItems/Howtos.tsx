import { IHowto } from '../../models/interfaces';
import * as qdat from '../../../system/qtools/qdat';

interface IProps {
	items: IHowto[];
	displayOneItem: any;
	searchText: string;
}

export const Howtos = (props: IProps) => {
	const { items, displayOneItem, searchText } = props;

	return (
		<div>
			{items.length > 1 && (
				<section className="howtos">
					{items.map((howto: any, i: number) => {
						return (
							<div key={i} className="overviewItem">
								<div className="header">
									<span className="createDate">
										{qdat.smartDateWithYear(
											howto.systemWhenCreated
										)}
									</span>{' '}
									{searchText !== '' && (
										<span className="category"
											dangerouslySetInnerHTML={{
												__html: howto.highlightedCategory,
											}}
										></span>
									)}
									{searchText === '' && (
										<span className="category">
											{howto.category}
										</span>
									)}
								</div>
								<div
									className="itemLinkTitle"
									onClick={() => displayOneItem(howto.id)}
								>
									{searchText !== '' && (
										<span
											dangerouslySetInnerHTML={{
												__html: howto.highlightedTitle,
											}}
										></span>
									)}
									{searchText === '' && <>{howto.title}</>}
								</div>
							</div>
						);
					})}
				</section>
			)}
		</div>
	);
};
