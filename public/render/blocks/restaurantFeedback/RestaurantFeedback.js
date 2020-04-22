import Component from '../../Component.js';
import RestaurantBanner from '../restaurantBanner/restaurantBanner.js';
import Href from '../../elements/href/Href.js';
import FeedbackForm from '../feedbackForm/FeedbackForm.js';
import template from './RestaurantFeedback.hbs';
import RestaurantFeedbackCard
    from '../restaurantFeedbackCard/RestaurantFeedbackCard.js';

export default class RestaurantFeedback extends Component {
    constructor({classes, restaurant, feedback, restaurantId}) {
        super(classes, {
            RestaurantBanner: new RestaurantBanner({
                classes: 'restaurantBanner',
                imgHref: `/images/${restaurant.image}`,
                rate: restaurant.rating,
                name: restaurant.name,
            }),
            BackHref: new Href({
                classes: 'restaurant-feedback__back-href',
                text: 'Назад',
                href: `/restaurants/${restaurant.id}`,
            }),
            FeedbackForm: new FeedbackForm({
                classes: 'restaurant-feedback__feedback-form',
                rate: 5,
                text: '',
                restaurantId,
            }),
        });

        const Feedback = [];
        for (const feed of feedback) {
            Feedback.push(new RestaurantFeedbackCard({
                classes: 'restaurant-feedback__card',
                name: feed.name,
                rate: feed.rate,
                text: feed.text,
                date: feed.date,
            }));
        }

        super.addContextData({Feedback});
        super.template = template;
    }
}
