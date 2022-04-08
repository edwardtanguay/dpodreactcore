import * as qstr from '../../system/qtools/qstr';
import * as qsys from '../../system/qtools/qsys';

export const itemPageManager = (Component: any) => (props: any) => {
	
	const getUrlId = () => {
		return Number(qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id')));
	}

	return <Component {...props} getUrlId={getUrlId} />;
};
