import Component from '../../Component.js';
import template from './RestaurantInfoView.hbs';
import RestaurantInfoMainArea
    from '../../blocks/restaurantInfoMainArea/RestaurantInfoMainArea';

export default class RestaurantInfoView extends Component {
    constructor({
        classes = 'restaurant-info-view',
        feedbackObject,
        restaurant,
        user,
    }) {
        super(classes, {
            BaseView: new RestaurantInfoMainArea({
                classes: 'restaurant-feedback',
                restaurantId: restaurant.id,
                currentReview: feedbackObject.current,
                allReview: feedbackObject.reviews,
                restaurant,
                user,
            }),
        });

        this.template = template;
    }
}

