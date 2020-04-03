import BaseController from './BaseController.js';
import CheckoutView from '../render/views/CheckoutView/CheckoutView.js';
import Mocks from '../mocks.js';
import UserModel from '../models/UserModel.js';
import BasketController from './BasketController.js';
import EventBus from '../services/Events/EventBus.js';

class CheckoutController extends BaseController {
    constructor(title = 'confirm') {
        super(title);
    };

    run({profile = Mocks.profile, personNum = 1}) {
        UserModel.getUser().then(response => {
            super.run(new CheckoutView({
                profile: response.User,
                basket: BasketController.basket,
                personNum,
            }));
        }).catch(err => console.log(err));

    }

    startCatchEvents() {
        EventBus.subscribe('checkout', this.checkoutCb.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('checkout', this.checkoutCb.bind(this));
    }

    checkoutCb(data) {
        console.log(data);
    }
}

export default new CheckoutController();
