import * as qstr from './qtools/qstr';

export const getBackendPort = () => {
	return 4446;
}

export const getSiteMode = () => {
	const siteMode = process.env.REACT_APP_SITEMODE ? process.env.REACT_APP_SITEMODE : 'production';
	return siteMode;
} 

export const getApplicationPath = () => {
	let dirName = __dirname;
	dirName = dirName.replace('/qtools', '');
	return qstr.chopRight(dirName, 'system');
};
