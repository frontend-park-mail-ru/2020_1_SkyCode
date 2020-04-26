import RestaurantCategories from '../../blocks/restaurantCategories/RestaurantCategories.js';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js';
import Component from '../../Component.js';
import ProductList from '../../blocks/products/ProductList.js';
import template from './RestaurantViewMainArea.hbs';
import Href from '../../elements/href/Href';


export default class RestaurantViewMainArea extends Component {
    constructor({restaurant, products, categoryArr}) {
        super();
        super.template = template;
        this.addContextData({
            Banner: new RestaurantBanner({
                classes: 'restaurant-banner',
                imgHref: `/images/${restaurant.image}`,
                rate: restaurant.rating,
                name: restaurant.name,
            }),
            Categories: new RestaurantCategories({categoryArr}),
            Products: new ProductList({
                classes: 'restaurant-view__product-list',
                productArr: products}),
            InfoHref: new Href({
                classes: 'restaurant-view__info',
                text: 'О нас / отзывы',
                href: `/restaurants/${restaurant.id}/info`,
            }),
        });
    }
}
