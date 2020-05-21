import BaseController from './BaseController';
import AdminOrderView from '../render/views/AdminOrderView/AdminOrderView';
import OrderModel from '../models/OrderModel';

class AdminOrderController extends BaseController {
    constructor(title = 'admin order') {
        super(title);
    }

    execute(matchData) {
        OrderModel.getRestOrders(matchData[0])
            .then((response) => {
                if (response.error) throw 'order error: ' + response.error;
                if (!response.orders) response.orders = [];
                super.execute(new AdminOrderView({orderArr: response.orders}));
            })
            .catch((err) => console.log(err));
    }
}

export default new AdminOrderController();
