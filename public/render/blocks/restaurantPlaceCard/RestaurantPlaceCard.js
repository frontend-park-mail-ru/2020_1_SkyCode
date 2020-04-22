import Component from '../../Component.js';
import template from './RestaurantPlaceCard.hbs';


export default class RestaurantPlaceCard extends Component {
    constructor({classes, restaurant}) {
        super(classes, {
            City: 'Москва (заменить)',
            Address: 'Ул. Ленина 1к1 (заменить)',
        });

        super.template = template;
    }
}
