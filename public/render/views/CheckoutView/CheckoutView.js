import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import OrderCheckout from '../../blocks/orderCheckout/OrderCheckout.js';
import template from './CheckoutView.hbs';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';


export default class CheckoutView extends BaseView {
    constructor({profile, personNum}) {
        super({
            Main: new MainArea({
                profile,
                personNum,
            }),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
        });
    }
}

class MainArea extends Component {
    constructor({profile, personNum}) {
        super();
        super.template = template;
        this.addContextData({
            Order: new Order({
                classes: 'checkout-view__order',
                withCheckoutButton: false,
                isVisible: true,
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
