import Component from '../../Component.js';
import productCard from '../productCard/productCard.js';

export default class Products extends Component {
	constructor({classes, productArr}) {
		console.log(productArr);
		super();
		this.addClasses(classes);

		let products = [];
		for (let product of productArr) {
			products.push(new productCard({classes: `product-card-${product.quantity}`,
				imgSrc: `/images/${product.image}`,
				productDescription: product.price,
				productName: product.name}));
		}

		this.addContextData({products}, true);
	}
}
