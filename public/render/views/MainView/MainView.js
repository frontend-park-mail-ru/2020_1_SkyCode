import BaseView from '../BaseView/BaseView.js';
import temp from './MainView.hbs';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import SelectTimeButton from '../../blocks/selectTimeButton/SelectTimeButton';
import ActionBar from '../../blocks/actionBar/ActionBar';
import CategoryBar from '../../blocks/categoryBar/CategoryBar';
import RestaurantList from '../../blocks/restaurantList/RestaurantList';
import Component from '../../Component';


export default class MainView extends BaseView {
    constructor({actionArr, categoryArr, restaurantArr}) {
        super({
            Main: new MainArea({
                actionArr,
                categoryArr,
                restaurantArr,
            }),
            Header: new IconedHeader(),
            LeftBar: new WavingMenue(),
        });
    }
}

class MainArea extends Component {
    constructor({actionArr, categoryArr, restaurantArr}) {
        super();
        this.template = temp;
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
            restaurantList: new RestaurantList({
                classes: 'main-view__restaurant-list',
                restaurantArr,
            }),
        });
    }
}
