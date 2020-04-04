import Component from '../../Component.js';
import Restaurant from '../restaurant/Restaurant.js';


export default class RestaurantList extends Component {
    constructor({classes, restaurantArr}) {
        super(classes);

        let restaurantComponents = [];

        for (const restaurant of restaurantArr) {
            restaurantComponents.push(new Restaurant({
                classes: 'restaurant-list__restaurant',
                name: restaurant.name,
                avgDeliveryTime: 30, //restaurant.avgDeliveryTime,
                rate: restaurant.rating,
                imageHref: `/images/${restaurant.image}`,
                href: restaurant.href,
            }));
        }

        this.addContextData({restaurantComponents});
    }
}