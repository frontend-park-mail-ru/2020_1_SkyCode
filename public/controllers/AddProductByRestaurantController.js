import BaseController from './BaseController.js';
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';

class AddProductByRestaurantController extends BaseController {
    constructor(title = 'Add product') {
        super(title);
    }

    run() {
        super.run(new AddProductByRestaurantView());
    }
}

export default new AddProductByRestaurantController();
