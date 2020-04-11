import OrderHistoryView
    from '../render/views/OrderHistoryView/OrderHistoryView.js';
import OrderModel from '../models/OrderModel.js';
import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus';

class OrderHistoryController extends BaseController {
    constructor(title = 'Orders') {
        super(title);
    }

    execute() {
        OrderModel.getOrders(1, 5)
            .then((response) => {
                if (response.orders) {
                    super.execute(new OrderHistoryView(response.orders));
                }
            })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe('delete-order', this.delOrderHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('delete-order', this.delOrderHandler.bind(this));
    }

    delOrderHandler(data) {
        OrderModel.deleteOrder(data.id)
            .then((response) => {
                if (response.message) {
                    EventBus.publish('redirect', {url: '/orders'});
                }
            })
            .catch((err) => console.log(err));
    }
}

export default new OrderHistoryController();
