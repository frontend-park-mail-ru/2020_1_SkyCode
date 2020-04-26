import Component from '../../Component.js';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader.js';
import template from './BaseView.hbs';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue.js';
import Order from '../../blocks/order/Order.js';

export default class BaseView extends Component {
    constructor({RightBar = new Order({}), MainArea}) {
        const Header = new IconedHeader();
        const LeftBar = new WavingMenue({});

        super('', {
            Header,
            LeftBar,
            RightBar,
            MainArea,
        });
        super.template = template;
    }
}
