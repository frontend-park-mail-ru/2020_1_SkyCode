import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AdminRestaurantListView.hbs';
import RestaurantsList from '../../blocks/restaurantsList/restaurantsList.js';

export default class AdminRestaurantsListView extends Component {
    constructor({restaurantsArray}) {
        super();
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            RestaurantList: new RestaurantsList({
                classes: 'restaurants-list',
                restaurantsArr: restaurantsArray,
            }),
        });

        super.template = template;
    }
}
