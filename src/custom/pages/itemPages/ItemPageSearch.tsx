interface IProps {
	refSearchText: any;
	searchText: string;
	displaySearchResults: any;
	items: any[];
}

export const ItemPageSearch = (props: IProps) => {
	const { refSearchText, searchText, displaySearchResults,items } = props;

	return (
		<>
			{items.length > 0 && (
				<div className="searchArea">
					<div className="searchRow">
						<input
							id="mainSearch"
							placeholder="search howtos"
							ref={refSearchText}
							type="text"
							value={searchText}
							className="form-control input-sm searchBox"
							onFocus={displaySearchResults}
							onChange={displaySearchResults}
						/>
					</div>
				</div>
			)}
		</>
	);
};
