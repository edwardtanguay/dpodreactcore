import '../styles/page_siteVersions.scss';
import data_versioning from '../data/json/data_versioning.json';

const siteVersions = (data_versioning as any).versions.sort(
	(a: any, b: any) => (a.whenPublished < b.whenPublished ? 1 : -1)
);

function PageSiteVersions() {
	return (
		<div className="page page_siteVersions">
			<h2 className="title">Datapod-for-React CORE</h2>
			<h3>Version history</h3>
			<div className="invite">
				You want to help me develop the Datapod-for-React framework?{' '}
				<a
					href="https://github.com/edwardtanguay/dpodreactcore"
					target="_blank"
					rel="noreferrer"
				>
					Fork, code, create a pull-request
				</a>
			</div>
			<div className="versions">
				<ul>
					{siteVersions.map((sv: any, index: number) => {
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
			</div>
		</div>
	);
}

export default PageSiteVersions;
