import '../styles/page_siteVersions.scss';
import rawSiteVersions from '../data/json/itemType_siteVersions.json';

const siteVersions = rawSiteVersions.sort((a, b) =>
	a.whenPublished < b.whenPublished ? 1 : -1
);

function PageSiteVersions() {
	return (
		<div className="page page_siteVersions">
			<h2 className="title">Datapod-for-React CORE</h2>
			<h3>Version history</h3>
			<div className="invite">
				You want to help me develop this?{' '}
				<a
					href="https://github.com/edwardtanguay/dpodreactcore"
					target="_blank"
					rel="noreferrer"
				>
					Fork, code, create a pull-request
				</a>
			</div>
			<p className="versions">
				<ul>
					{siteVersions.map((sv, index) => {
						return (
							<li key={index} className="siteVersion">
								<span className="version">{sv.version}</span>
								<span className="separator"> - </span>
								<span className="whenPublished">
									{sv.whenPublished}
								</span>
								<span className="separator"> - </span>
								<span className="shortDescription">
									{sv.shortDescription}
								</span>
							</li>
						);
					})}
				</ul>
			</p>
		</div>
	);
}

export default PageSiteVersions;
