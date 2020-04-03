import Component from '../../Component.js';
import BasketProduct from '../basketProduct/BasketProduct.js';


export default class Basket extends Component {
    constructor({classes, products}) {
        super(classes);

        let basketProducts = [];

        for (const product of products) {
            basketProducts.push(new BasketProduct({
                classes: 'basket__basket-product',
                name: product.name,
                imageHref: `/images/${product.image}`,
                quantity: 1,
                cost: product.price,
            }));
        }

        super.addContextData({basketProducts});
    }
}
