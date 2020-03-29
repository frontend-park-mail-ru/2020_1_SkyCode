'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';

class RestaurantController extends BaseController {
	constructor(title = 'Restaurant') {
		super(title);
	}

	show(url, state) {
		debugger;
		super.show(new RestaurantView());
	}
}

export default new RestaurantController();

