interface IProps {
	items: any[];
	searchText: string;
	_initialItems: any[];
	showAllItems: any;
	itemTypePluralTitleNotation: string;
}

export const ItemPageHeader = (props: IProps) => {
	const { items, searchText, _initialItems, showAllItems , itemTypePluralTitleNotation} = props;
	return (
		<>
			{items.length > 1 && searchText === '' && (
				<h2 className="title">{items.length} Howtos</h2>
			)}
			{items.length === 1 && searchText === '' && (
				<h2 className="title oneOfMany">
					1 of {_initialItems.length}{' '}
					<span
						className="itemTypeTitle"
						onClick={() => showAllItems()}
					>
						{itemTypePluralTitleNotation}
					</span>
				</h2>
			)}
			{items.length === 0 && searchText !== '' && (
				<h2 className="title oneOfMany">
					0 of {_initialItems.length}{' '}
					<span
						className="itemTypeTitle"
						onClick={() => showAllItems()}
					>
						{itemTypePluralTitleNotation}
					</span>
				</h2>
			)}
			{items.length > 1 && searchText !== '' && (
				<h2 className="title oneOfMany">
					{items.length} of {_initialItems.length}{' '}
					<span
						className="itemTypeTitle"
						onClick={() => showAllItems()}
					>
						{itemTypePluralTitleNotation}
					</span>
				</h2>
			)}
			{items.length === 1 && searchText !== '' && (
				<h2 className="title oneOfMany">
					1 of {_initialItems.length}{' '}
					<span
						className="itemTypeTitle"
						onClick={() => showAllItems()}
					>
						{itemTypePluralTitleNotation}
					</span>
				</h2>
			)}
		</>
	);
};
