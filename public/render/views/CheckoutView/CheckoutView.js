import Component from '../../Component.js';
import OrderCheckout from '../../blocks/orderCheckout/OrderCheckout.js';
import template from './CheckoutView.hbs';

export default class CheckoutView extends Component {
    constructor({profile, personNum}) {
        super();
        super.template = template;
        this.addContextData({
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
