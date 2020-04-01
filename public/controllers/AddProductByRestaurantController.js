import BaseController from './BaseController.js';
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';

class AddProductByRestaurantController extends BaseController {
	constructor(title = 'Add product') {
		super(title);
	}

	show() {
		super.show(new AddProductByRestaurantView());
	}
}

export default new AddProductByRestaurantController();
