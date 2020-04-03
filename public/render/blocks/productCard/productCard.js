import Component from '../../Component.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class productCard extends Component {
	constructor({classes, id, imgSrc, productName, productDescription}) {
		super('product-card', {
			imgSrc, productName, productDescription,
			button: new neonButton({
				text: 'Add',
				classes,
				callback: () => {
					EventBus.publish('add-product', id);
				}
			})
		})
	}
}
