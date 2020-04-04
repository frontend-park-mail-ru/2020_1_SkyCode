import BaseController from './BaseController.js';
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantModel from '../models/RestaurantModel.js';

class AddProductByRestaurantController extends BaseController {
	constructor(title = 'Add product') {
		super(title);
	}

	run() {
		super.run(new AddProductByRestaurantView());
	}

	startCatchEvents() {
		EventBus.subscribe('add-product-by-restaurant', this.addProductCb.bind(this));
		EventBus.subscribe('add-product-img-restaurant', this.addProductImgCb.bind(this));
	}

	stopCatchEvents() {
		EventBus.unsubscribe('add-product-by-restaurant', this.addProductCb.bind(this));
		EventBus.unsubscribe('add-product-img-restaurant', this.addProductImgCb.bind(this));
	}

	addProductCb(data) {
		RestaurantModel.addProduct(1, data).then(response => {
			if (response.message) {
				EventBus.publish('set-page', {url: '/'});
			}
		}).catch(err => console.log(err));
	}

	addProductImgCb(data) {
		RestaurantModel.addProductImage(1, data).then(response => {
			if (response.message) {
				EventBus.publish('set-page', {url: '/add'});
			}
		}).catch(err => console.log(err));
	}
}

export default new AddProductByRestaurantController();
