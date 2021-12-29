import React from 'react';
import '../styles/page_showcaseReactIcons.scss';
import iconDataLines from '../data/json/page_reactIcons.json';
import * as qstr from '../qtools/qstr';
import * as GrIcons from 'react-icons/gr';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';

function PageShowcaseReactIcons() {

	const getIcon = (familyIdCode: string, iconName: string) => {
		switch (familyIdCode) {
			case 'gr':
				return React.createElement((GrIcons as any)[iconName]);
			case 'im':
				return React.createElement((ImIcons as any)[iconName]);
			case 'ri':
				return React.createElement((RiIcons as any)[iconName]);
			case 'fi':
				return React.createElement((FiIcons as any)[iconName]);
			case 'bs':
				return React.createElement((BsIcons as any)[iconName]);
			case 'md':
				return React.createElement((MdIcons as any)[iconName]);
			case 'fa':
				return React.createElement((FaIcons as any)[iconName]);
			case 'bi':
				return React.createElement((BiIcons as any)[iconName]);
			default:
				return null;
		}
	}

	const iconExamples: any[] = [];
	iconDataLines.forEach((iconDataLine: string) => {
		const [familyIdCode, iconName, title, keywords] = qstr.breakIntoParts(iconDataLine, ';');
		const importLine = `import { ${iconName} } from 'react-icons/${familyIdCode}';`;
		const usageLine = `<${iconName}/>`;
		iconExamples.push({
			familyIdCode,
			iconName,
			title,
			icon: getIcon(familyIdCode, iconName),
			keywords,
			importLine,
			usageLine,
			iconCode: `${importLine}\r\n${usageLine}`
		})
	})

	return (
		<div className="page page_showcaseReactIcons">
			<h2 className="title">Showcase: React-Icons</h2>
			<p className="description">Information and examples for using React-Icons</p>
			<h3>Information</h3>
			<ul>
				<li>React-Icons have already been installed in Datapod with <code>npm i react-icons</code></li>
				<li><a target="_blank" href="https://react-icons.github.io/react-icons/search?q=lightning" rel="noreferrer">search for react-icons here</a> </li>
				<li><a target="_blank" href="https://onespace.netlify.app/howtos?id=373" rel="noreferrer">small React-Icon howto</a></li>
			</ul>
			<h3>Useful Icons</h3>
			{iconExamples.map((iconExample: any, index: number) => {
				return (
					<div className="example">
						<div className="icon">
							{iconExample.icon}
						</div>
						<div className="info">
							<p className="iconTitle">{iconExample.title}</p>
							<textarea className="iconCode">
								{iconExample.iconCode}
							</textarea>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default PageShowcaseReactIcons;