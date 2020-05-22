import Component from '../../Component.js';
import template from './OrderHistoryView.hbs';
import OrderHistory from '../../blocks/orderHistory/orderHistory.js';


export default class OrderHistoryView extends Component {
    constructor(orders) {
        const message = sessionStorage.message;
        sessionStorage.message = '';

        super();
        super.template = template;
        super.addContextData({
            message,
            orders: new OrderHistory({orders}),
        });
    }
}
