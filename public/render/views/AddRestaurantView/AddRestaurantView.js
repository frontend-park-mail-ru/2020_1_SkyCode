import AddRestaurant from '../../blocks/addRestaurant/AddRestaurant.js';
import Component from '../../Component.js';
import template from './AddRestaurantView.hbs';

export default class AddRestaurantView extends Component {
    constructor() {
        super();
        super.template = template;

        this.addContextData({
            addRestaurant: new AddRestaurant({
                classes: 'add-restaurant',
            }),
        });
    }
}
