import BaseController from './BaseController.js';
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantModel from '../models/RestaurantModel.js';
import UserModel from '../models/UserModel.js';
import Router from '../routing/Router.js';

class AddProductByRestaurantController extends BaseController {
	constructor(title = 'Add product') {
		super(title);
	}

	run() {
		UserModel.getUser().then(response => {
			if (response.User.role === 'Moderator' || response.User.role === 'Admin') {
				super.run(new AddProductByRestaurantView());
			} else {
				EventBus.publish('set-page', {url: '/'});
			}
		}).catch(err => console.log(err));

	}

	startCatchEvents() {
		EventBus.subscribe('add-product-by-restaurant', this.addProductCb.bind(this));
	}

	stopCatchEvents() {
		EventBus.unsubscribe('add-product-by-restaurant', this.addProductCb.bind(this));
	}

	addProductCb(data) {
		RestaurantModel.addProduct(Router.state.matchData[0], data).then(response => {
			if (response.message) {
				EventBus.publish('set-page', {url: `/restaurants/${Router.state.matchData[0]}`});
			}
		}).catch(err => console.log(err));
	}

}

export default new AddProductByRestaurantController();
