import Component from '../../Component.js';
import RestaurantBanner from '../restaurantBanner/restaurantBanner.js';
import Href from '../../elements/href/Href.js';
import FeedbackForm from '../feedbackForm/FeedbackForm.js';
import template from './RestaurantFeedback.hbs';
import RestaurantFeedbackCard
    from '../restaurantFeedbackCard/RestaurantFeedbackCard.js';

export default class RestaurantFeedback extends Component {
    constructor({
        classes,
        restaurant,
        allReview: allReviews,
        currentReview,
        restaurantId,
        user,
    }) {
        super(classes, {
            RestaurantBanner: new RestaurantBanner({
                classes: 'restaurant-banner',
                imgHref: `/images/${restaurant.image}`,
                rate: restaurant.rating,
                name: restaurant.name,
            }),
            BackHref: new Href({
                classes: 'restaurant-feedback__back-href',
                text: 'Назад',
                href: `/restaurants/${restaurant.id}`,
            }),
            user,
        });

        if (user === undefined) {
            this.addContextData({
                LoginHref: new Href({
                    classes: 'restaurant-feedback__login-signup-href',
                    text: 'Войдите',
                    href: '/login',
                    id: 'restaurant-feedback__login',
                }),
                SignupHref: new Href({
                    classes: 'restaurant-feedback__login-signup-href',
                    text: 'Зарегестрируйтесь',
                    href: '/signup',
                    id: 'restaurant-feedback__signup',
                }),
            });
        } else {
            this.addContextData({
                FeedbackForm: new FeedbackForm({
                    classes: 'restaurant-feedback__feedback-form',
                    rate: (currentReview && currentReview.rate) || 5,
                    text: currentReview && currentReview.text,
                    restaurantId,
                    oldReview: currentReview,
                }),
            });
        }

        const Feedback = [];
        for (const review of allReviews) {
            Feedback.push(new RestaurantFeedbackCard({
                classes: 'restaurant-feedback__card',
                name: review.author.firstName + ' ' + review.author.lastName,
                rate: review.rate,
                text: review.text,
                date: review.date,
            }));
        }

        super.addContextData({Feedback});
        super.template = template;
    }
}
