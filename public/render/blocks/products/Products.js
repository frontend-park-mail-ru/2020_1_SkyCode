import Component from '../../Component.js';
import ProductCard from '../productCard/ProductCard.js';
import template from './Products.hbs';

export default class Products extends Component {
    constructor({classes, productArr}) {
        super();
        this.addClasses(classes);

        const products = [];
        for (const product of productArr) {
            products.push(new ProductCard({
                classes: `product-card-${product.id}`,
                product,
                id: product.id,
                imgSrc: `/images/${product.image}`,
                productDescription: product.price,
                productName: product.name}));
        }

        this.addContextData({products}, true);
        super.template = template;
    }
}
