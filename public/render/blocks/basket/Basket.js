import Component from '../../Component.js';
import BasketProduct from '../basketProduct/BasketProduct.js';
import template from './Basket.hbs';


export default class Basket extends Component {
    constructor({classes, basket}) {
        super(classes);
        super.template = template;

        const basketProducts = [];

        for (const id in basket) {
            basketProducts.push(new BasketProduct({
                classes: 'basket__basket-product',
                name: basket[id].name,
                imageHref: `/images/${basket[id].image}`,
                quantity: basket[id].amount,
                cost: basket[id].price,
                id: `prod-in-basket-${basket[id].id}`,
                mainId: id,
            }));
        }

        super.addContextData({basketProducts});
    }
}
