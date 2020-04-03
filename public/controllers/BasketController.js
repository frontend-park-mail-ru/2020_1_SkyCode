import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus';

class BasketController extends BaseController {
	constructor() {
		super();
		this.basket = {};
	}

	run() {
		super.run();
	}

	startCatchEvents() {
		EventBus.subscribe('add-product', this.addProductCb.bind(this));
	}

	stopCatchEvents() {
		EventBus.unsubscribe('add-product', this.addProductCb.bind(this));
	}

	addProductCb(data) {
		console.log(data);
	}
}

export default new BasketController();