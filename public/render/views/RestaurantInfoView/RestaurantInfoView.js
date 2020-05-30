import template from './RestaurantInfoView.hbs';
import Component from '../../Component.js';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js';
import Href from '../../elements/href/Href.js';
import FeedbackForm from '../../blocks/feedbackForm/FeedbackForm.js';
import RestaurantFeedbackCard
    from '../../blocks/restaurantFeedbackCard/RestaurantFeedbackCard.js';
import NeonButton from '../../elements/neonButton/NeonButton';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import UserController from '../../../controllers/UserController';

export default class RestaurantInfoView extends Component {
    constructor({
        classes,
        restaurant,
        allReviews,
        currentReview,
        restaurantId,
    }) {
        const message = sessionStorage.message || '';
        sessionStorage.message = '';

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
            userLogined: UserController.logined,
            message,
        });

        if (!UserController.logined) {
            this.addContextData({
                Login: new NeonButton({
                    classes: 'restaurant-feedback__login-signup',
                    text: 'Войдите',
                    id: 'restaurant-feedback__login',
                    callback: () => {
                        EventBus.broadcast(Events.loginRequest);
                    },
                }),
                Signup: new NeonButton({
                    classes: 'restaurant-feedback__login-signup',
                    text: 'Зарегистрируйтесь',
                    id: 'restaurant-feedback__signup',
                    callback: () => {
                        EventBus.broadcast(Events.signupRequest);
                    },
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

        if (allReviews === null) allReviews = [];
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

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.successLogin, () => {
                EventBus.broadcast(Events.setPage, {url: window.location.pathname});
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.successSignup, () => {
                EventBus.broadcast(Events.setPage, {url: window.location.pathname});
            }),
        );
        super.bind();
    }
}
