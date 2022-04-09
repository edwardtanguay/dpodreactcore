interface IProps {
	refSearchText: any;
	searchText: string;
	displaySearchResults: any;
}

export const ItemPageSearch = (props: IProps) => {

	const {refSearchText,searchText, displaySearchResults} = props;

	return (
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
	)
}