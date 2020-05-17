import Component from '../../Component.js';
import template from './restaurantsList.hbs';
import RestaurantItem from '../restaurantItem/restaurantItem.js';
import Href from '../../elements/href/Href';

export default class RestaurantsList extends Component {
    constructor({classes, restaurantsArr}) {
        super(classes);

        super.template = template;

        const restsComponents = [];
        for (const rest of restaurantsArr) {
            restsComponents.push(new RestaurantItem({
                classes: `chat-item-${rest.id}`,
                id: rest.id,
                name: rest.name,
            }));
        }

        this.addContextData({
            RestaurantsList: restsComponents,
            AddRest: new Href({
                text: 'Добавить ресторан',
                href: '/admin/restaurants/add',
                classes: 'add-restaurant__href',
            }),
        });
    }
}
