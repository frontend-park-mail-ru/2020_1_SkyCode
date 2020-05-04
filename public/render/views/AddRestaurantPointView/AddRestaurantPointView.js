import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AddRestaurantPointView.hbs';
import AddRestaurantPoint from '../../blocks/addRestaurantPoint/addRestaurantPoint.js';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';


export default class AddRestaurantPointView extends BaseView {
    constructor({restaurant}) {
        super({
            Main: new MainArea({restaurant}),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor({restaurant}) {
        super();
        this.addContextData({
            AddPoint: new AddRestaurantPoint({
                classes: 'add-rest-point',
                name: restaurant.name,
                id: restaurant.id,
            }),
        });

        super.template = template;
    }
}
