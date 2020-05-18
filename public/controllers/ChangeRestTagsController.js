import BaseController from './BaseController';
import RestaurantModel from '../models/RestaurantModel';
import EventBus from '../services/Events/EventBus';
import Events from '../services/Events/Events';
import ChangeRestTagsView
    from '../render/views/ChangeRestTagsView/ChangeRestTagsView';

class ChangeRestTagsController extends BaseController {
    execute([restId]) {
        RestaurantModel
            .getRestaurant(restId)
            .then((restaurant) => {
                if (restaurant.error) {
                    throw restaurant.error;
                }

                super.execute(new ChangeRestTagsView({restaurant}));
            })
            .catch((err) => {
                console.log(err);
                EventBus.publish(Events.setPage, {url: '/'});
            });
    }
}

export default new ChangeRestTagsController();
