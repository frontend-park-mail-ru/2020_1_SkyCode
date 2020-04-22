import Component from '../../Component.js';
import template from './RestaurantInfo.hbs';
import ImageHref from '../imageHref/ImageHref';
import RestaurantPlaceCard from '../restaurantPlaceCard/RestaurantPlaceCard';

export default class RestaurantInfo extends Component {
    constructor({classes, restaurant}) {
        super(classes, {
            ProfileButton: new ImageHref({
                classes: 'corner-profile-href',
                imageClasses: 'corner-profile-image',
                src: '/static/profile.png',
                href: '/login',
            }),
            RestaurantPosCard: new RestaurantPlaceCard({
                classes: 'restaurant-info__place-card',
                restaurant,
            }),

            Description: 'Мы просто бомба (заменить)',
        });
        super.template = template;
    }
}
