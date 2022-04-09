interface IProps {
	items: any[];
	searchText: string;
	_initialHowtos: any[];
	showAllItems: any;
}

export const ItemPageHeader = (props: IProps) => {
	const {items, searchText, _initialHowtos, showAllItems} = props;
	return (
		<>
				{items.length > 1 && searchText === '' && (
					<h2 className="title">{items.length} Howtos</h2>
				)}
				{items.length === 1 && searchText === '' && (
					<h2 className="title oneOfMany">
						1 of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{items.length === 0 && searchText !== '' && (
					<h2 className="title oneOfMany">
						0 of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{items.length > 1 && searchText !== '' && (
					<h2 className="title oneOfMany">
						{items.length} of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{items.length === 1 && searchText !== '' && (
					<h2 className="title oneOfMany">
						1 of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
		</>
)
};