import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js'
import RestaurantCategories from '../../blocks/restaurantCategories/RestaurantCategories.js';
import Products from '../../blocks/products/Products.js';

class RestaurantView extends Component {
	constructor({products, restaurantInfo, categoryArr, productArr}) {
		super();

		this.addContextData({
			header: new Header({
				classes: 'header'
			}),
			order: new Order({
				classes: 'order',
				products,
			}),
			restaurantBanner: new RestaurantBanner({
				classes: 'restaurantBanner',
				imgHref: restaurantInfo.imageHref,
				rate: restaurantInfo.rate,
				name: restaurantInfo.name
			}),
			categories: new RestaurantCategories({categoryArr: categoryArr}),
			products: new Products({classes: 'products', productArr})
		}, true);
	}
}

export default RestaurantView;