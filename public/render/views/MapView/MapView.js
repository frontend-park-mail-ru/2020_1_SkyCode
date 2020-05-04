import Component from '../../Component.js';
import Order from '../../blocks/order/Order.js';
import template from './MapView.hbs';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';


export default class MapView extends BaseView {
    constructor() {
        super({
            Main: new MainArea(),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor() {
        super();
        super.template = template;
    }
}
