import OrderHistoryView
    from '../render/views/OrderHistoryView/OrderHistoryView.js';
import OrderModel from '../models/OrderModel.js';
import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';
import Router from '../routing/Router';

class OrderHistoryController extends BaseController {
    constructor(title = 'Orders') {
        super(title);
    }

    execute() {
        OrderModel
            .getUserOrders(1, 5)
            .then((response) => {
                if (response.error) throw 'order error: ' + response.error;
                response.orders = response.orders.reverse();
                super.execute(new OrderHistoryView(response.orders));
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
                    Router.reload('Заказ успешно отменён');
                }
            })
            .catch((err) => console.log(err));
    }
}

export default new OrderHistoryController();
