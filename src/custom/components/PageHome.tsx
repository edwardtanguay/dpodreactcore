import '../styles/pageHome.scss';
import * as config from '../../system/config';

function PageHome() {

	return (
		<div className="page page_home">
			<p>Welcome to this site.</p>	
			<p>{config.getSiteMode()}</p>
		</div>
	)
}

export default PageHome;