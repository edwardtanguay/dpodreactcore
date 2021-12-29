export const getBackendPort = () => {
	return 6731;
}

export const getSiteMode = () => {
	const siteMode = process.env.REACT_APP_SITEMODE ? process.env.REACT_APP_SITEMODE : 'production';
	return siteMode;
} 
