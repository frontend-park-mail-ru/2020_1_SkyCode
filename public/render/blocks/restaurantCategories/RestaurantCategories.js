import Component from '../../Component.js';
import RestaurantCategory from '../restaurantСategory/RestaurantCategory.js';
import RestaurantController from '../../../controllers/RestaurantController.js';
import template from './RestaurantCategories.hbs';


export default class RestaurantCategories extends Component {
    constructor({categoryArr, classes = 'restaurant-categories'}) {
        super();
        this.addClasses(classes);

        const categories = [];
        for (const categoryData of categoryArr) {
            categories.push(new RestaurantCategory({
                categoryName: categoryData.text,
                classes: 'restaurant-category-bar__category',
                href: `/restaurants/${RestaurantController.restaurantId}`,
                id: categoryData.id,
            }));
        }

        super.template = template;

        this.addContextData({categories}, true);
    }
}
