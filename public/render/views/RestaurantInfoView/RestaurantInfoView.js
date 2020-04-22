import Component from '../../Component.js';
import template from './RestaurantInfoView.hbs';
import Header from '../../blocks/header/Header.js';
import RestaurantInfo from '../../blocks/restaurantInfo/RestaurantInfo.js';
import RestaurantFeedback
    from '../../blocks/restaurantFeedback/RestaurantFeedback.js';

export default class RestaurantInfoView extends Component {
    constructor({
        classes = 'restaurant-info-view',
        feedback,
        restaurant,
    }) {
        super(classes, {
            Header: new Header({
                classes: 'header',
            }),
            Sidebar: new RestaurantInfo({
                classes: 'restaurant-info',
                restaurant,
            }),
            Main: new RestaurantFeedback({
                classes: 'restaurant-feedback',
                restaurantId: restaurant.id,
                restaurant,
                feedback,
            }),
        });

        this.template = template;
    }
}
