import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import OrderCheckout from '../../blocks/orderCheckout/OrderCheckout.js';

export default class CheckoutView extends Component {
    constructor({profile, products, personNum}) {
        super();
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            Order: new Order({
                classes: 'order',
                withCheckoutButton: false,
                personNum,
                products,
            }),
            OrderCheckout: new OrderCheckout({
                classes: 'order-confirmation',
                phone: profile.phone,
                address: profile.address,
                email: profile.email,
                profile,
                personNum,
            }),
        });
    }
}