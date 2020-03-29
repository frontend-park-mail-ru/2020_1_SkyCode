import Component from '../../Component.js';
import Restaurant from '../restaurant/Restaurant.js';


export default class RestaurantList extends Component {
    constructor({classes, restaurantArr}) {
        super(classes);

        let restaurantComponents = [];

        for (let restaurant of restaurantArr) {
            restaurantComponents.push(new Restaurant({
                classes: 'restaurant-list__restaurant',
                name: restaurant.name,
                avgDeliveryTime: restaurant.avgDeliveryTime,
                rate: restaurant.rate,
                imageHref: restaurant.imageHref,
                href: restaurant.href,
            }));
        }

        this.addContextData({restaurantComponents});
    }
}