import Component from '../../Component.js';
import template from './restaurantsList.hbs';
import EventBus from '../../../services/Events/EventBus.js';
import RestaurantItem from '../restaurantItem/restaurantItem';

export default class RestaurantsList extends Component {
    constructor({classes, restaurantsArr}) {
        super(classes);

        super.template = template;

        const restsComponents = [];
        console.log(restaurantsArr);
        for (const rest of restaurantsArr) {
            console.log(rest);
            restsComponents.push(new RestaurantItem({
                classes: `chat-item-${rest.id}`,
                id: rest.id,
                name: rest.name,
                callback: () => {
                    EventBus.publish('set-page', {url: `/admin/restaurants/${rest.id}`});
                },
            }));
        }

        console.log(restsComponents);

        this.addContextData({RestaurantsList: restsComponents});
    }
}
