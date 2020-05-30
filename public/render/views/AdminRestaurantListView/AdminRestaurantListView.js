import Component from '../../Component.js';
import template from './AdminRestaurantListView.hbs';
import RestaurantItem from '../../blocks/restaurantItem/restaurantItem';
import Href from '../../elements/href/Href';

export default class AdminRestaurantsListView extends Component {
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
