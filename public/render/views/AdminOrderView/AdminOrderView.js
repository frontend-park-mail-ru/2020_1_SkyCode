import Component from '../../Component.js';
import template from './AdminOrderView.hbs';
import OrderItem from '../../blocks/OrderItem/OrderItem';

export default class AdminOrderView extends Component {
    constructor({orderArr = []}) {
        super();
        super.template = template;
        const message = sessionStorage.message;
        sessionStorage.message = '';

        const orderComponents = [];
        for (const order of orderArr) {
            orderComponents.push(new OrderItem({
                order,
            }));
        }

        this.addContextData({
            message,
            OrderList: orderComponents,
        });
    }
}
