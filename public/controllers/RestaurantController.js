'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';
import RestaurantModel from '../models/RestaurantModel.js';
import Mocks from '../mocks.js';

class RestaurantController extends BaseController {
	constructor(title = 'Restaurant') {
		super(title);
	}

	run() {
		RestaurantModel.getRestaurant(1).then(response => {
			const categoryArr = Mocks.categories;
			super.run(new RestaurantView({restaurant: response, categoryArr}));
		}).catch(err => console.log(err));

	}
}

export default new RestaurantController();
