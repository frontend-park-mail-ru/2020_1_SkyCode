import Component from '../../Component.js';
import restaurantCategory from '../restaurantСategory/RestaurantCategory.js';


export default class RestaurantCategories extends Component{
	constructor({categoryArr, classes = 'restaurant-categories'}) {
		super();
		this.addClasses(classes);

		let categories = [];
		for (let categoryData of categoryArr) {
			categories.push(new restaurantCategory({
				categoryName: categoryData.text,
				classes: 'restaurant-category-bar__category'
			}));
		}

		this.addContextData({categories}, true);
	}
}