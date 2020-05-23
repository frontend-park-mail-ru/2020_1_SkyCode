import temp from './MainView.hbs';
import SelectTimeButton from '../../blocks/selectTimeButton/SelectTimeButton';
import ActionBar from '../../blocks/actionBar/ActionBar';
import CategoryBar from '../../blocks/categoryBar/CategoryBar';
import RestaurantList from '../../blocks/restaurantList/RestaurantList';
import Component from '../../Component';
import RecommendBar from '../../blocks/RecommendBar/RecommendBar';

export default class MainView extends Component {
    constructor({actionArr, categoryArr, recommendArr, restaurantArr}) {
        super();
        this.template = temp;
        const message = sessionStorage.message;
        sessionStorage.message = '';

        this.addContextData({
            message,
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
        if (recommendArr.length > 0) {
            this.addContextData({
                RecommendBar: new RecommendBar({
                    recommendArr,
                }),
            });
        }
    }
}
