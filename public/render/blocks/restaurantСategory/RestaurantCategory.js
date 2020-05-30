import Component from '../../Component.js';
import Href from '../../elements/href/Href.js';
import template from './RestaurantCategory.hbs';

export default class RestaurantCategory extends Component {
    constructor({classes, href, categoryName, id}) {
        super(classes, {
            link: new Href({
                classes: 'restaurant-category__link',
                href,
                id,
                text: categoryName}),
        });

        super.template = template;
    }
}
