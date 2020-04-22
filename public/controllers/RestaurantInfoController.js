import BaseController from './BaseController.js';
import UserModel from '../models/UserModel';
import EventBus from '../services/Events/EventBus';
import RestaurantModel from '../models/RestaurantModel.js';
import RestaurantInfoView
    from '../render/views/RestaurantInfoView/RestaurantInfoView.js';

class RestaurantInfoController extends BaseController {
    constructor(title = 'restaurant-info') {
        super(title);
    }

    execute(matchData) {
        const id = matchData[0];
        Promise.all([
            UserModel
                .getUser()
                .then((response) => {
                    if (response.error === 'Unauthorized') {
                        EventBus.publish('redirect', {url: '/login'});
                        throw 'unauthorized';
                    }
                    if (response.error) {
                        console.log(response.error);
                        EventBus.publish('redirect', {url: '/'});
                        throw response.error;
                    }
                    return true;
                }),

            RestaurantModel
                .getRestaurant(id)
                .then((restaurant) => {
                    if (restaurant.error) {
                        console.log('rest-info-cont-get-rest:' + restaurant.error);
                    }
                    return restaurant;
                })
                .catch((err) => {
                    throw err;
                }),

            RestaurantModel
                .getRestaurantReviews(id, 1, 10)
                .then((feedback) => {
                    if (feedback.error) {
                        console.log('rest-info-cont-get-rev:' + feedback.error);
                    }
                    return feedback;
                })
                .catch((err) => {
                    throw err;
                }),
        ])
            .then(([ , restaurant, {reviews: feedback}]) => {
                super.execute(new RestaurantInfoView({
                    restaurant,
                    feedback,
                }));
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish('redirect', {url: '/'});
            });
    }
}

export default new RestaurantInfoController();
