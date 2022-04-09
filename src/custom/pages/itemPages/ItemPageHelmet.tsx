import { Helmet } from 'react-helmet';

interface IProps {
	pageTitle: string;
	pageDescription: string;
}
export const ItemPageHelmet = (props: IProps) => {

	const {pageTitle, pageDescription} = props;

	return (
		<Helmet>
			<title>{pageTitle}</title>
			<meta
				name="description"
				content={pageDescription}
			/>
		</Helmet>
	);
};
