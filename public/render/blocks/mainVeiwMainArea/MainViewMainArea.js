import ActionBar from '../../blocks/actionBar/ActionBar.js';
import CategoryBar from '../../blocks/categoryBar/CategoryBar.js';
import Component from '../../Component.js';
import Order from '../../blocks/order/Order.js';
import SelectTimeButton from '../../blocks/selectTimeButton/SelectTimeButton.js';
import RestaurantList from '../../blocks/restaurantList/RestaurantList.js';
import template from './MainViewMainArea.hbs';
import Button from '../../elements/button/Button';
import EventBus from '../../../services/Events/EventBus';

export default class MainViewMainArea extends Component {
    constructor({actionArr, categoryArr, restaurantArr}) {
        super();
        super.template = template;
        this.addContextData({
            label: 'Рестораны',
            selectTimeButton: new SelectTimeButton({
                classes: 'main-view__select-time-button',
                imageHref: 'static/clock.svg',
                text: 'Доставка: сейчас',
                callback: () => 0,
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
    }
}