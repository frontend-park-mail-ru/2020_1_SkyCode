import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantController from './RestaurantController.js';

class BasketController extends BaseController {
	constructor() {
		super();
		this.basket = {};
		this.total = 0;
		this.persons = 1;
	}

	startCatchEvents() {
		EventBus.subscribe('add-product', this.addProductCb.bind(this));
	}

	stopCatchEvents() {
		EventBus.unsubscribe('add-product', this.addProductCb.bind(this));
	}

	productNumber() {
		return Object.keys(this.basket).length;
	}

	isEmpty() {
		return 0 === this.productNumber();
	}

	addProductCb(data) {
		if (data.id in this.basket) {
			this.basket[data.id].amount++;
		} else {
			this.basket[data.id] = data;
			this.basket[data.id].amount = 1;
		}

		EventBus.publish('set-page', {url: `/restaurants/${RestaurantController.restaurantId}`});
		console.log(this.basket);
	}
}

export default new BasketController();