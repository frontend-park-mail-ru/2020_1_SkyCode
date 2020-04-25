import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import template from './AddRestaurantPointView.hbs';
import AddRestaurantPoint from '../../blocks/addRestaurantPoint/addRestaurantPoint.js';


export default class AddRestaurantPointView extends Component {
    constructor({restaurant}) {
        super();
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            AddPoint: new AddRestaurantPoint({
                classes: 'add-rest-point',
                name: restaurant.name,
                id: restaurant.id,
            }),
        });

        super.template = template;
    }
}
