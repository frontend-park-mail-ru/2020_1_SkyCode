import Component from '../../Component.js';
import template from './orderHistory.hbs'
import OrderCard from '../orderCard/orderCard';

export default class OrderHistory extends Component {
    constructor({orders}) {
        super();

        super.template = template;

        const ordersObj = [];

        console.log(orders);

        for (const orderItem of orders) {
            ordersObj.push(new OrderCard('order', orderItem));
        }

        console.log(ordersObj);

        super.addContextData({
            orders: ordersObj,
        });
    }
}
