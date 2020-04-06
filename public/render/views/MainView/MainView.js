import Header from '../../blocks/header/Header.js';
import ActionBar from '../../blocks/actionBar/ActionBar.js';
import CategoryBar from '../../blocks/categoryBar/CategoryBar.js';
import Component from '../../Component.js';
import Order from '../../blocks/order/Order.js';
// eslint-disable-next-line max-len
import SelectTimeButton from '../../blocks/selectTimeButton/SelectTimeButton.js';
import RestaurantList from '../../blocks/restaurantList/RestaurantList.js';
import template from './MainView.hbs';

class MainView extends Component {
    constructor({actionArr, categoryArr, restaurantArr}) {
        super();
        super.template = template;

        this.addContextData({
            label: 'Restaurants',
            selectTimeButton: new SelectTimeButton({
                classes: 'main-view__select-time-button',
                imageHref: 'static/clock.svg',
                text: 'Delivery: now',
                callback: () => 0,
            }),
            header: new Header({
                classes: 'header',
            }),
            actionBar: new ActionBar({
                classes: 'action-bar',
                actionArr,
            }),
            categoryBar: new CategoryBar({
                classes: 'category-bar',
                categoryArr,
            }),
            order: new Order({
                classes: 'order',
            }),
            restaurantList: new RestaurantList({
                classes: 'main-view__restaurant-list',
                restaurantArr,
            }),
        }, true);

        debugger
    }
}

export default MainView;
