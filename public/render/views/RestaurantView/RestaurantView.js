import RestaurantCategories from '../../blocks/restaurantCategories/RestaurantCategories.js';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js';
import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import ProductList from '../../blocks/products/ProductList.js';
import template from './RestaurantView.hbs';
import Href from '../../elements/href/Href';
import Button from '../../elements/button/Button';
import EventBus from '../../../services/Events/EventBus';

class RestaurantView extends Component {
    constructor({restaurant, products, categoryArr}) {
        super();

        super.template = template;

        this.addContextData({
            header: new Header({
                classes: 'header',
            }),
            Order: new Order({
                classes: 'order',
            }),
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
            OrderButton: new Button({
                classes: 'main-view__order-button',
                text: 'K',
                callback: () => {
                    EventBus.publish('show-order');
                },
            }),
        }, true);
    }
}

export default RestaurantView;
