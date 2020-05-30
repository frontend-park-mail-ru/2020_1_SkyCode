import Component from '../../Component.js';
import template from './AddRestaurantPointView.hbs';
import AddRestaurantPoint from '../../blocks/addRestaurantPoint/addRestaurantPoint.js';

export default class AddRestaurantPointView extends Component {
    constructor({restaurant}) {
        super();
        this.addContextData({
            AddPoint: new AddRestaurantPoint({
                classes: 'add-rest-point',
                name: restaurant.name,
                id: restaurant.id,
            }),
        });

        super.template = template;
    }
}
