import BaseController from './BaseController';
import RestaurantModel from '../models/RestaurantModel';
import EventBus from '../services/Events/EventBus';
import Events from '../services/Events/Events';

class AddRestaurantTagController extends BaseController {
    execute([restId]) {
        RestaurantModel
            .getRestaurant(restId)
            .then((restaurant) => {
                if (restaurant.error) {
                    throw restaurant.error;
                }

                super.execute(restaurant);
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish(Events.setPage, {url: '/'});
            });

        super.execute(view);
    }
}
