import Component from '../../Component.js';
import Restaurant from '../restaurant/Restaurant.js';
import template from './RestaurantList.hbs';


export default class RestaurantList extends Component {
    constructor({classes, restaurantArr}) {
        super(classes);
        super.template = template;

        const restaurantComponents = [];
        for (const restaurant of restaurantArr) {
            restaurantComponents.push(new Restaurant({
                classes: `restaurant-list__restaurant-${restaurant.id}`,
                name: restaurant.name,
                avgDeliveryTime: 30,
                rate: restaurant.rate,
                imageHref: `/images/${restaurant.image}`,
                href: `/restaurants/${restaurant.id}`,
            }));
        }

        this.addContextData({restaurantComponents});
    }
}
