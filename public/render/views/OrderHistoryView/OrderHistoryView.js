import Component from '../../Component.js';
import template from './OrderHistoryView.hbs'
import OrderHistory from '../../blocks/orderHistory/orderHistory.js';
import Header from '../../blocks/header/Header';

export default class OrderHistoryView extends Component {
    constructor(orders) {
        super();
        super.template = template;
        super.addContextData({
            orders: new OrderHistory({orders}),
            header: new Header({
                classes: 'header',
            }),
        });
    }
}
