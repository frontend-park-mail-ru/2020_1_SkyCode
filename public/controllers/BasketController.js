import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';

class BasketController extends BaseController {
	constructor() {
		super();
		this.basket = {};
	}

	startCatchEvents() {
		EventBus.subscribe('add-product', this.addProductCb.bind(this));
	}

	stopCatchEvents() {
		EventBus.unsubscribe('add-product', this.addProductCb.bind(this));
	}

	addProductCb(data) {
		if (data in this.basket) {
			this.basket[data]++;
		} else {
			this.basket[data] = 1;
		}

		console.log(this.basket);
	}
}

export default new BasketController();