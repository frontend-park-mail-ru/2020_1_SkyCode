import Component from '../../Component.js';
import BasketProduct from '../basketProduct/BasketProduct.js';


export default class Basket extends Component {
    constructor({classes, basket}) {
        super(classes);

        let basketProducts = [];

        console.log('qwe');
        console.log(basket);

        for (const id in basket) {
            console.log(basket[id]);
            basketProducts.push(new BasketProduct({
                classes: 'basket__basket-product',
                name: basket[id].name,
                imageHref: `/images/${basket[id].image}`,
                quantity: basket[id].amount,
                cost: basket[id].price,
            }));
        }

        super.addContextData({basketProducts});
    }
}
