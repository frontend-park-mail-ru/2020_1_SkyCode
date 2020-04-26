import Component from '../../Component.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './ProductCard.hbs';

export default class ProductCard extends Component {
    constructor({id, product, classes}) {
        super(classes, {
            imgSrc: `/images/${product.image}`,
            productName: product.name,
            productPrice: product.price,
            button: new NeonButton({
                classes: 'product-card-button',
                text: 'Добавить',
                id,
                callback: () => {
                    EventBus.publish('add-product', product);
                },
            }),
        });

        super.template = template;
    }
}
