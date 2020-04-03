import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js'
import RestaurantCategories from '../../blocks/restaurantCategories/RestaurantCategories.js';
import Products from '../../blocks/products/Products.js';

class RestaurantView extends Component {
	constructor({restaurant, products, categoryArr}) {
		super();

		console.log(restaurant);
		console.log(restaurant.products);

		this.addContextData({
			header: new Header({
				classes: 'header'
			}),
			order: new Order({
				classes: 'order',
				products: products,
			}),
			restaurantBanner: new RestaurantBanner({
				classes: 'restaurantBanner',
				imgHref: `/images/${restaurant.image}`,
				rate: restaurant.rating,
				name: restaurant.name
			}),
			categories: new RestaurantCategories({categoryArr: categoryArr}),
			products: new Products({classes: 'products', productArr: products})
		}, true);
	}
}

export default RestaurantView;