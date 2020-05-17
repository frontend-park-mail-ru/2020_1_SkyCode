import AddRestaurant from '../../blocks/addRestaurant/AddRestaurant.js';
import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AddRestaurantView.hbs';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';

export default class AddRestaurantView extends BaseView {
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

        this.addContextData({
            addRestaurant: new AddRestaurant({
                classes: 'add-restaurant',
            }),
        });
    }
}
