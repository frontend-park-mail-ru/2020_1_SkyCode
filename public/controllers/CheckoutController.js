import BaseController from './BaseController.js';
import CheckoutView from '../render/views/CheckoutView/CheckoutView.js';
import Mocks from '../mocks.js'

class CheckoutController extends BaseController {
    constructor(title = 'confirm') {
        super(title);
    };

    show({profile = Mocks.profile, products = Mocks.products, personNum = 1}) {
        super.show(new CheckoutView({
            profile,
            products,
            personNum,
        }));
    }
}

export default new CheckoutController();
