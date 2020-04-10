import AddRestaurant from '../../blocks/addRestaurant/AddRestaurant.js';
import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AddRestaurantView.hbs';

export default class AddRestaurantView extends Component {
    constructor() {
        super();
        super.template = template;

        this.addContextData({
            header: new Header({
                classes: 'header',
            }),
            addRestaurant: new AddRestaurant({
                classes: 'add-restaurant',
            }),
        });
    }
}
