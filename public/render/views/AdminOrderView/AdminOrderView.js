import Component from '../../Component.js';
import template from './AdminOrderView.hbs';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';
import OrderItem from '../../blocks/OrderItem/OrderItem';

export default class AdminOrderView extends BaseView {
    constructor({orderArr}) {
        super({
            Main: new MainArea({orderArr}),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
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
