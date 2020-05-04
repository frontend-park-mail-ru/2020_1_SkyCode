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
        console.log('qwer');
        Promise.all([
            UserModel
                .getUser()
                .then((response) => response.User),

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
            .then(([user, restaurant, feedbackObject]) => {
                super.execute(new RestaurantInfoView({
                    user,
                    restaurant,
                    feedbackObject,
                }));
            })
            .catch((err) => {
                console.log('info controller error', err);
                EventBus.publish('redirect', {url: '/'});
            });
    }
}

export default new RestaurantInfoController();
