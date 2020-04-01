import AddProductByRestaurant from '../../blocks/AddProductByRestaurant/AddProductByRestaurant.js';
import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';

export default class AddProductByRestaurantView extends Component {
	constructor() {
		super();

		this.addContextData({
			header: new Header({
				classes: 'header',
			}),
			addProducts: new AddProductByRestaurant({}),
		});
	}

}