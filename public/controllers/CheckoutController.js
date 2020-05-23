import BaseController from './BaseController.js';
import CheckoutView from '../render/views/CheckoutView/CheckoutView.js';
import UserModel from '../models/UserModel.js';
import BasketController from './BasketController.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import RestaurantModel from '../models/RestaurantModel.js';
import Swal from 'sweetalert2';
import UserController from './UserController';

class CheckoutController extends BaseController {
    constructor(title = 'confirm') {
        super(title);
    }

    execute() {
        super.execute(new CheckoutView({
            profile: UserController.User,
            basket: BasketController.basket.product,
            personNum: BasketController.persons,
        }));
    }

    startCatchEvents() {
        this.addUnbind(
            EventBus.subscribe(
                Event.checkout,
                this.checkoutHandler.bind(this),
            ),
        );
    }

    checkoutHandler(data) {
        RestaurantModel
            .addOrder(data)
            .then((response) => {
                if (response.error) {
                    EventBus.broadcast(Event.orderCheckoutError, response.error);
                } else {
                    sessionStorage.message = 'Ваш заказ успешно оформлен';

                    EventBus.broadcast(Event.checkoutSuccess, {});
                    EventBus.broadcast(Event.setPage, {url: '/orders'});
                }
            })
            .catch((err) => {
                console.log(err);
                EventBus.broadcast(Event.orderCheckoutError, err);
            });
    }
}

export default new CheckoutController();
