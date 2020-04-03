'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';
import RestaurantModel from '../models/RestaurantModel.js';
import Mocks from '../mocks.js';
import BasketController from './BasketController.js';

class RestaurantController extends BaseController {
	constructor(title = 'Restaurant') {
		super(title);
	}
	run() {
		RestaurantModel.getRestaurant(1).then(response => {
			RestaurantModel.getProducts(1).then(products => {
				const categoryArr = Mocks.categories;
				let basket = BasketController.basket;
				super.run(new RestaurantView({restaurant: response, products: products, basket: basket,  categoryArr}));
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));

	}
}

export default new RestaurantController();
