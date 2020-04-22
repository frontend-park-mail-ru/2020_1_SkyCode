import Component from '../../Component.js';
import template from './RestaurantPlaceCard.hbs';


export default class RestaurantPlaceCard extends Component {
    constructor({classes, restaurant}) {
        super(classes, {
            City: 'Город ресторана',
            Address: 'Адрес ресторана',
        });

        super.template = template;
    }
}
