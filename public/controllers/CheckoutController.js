import BaseController from './BaseController.js';
import CheckoutView from '../render/views/CheckoutView/CheckoutView.js';
import UserModel from '../models/UserModel.js';
import BasketController from './BasketController.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantModel from '../models/RestaurantModel.js';

class CheckoutController extends BaseController {
    constructor(title = 'confirm') {
        super(title);
    }

    execute({personNum = 1}) {
        UserModel
            .getUser()
            .then((response) => {
                if (response.error === 'Unauthorized') {
                    EventBus.publish('redirect', {url: '/login'});
                } else {
                    super.execute(new CheckoutView({
                        profile: response.User,
                        basket: BasketController.basket,
                        personNum,
                    }));
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish('redirect', {url: '/'});
            });
    }

    startCatchEvents() {
        EventBus.subscribe('checkout', this.checkoutHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('checkout', this.checkoutHandler.bind(this));
    }

    checkoutHandler(data) {
        RestaurantModel
            .addOrder(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish('order-checkout-error', response.error);
                } else {
                    EventBus.publish('set-page', {url: '/'});
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish('order-checkout-error', err);
            });
    }
}

export default new CheckoutController();
