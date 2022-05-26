import { ITechBook } from '../../models/interfaces';
import * as qdat from '../../../system/qtools/qdat';

interface IProps {
	items: ITechBook[];
	getCurrentItem: any;
	convertNotesToNotesParsed: any;
}

export const TechBook = (props: IProps) => {
	const {items, getCurrentItem, convertNotesToNotesParsed} = props;
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
							</span>
						</div>
						<div className="headerRow">
							<div className="title">
								{getCurrentItem().title}
							</div>
						</div>
					</div>
					<div className="notes">
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
