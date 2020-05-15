import Component from '../../Component.js';
import ProductCard from '../productCard/ProductCard.js';
import template from './ProductList.hbs';

export default class ProductList extends Component {
    constructor({classes, productArr}) {
        super();
        this.addClasses(classes);

        const Products = [];
        for (const product of productArr) {
            Products.push(new ProductCard({
                id: `product-card-${product.id}`,
                classes: 'product-list__product-card',
                product,
            }));
        }

        this.addContextData({Products});
        super.template = template;
    }
}
