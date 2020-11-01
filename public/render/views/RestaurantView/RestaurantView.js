import Component from '../../Component.js';
import temp from './RestaurantView.hbs';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner';
import ProductList from '../../blocks/productList/ProductList';
import Href from '../../elements/href/Href';
import Pagination from '../../blocks/Pagination/Pagination';


export default class RestaurantView extends Component {
    constructor({restaurant, products, page, total, count}) {
        super();
        super.template = temp;
        this.addContextData({
            Pagination: new Pagination({
                classes: '',
                first: 1,
                current: Number(page),
                last: Math.floor(Number(total) / Number(count))
                    + (Number(total) % Number(count) !== 0),
                hrefBase: `/restaurants/${restaurant.id}/products/`,
            }),
            Banner: new RestaurantBanner({
                classes: 'restaurant-banner',
                imgHref: `/images/${restaurant.image}`,
                rate: restaurant.rating,
                name: restaurant.name,
            }),
            // Categories: new RestaurantCategories({categoryArr}),
            Products: new ProductList({
                classes: 'restaurant-view__product-list',
                productArr: products}),
            InfoHref: new Href({
                classes: 'restaurant-view__info',
                text: 'Отзывы',
                href: `/restaurants/${restaurant.id}/info`,
            }),
        });
    }
}
