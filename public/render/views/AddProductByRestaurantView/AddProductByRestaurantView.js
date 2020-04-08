// eslint-disable-next-line max-len
import AddProductByRestaurant from '../../blocks/AddProductByRestaurant/AddProductByRestaurant.js';
import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AddProductByRestaurantView.hbs';

export default class AddProductByRestaurantView extends Component {
    constructor() {
        super();

        super.template = template;

        this.addContextData({
            header: new Header({
                classes: 'header',
            }),
            addProducts: new AddProductByRestaurant({}),
        });
    }
}
