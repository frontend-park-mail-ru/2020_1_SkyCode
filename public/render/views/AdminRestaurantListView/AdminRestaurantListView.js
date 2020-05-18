import Component from '../../Component.js';
import template from './AdminRestaurantListView.hbs';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';
import RestaurantItem from '../../blocks/restaurantItem/restaurantItem';
import Href from '../../elements/href/Href';

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
        super.template = template;
        const message = sessionStorage.message;
        sessionStorage.message = '';

        const restsComponents = [];
        for (const rest of restaurantsArray) {
            restsComponents.push(new RestaurantItem({
                classes: 'restaurant-item',
                id: rest.id,
                name: rest.name,
            }));
        }

        this.addContextData({
            message,
            RestaurantsList: restsComponents,
            AddRest: new Href({
                id: 'rest-list__add-rest',
                text: 'Добавить ресторан',
                href: '/admin/restaurants/add',
                classes: 'add-restaurant__href',
            }),
        });
    }
}
