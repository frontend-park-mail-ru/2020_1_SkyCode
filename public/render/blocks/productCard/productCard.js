import Component from '../../Component.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class productCard extends Component {
	constructor({classes, product}) {
		super('product-card', {
			imgSrc: `/images/${product.image}`,
			productName: product.name,
			productPrice: product.price,
			button: new neonButton({
				text: 'Add',
				classes,
				callback: () => {
					EventBus.publish('add-product', product);
				}
			})
		});
	}
}
