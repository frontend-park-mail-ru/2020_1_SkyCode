import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AdminRestaurantListView.hbs';
import RestaurantsList from '../../blocks/restaurantsList/restaurantsList.js';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';

export default class AdminRestaurantsListView extends BaseView {
    constructor({restaurantsArray}) {
        super({
            Main: new MainArea({restaurantsArray}),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor({restaurantsArray}) {
        super();
        this.addContextData({
            RestaurantList: new RestaurantsList({
                classes: 'restaurants-list',
                restaurantsArr: restaurantsArray,
            }),
        });

        super.template = template;
    }
}
