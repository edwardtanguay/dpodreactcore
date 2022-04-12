import { IFlashcard } from '../../models/interfaces';
import * as qdat from '../../../system/qtools/qdat';

interface IProps {
	items: IFlashcard[];
	getCurrentItem: any;
	convertBodyToBodyParsed: any;
}

export const Flashcard = (props: IProps) => {
	const {items, getCurrentItem, convertBodyToBodyParsed} = props;
	return (
		<>
			{items.length === 1 && (
				<div className="item">
					<div className="header">
						<div>
							<span className="createDate">
								{qdat.smartDateWithYear(
									getCurrentItem().systemWhenCreated
								)}
							</span>{' '}
							<span className="category">
								{getCurrentItem().category}
							</span>
						</div>
						<div className="headerRow">
							<div className="title">
								{getCurrentItem().front}
							</div>
						</div>
					</div>
					<div className="body">
						<div
							dangerouslySetInnerHTML={{
								__html: convertBodyToBodyParsed(
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
