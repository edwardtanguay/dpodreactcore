import * as qstr from './qtools/qstr';

export const getBackendPort = () => {
	return 4449;
}

export const getSiteMode = () => {
	return 'live';
	// return 'development';
	// const siteMode = process.env.REACT_APP_SITEMODE ? process.env.REACT_APP_SITEMODE : 'production';
	// return siteMode;
}

export const getApplicationPath = () => {
	let dirName = __dirname;
	dirName = dirName.replace('/qtools', '');
	return qstr.chopRight(dirName, 'system');
};
