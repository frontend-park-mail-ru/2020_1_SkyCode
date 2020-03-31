'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';
import Mocks from '../mocks.js';

class RestaurantController extends BaseController {
	constructor(title = 'Restaurant') {
		super(title);
	}

	show(url, {
		products = Mocks.products,
		restaurantInfo = Mocks.restaurant,
		categoryArr = Mocks.categories,
		productArr = Mocks.products
	}) {
		super.show(new RestaurantView({products, restaurantInfo, categoryArr, productArr}));
	}
}

export default new RestaurantController();
