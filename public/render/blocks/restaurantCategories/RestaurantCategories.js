import Component from '../../Component.js';
import RestaurantCategory from '../restaurantСategory/RestaurantCategory.js';


export default class RestaurantCategories extends Component {
    constructor({categoryArr, classes = 'restaurant-categories'}) {
        super();
        this.addClasses(classes);

        const categories = [];
        for (const categoryData of categoryArr) {
            categories.push(new RestaurantCategory({
                categoryName: categoryData.text,
                classes: 'restaurant-category-bar__category',
                href: '',
            }));
        }

        this.addContextData({categories}, true);
    }
}
