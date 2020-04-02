'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';
import Mocks from '../mocks.js';

class RestaurantController extends BaseController {
	constructor(title = 'Restaurant') {
		super(title);
	}

	run({
		products = Mocks.products,
		restaurantInfo = Mocks.restaurant,
		categoryArr = Mocks.categories,
		productArr = Mocks.products
	}) {
		super.run(new RestaurantView({products, restaurantInfo, categoryArr, productArr}));
	}
}

export default new RestaurantController();
