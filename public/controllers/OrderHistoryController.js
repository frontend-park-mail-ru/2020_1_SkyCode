import OrderHistoryView
    from '../render/views/OrderHistoryView/OrderHistoryView.js';
import OrderModel from '../models/OrderModel.js';
import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';
import UserModel from '../models/UserModel';

class OrderHistoryController extends BaseController {
    constructor(title = 'Orders') {
        super(title);
    }

    execute() {
        UserModel.getUser()
            .then((response) => {
                if (response.User) {
                    OrderModel.getOrders(1, 5)
                        .then((response) => {
                            if (response.orders) {
                                super.execute(new OrderHistoryView(response.orders));
                            }
                        })
                        .catch((err) => console.log(err));
                } else {
                    EventBus.publish(Event.redirect, {url: '/login'});
                }
            })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe(Event.deleteOrder, this.delOrderHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe(Event.deleteOrder, this.delOrderHandler.bind(this));
    }

    delOrderHandler(data) {
        OrderModel.deleteOrder(data.id)
            .then((response) => {
                if (response.message) {
                    EventBus.publish(Event.redirect, {url: '/orders'});
                }
            })
            .catch((err) => console.log(err));
    }
}

export default new OrderHistoryController();
