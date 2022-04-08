// import * as qstr from '../../system/qtools/qstr';
// import * as qsys from '../../system/qtools/qsys';

export const itemPageManager = (Component: any) => (props: any) => {
	
	// const getUrlId = () => {
	// 	return Number(qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id')));
	// };

	// const getUrlSearchText = () => {
	// 	return qsys.getParameterValueFromUrl('searchText');
	// };

	// const getUrlIdCode = () => {
	// 	return qsys.getParameterValueFromUrl('idCode');
	// };

	// return <Component {...props} getUrlId={getUrlId} getUrlSearchText={getUrlSearchText} getUrlIdCode={getUrlIdCode} />;
	return <Component {...props}/> 
};
