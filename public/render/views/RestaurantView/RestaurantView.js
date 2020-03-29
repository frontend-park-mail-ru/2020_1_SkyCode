import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import Order from '../../blocks/order/Order.js';

class RestaurantView extends Component {
	constructor() {
		super();

		this.addContextData({
			header: new Header({
				classes: 'header'
			})
			// order: new Order({
			// 	classes: 'order'
			// })
		}, true);
	}
}

export default RestaurantView;