// eslint-disable-next-line max-len
import RestaurantCategories from '../../blocks/restaurantCategories/RestaurantCategories.js';
// eslint-disable-next-line max-len
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js';
import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import Products from '../../blocks/products/Products.js';

class RestaurantView extends Component {
    constructor({restaurant, products, basket, categoryArr}) {
        super();

        this.addContextData({
            header: new Header({
                classes: 'header',
            }),
            order: new Order({
                classes: 'order',
                basket,
            }),
            restaurantBanner: new RestaurantBanner({
                classes: 'restaurantBanner',
                imgHref: `/images/${restaurant.image}`,
                rate: restaurant.rating,
                name: restaurant.name,
            }),
            categories: new RestaurantCategories({categoryArr}),
            products: new Products({classes: 'products',
                productArr: products}),
        }, true);
    }
}

export default RestaurantView;
