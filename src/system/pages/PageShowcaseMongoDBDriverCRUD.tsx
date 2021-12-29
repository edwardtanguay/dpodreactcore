/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_showcaseMongoDBDriverCRUD.scss';
import PageManager from '../classes/pageManager';

function PageShowcaseMongoDBDriverCRUD() {
	const pageIdCode = 'showcaseMongoDBDriverCRUD';
	const [products, setProducts] = useState([]);
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		setProducts(data.products);
	}
	console.log(process.env.REACT_APP_MONGODB_URI);

	useEffect(() => {
		loadPageData();
	}, []);

	return (
		<div className="page page_showcaseMongoDBDriverCRUD">
			<h2 className="title">Showcase: MongoDB Driver CRUD</h2>
			<p className="description">An page that demonstrates how to access MongoDB via backend</p>
			<div className="dpod_p">
				<ul>
					{products.map((product: any, index: number) => {
						return (
							<li key={index}>{product.ProductName}</li>
						)
					})}
				</ul>
			</div>
			<div className="infoArea dpod_labeledArea dpod_topSpace">
				<fieldset>
					<legend className="fieldLabel">Infos</legend>
					<ul>
						<li><a href="https://www.npmjs.com/package/mongodb" target="_blank">mongodb npm package</a></li>
						<li><a href="https://github.com/mongodb/node-mongodb-native#readme" target="_blank">Github readme of MongoDB NodeJS Driver</a></li>
						<li><a href="https://docs.mongodb.com/drivers/node/current/" target="_blank">official documentation for MongoDB Driver for Node</a></li>
					</ul>
				</fieldset>
			</div>
		</div>
	)
}

export default PageShowcaseMongoDBDriverCRUD;