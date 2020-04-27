import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import template from './MapView.hbs';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';

export default class MapView extends Component {
    constructor({}) {
        super();

        super.template = template;

        this.addContextData({
            header: new IconedHeader(),
            order: new Order({
                classes: 'order',
                isVisible: true,
            }),
        }, true);
    }
}
