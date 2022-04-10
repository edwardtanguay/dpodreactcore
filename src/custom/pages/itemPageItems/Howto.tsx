import { IHowto } from '../../models/interfaces';
import * as qdat from '../../../system/qtools/qdat';

interface IProps {
	items: IHowto[];
	getCurrentItem: any;
	convertBodyToBodyParsed: any;
}

export const Howto = (props: IProps) => {
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
								{getCurrentItem().categoryTitle}
							</span>
						</div>
						<div className="headerRow">
							<div className="title">
								{getCurrentItem().title}
							</div>
						</div>
					</div>
					<div className="body">
						<div
							className="codeArea"
							dangerouslySetInnerHTML={{
								__html: convertBodyToBodyParsed(
									getCurrentItem()
								),
							}}
						/>
					</div>
					{getCurrentItem().jsfiddleUrl && (
						<div className="jsfiddleWrapper">
							<div className="title">jsfiddle:</div>
							<iframe
								title="JSFiddle"
								src={getCurrentItem().jsfiddleUrl}
								className="jsfiddle"
								width="100%"
								height="300"
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};
