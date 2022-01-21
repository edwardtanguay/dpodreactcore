import * as qstr from './qstr';
import * as qsys from './qsys';
import * as qfil from './qfil';
// import { URLSearchParams } from "url"


/**
 * GET ABSOLUTE DIRECTORY OF SITE AS A BACKSLASH DIRECTORY:
 *
 * qys.getApplicationBaseDirectoryWithBackslashes();
 *
 * "C:\user001\webapps\myapp"
 *
 */
export const getApplicationBaseDirectoryWithBackslashes = () => {
	const actualDirectory = __dirname; // e.g. 'C:\edward\nwo\onespace\src\datapod\qtools'
	const baseDirectory = qstr.chopRight(
		actualDirectory,
		'\\src\\datapod\\qtools'
	);
	return baseDirectory;
};

/**
 * GET ABSOLUTE DIRECTORY OF SITE AS A FORWARDSLASH DIRECTORY:
 *
 * qys.getApplicationBaseDirectoryWithForwardslashes();
 *
 * "C:/user001/webapps/myapp"
 *
 */
export const getApplicationBaseDirectoryWithForwardslashes = () => {
	return qstr.replaceAll(
		qsys.getApplicationBaseDirectoryWithBackslashes(),
		'\\',
		'/'
	);
};

/**
 * GET ABSOLUTE PATH OF SITE AS A FORWARDSLASH PATH:
 *
 * qys.getApplicationBasePathWithForwardslashes();
 *
 * "C:/user001/webapps/myapp/"
 *
 */
export const getApplicationBasePathWithForwardslashes = () => {
	return `${qsys.getApplicationBaseDirectoryWithForwardslashes()}/`;
};

// from: C:\\edward\\nwo\\onespace\\src\\App.js
// to: src/App.js
export const convertAbsoluteWindowsPathAndFileNameToPathAndFileName = (
	absoluteWindowsPathAndFileName: string
) => {
	let r = absoluteWindowsPathAndFileName;
	r = qstr.replaceAll(r, '\\', '/');
	// r = qstr.chopLeft(r, 'C:/edward/nwo/onespace/');
	// r = qstr.chopLeft(r, 'C:/edward/filesForWeeklyBackup/LEARN2020/onespace/');
	r = qstr.chopLeft(r, qsys.getApplicationBasePathWithForwardslashes());
	return r;
};

// export const changeBrowserState = (doc: any, page: string, variable: string, value: string, title: string) => {
//     if (qstr.isEmpty(variable)) {
//         window.history.replaceState('', '', page);
//     } else {
//         window.history.replaceState('', '', `${page}?${variable}=${value}`);
//     }
//     doc.title = title;
// };

// export const getParameterValueFromUrl = (parameter: string): string => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const value: any = urlParams.get(parameter);
//     if (value === null) {
//         return '';
//     }
//     return String(value);
// }

export const getImagePathAndFileNameWithForceImport = (itemTypeIdCode: string, fileIdCode: string): string => {
	const potentialPathAndFileName = qsys.getPotentialImagePathAndFileName(itemTypeIdCode, fileIdCode);
	return potentialPathAndFileName;
}

export const getPotentialImagePathAndFileName = (itemTypeIdCode: string, fileIdCode: string): string => {
	let r = '';
	const extensions = ['jpg', 'png', 'gif'];
	const potentialPathAndFileNames: string[] = [];
	extensions.forEach(extension => potentialPathAndFileNames.push(`customImages\\${itemTypeIdCode}\\${fileIdCode}.${extension}`));
	potentialPathAndFileNames.forEach(potentialPathAndFileName => {
		const absolutePathAndFileName = `${qsys.getApplicationBaseDirectoryWithBackslashes()}\\public\\${potentialPathAndFileName}`;
		if (qfil.fileExists(absolutePathAndFileName)) {
			r = potentialPathAndFileName;
		}

	});
	return r;
}

export const getParameterValueFromUrl = (parameter: string): string => {
	const urlParams = new URLSearchParams(window.location.search);
	const value: any = urlParams.get(parameter);
	if (value === null) {
		return '';
	}
	return String(value);
}

export const changeBrowserState = (doc: any, page: string, variable: string, value: string, title: string) => {
	if (qstr.isEmpty(variable)) {
		window.history.replaceState('', '', page);
	} else {
		window.history.replaceState('', '', `${page}?${variable}=${value}`);
	}
	doc.title = title;
};
