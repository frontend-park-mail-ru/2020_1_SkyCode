import BaseController from './BaseController.js';
import CheckoutView from '../render/views/CheckoutView/CheckoutView.js';

class CheckoutController extends BaseController {
    constructor(title = 'confirm') {
        super(title);
    };

    show(url, {profile, products, personNum}) {

        super.show(new CheckoutView({
            profile,
            products,
            personNum,
        }));
    }
}
