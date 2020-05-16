import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import RestaurantModel from '../models/RestaurantModel.js';
import AdminRestaurantsListView
    from '../render/views/AdminRestaurantListView/AdminRestaurantListView.js';

class AdminRestaurantListController extends BaseController {
    constructor(title = 'restaurant list') {
        super(title);
    }

    execute() {
        RestaurantModel.getRestaurants(1, 50)
            .then((response) => {
                if (response.error) {
                    throw response.error;
                }
                super.execute(new AdminRestaurantsListView({
                    restaurantsArray: response.restaurants,
                }));
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish(Event.setPage, {url: '/'});
            });
    }
}

export default new AdminRestaurantListController();
