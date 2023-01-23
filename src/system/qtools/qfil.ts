import * as qstr from './qstr';
import * as qsys from './qsys';
import * as qfil from './qfil';
// import mkdirp from 'mkdirp';
const mkdirp = require('mkdirp');
const fs = require('fs'); // In create-react-app they have stubbed out 'fs'. You cannot import it. They did this because fs is a node core module.
// const mainFileExists = require('file-exists');

// TODO: write tests for all

export const forceCreateDirectory = (relativeDirectoryName: string) => {
	mkdirp.sync(relativeDirectoryName);
};

export const copyFileForceDirectories = (sourcePathAndFileName: string, targetPathAndFileName: string) => {
	const directory = (qfil.getDirectoryAndFileNameFromRelativePathAndFileName(targetPathAndFileName))[0];
	qfil.forceCreateDirectory(directory);
	qfil.copyFile(sourcePathAndFileName, targetPathAndFileName);
};

export const copyFile = (sourcePathAndFileName: string, targetPathAndFileName: string) => {
	fs.createReadStream(sourcePathAndFileName).pipe(fs.createWriteStream(targetPathAndFileName));
};

// e.g. "../n49901_dpnversion/systemPages/createPage.ejs" returns :
// [0] = "../n49901_dpnversion/systemPages"
// [1] = "createPage.ejs"
export const getDirectoryAndFileNameFromRelativePathAndFileName = (relativePathAndFileName: string) => {
	if (qstr.contains(relativePathAndFileName, '/')) {
		const parts: string[] = qstr.breakIntoParts(relativePathAndFileName, '/');
		const fileName: any = parts.pop();
		const directory: string = parts.join('/');
		return [directory, fileName];
	}
	return ['', relativePathAndFileName];
};

export const getSitePathAndFileNames = (absoluteDirectory: string = '', pathAndFileNamesOriginal: string[] = []) => {
	absoluteDirectory = absoluteDirectory || qsys.getApplicationBaseDirectoryWithBackslashes();
	const pathAndFileNames: string[] = pathAndFileNamesOriginal || [];

	const files = fs.readdirSync(absoluteDirectory);
	for (const file of files) {
		let absolutePathAndFileName = `${absoluteDirectory}\\${file}`;
		if (!qstr.endsWith(absolutePathAndFileName, '\\node_modules') && !qstr.contains(absolutePathAndFileName, '\\.git') && !qstr.contains(absolutePathAndFileName, '\\.vscode')) {
			absolutePathAndFileName = qstr.replaceAll(absolutePathAndFileName, '\\\\', '\\');
			if (fs.statSync(absolutePathAndFileName).isDirectory()) {
				qfil.getSitePathAndFileNames(absolutePathAndFileName, pathAndFileNames);
			} else {
				const fixedPathAndFileName = qsys.convertAbsoluteWindowsPathAndFileNameToPathAndFileName(absolutePathAndFileName);
				pathAndFileNames.push(fixedPathAndFileName);
			}
		}
	}
	return pathAndFileNames;
}

/**
 * CREATES A FILE WITH A STRING SEPARATED BY NEWLINES:
 *
 * const content = '111\n222\n3333';
 * createFileWithStringBlock('notes.txt', content);
 */
export const createFileWithStringBlock = (pathAndFileName: string, content: string) => {
	fs.writeFileSync(pathAndFileName, content);
}

export const fileExists = (absolutePathAndFileName: string) => {
	return fs.existsSync(absolutePathAndFileName);
}

export const createFileWithLines = (pathAndFileName: string, lines: string[]) => {
	const content = qstr.convertLinesToStringBlock(lines);
	return qfil.createFileWithStringBlock(pathAndFileName, content);
}

// TODO: figure out how to read files in create-react-app site, see note above about fs module
// export const getContentOfDataFile = (pathAndFileName: string) => {
//     const absoluteDirectory = qsys.getApplicationBaseDirectoryWithBackslashes();
//     const fullPathAndFileName = absoluteDirectory + pathAndFileName;
//     return fs.readFileSync(fullPathAndFileName, 'utf8');

export const deleteFile = function (pathAndFileName: string) {
	if (qfil.fileExists(pathAndFileName)) {
		fs.unlinkSync(pathAndFileName);
	}
}

// PageShowcaseRegexExamples.tsx --> PageShowcaseRegexExamples
export const getBaseFileName = (fileName: string): string => {
	const parts = qstr.breakIntoParts(fileName, '.');
	parts.pop();
	return parts.join('.');
}

export const getFileNamesInDirectory = (directory: string) => {
    const fileNames: string[] = [];
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach((fileName: string) =>  {
            var relativePathAndFileName = directory + "/" + fileName;
            if (!fs.lstatSync(relativePathAndFileName).isDirectory()) {
                fileNames.push(fileName);
            }
        });
    }
    return fileNames;
}

/**
 * creates a file, with optional date stamp
 *
 * writeFile('output/report.txt', reportText, {withDateStamp: true});
 *
 * creates file: report-2023-01-20.txt
 */
export const writeTheFile = (pathAndFileName:string, content: string, config = {withDateStamp: false}) => {

	let newPathAndFileName = pathAndFileName;

	if (config.withDateStamp) {
		const dateStamp = new Intl.DateTimeFormat('fr-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(Date.now());

		// we assume that the file has only one period before the extention
		const parts = pathAndFileName.split('.');
		newPathAndFileName = `${parts[0]}-${dateStamp}.${parts[1]}`;
	}

	fs.writeFileSync(newPathAndFileName, content);
};