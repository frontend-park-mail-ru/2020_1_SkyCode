import Component from '../../Component.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class ProductCard extends Component {
    constructor({classes, product}) {
        super('product-card', {
            imgSrc: `/images/${product.image}`,
            productName: product.name,
            productPrice: product.price,
            button: new NeonButton({
                text: 'Add',
                classes,
                callback: () => {
                    EventBus.publish('add-product', product);
                },
            }),
        });
    }
}
