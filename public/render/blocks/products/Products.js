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
                id: `product-card-${product.id}`,
                product,
            }));
        }

        this.addContextData({products}, true);
        super.template = template;
    }
}
