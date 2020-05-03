import Component from '../../Component.js';
import BaseView from '../BaseView/BaseView';
import temp from './RestaurantView.hbs';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner';
import RestaurantCategories
    from '../../blocks/restaurantCategories/RestaurantCategories';
import ProductList from '../../blocks/products/ProductList';
import Href from '../../elements/href/Href';

export default class RestaurantView extends BaseView {
    constructor({restaurant, products, categoryArr}) {
        super({
            Main: new MainArea({
                restaurant,
                products,
                categoryArr,
            }),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
        });
    }
}

class MainArea extends Component {
    constructor({restaurant, products, categoryArr}) {
        super();
        super.template = temp;
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
