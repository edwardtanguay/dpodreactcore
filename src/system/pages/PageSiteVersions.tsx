import '../styles/page_siteVersions.scss';
import data_versioning from '../data/json/data_versioning.json';

const versions = (data_versioning as any).versions.sort((a: any, b: any) =>
	a.whenPublished < b.whenPublished ? 1 : -1
);
const todos = (data_versioning as any).todos;

function PageSiteVersions() {
	return (
		<div className="page page_siteVersions">
			<h2 className="title">Datapod-for-React CORE</h2>
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
			<h3>Version history</h3>
			<div className="versions">
				<ul>
					{versions.map((version: any, index: number) => {
						return (
							<li key={index} className="siteVersion">
								<span className="version">{version.version}</span>
								<span className="separator"> - </span>
								<span className="whenPublished">
									{version.whenPublished}
								</span>
								<span className="separator"> - </span>
								<span className="shortDescription">
									{version.shortDescription}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
			<h3>Upcoming Changes</h3>
			<div className="todos">
				<ul>
					{todos.map((todo: any, index: number) => {
						return (
							<li key={index} className="todo">{todo.title}</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default PageSiteVersions;
