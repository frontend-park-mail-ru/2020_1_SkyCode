import BaseController from './BaseController.js';
// eslint-disable-next-line max-len
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import RestaurantModel from '../models/RestaurantModel.js';
import UserModel from '../models/UserModel.js';

class AddProductByRestaurantController extends BaseController {
    constructor(title = 'Add product') {
        super(title);
    }

    execute(matchData) {
        this.restaurant = matchData[0];
        UserModel.getUser().then((response) => {
            if (response.User.role === 'Moderator'
                || response.User.role === 'Admin') {
                super.execute(new AddProductByRestaurantView());
            } else {
                EventBus.publish(Event.setPage, {url: '/'});
            }
        })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe(
            Event.addProductByRestaurant,
            this.addProductHandler.bind(this),
        );
    }

    stopCatchEvents() {
        EventBus.unsubscribe(
            Event.addProductByRestaurant,
            this.addProductHandler.bind(this),
        );
    }

    addProductHandler(data) {
        RestaurantModel
            .addProduct(this.restaurant, data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish(
                        Event.addProductByRestaurantError,
                        response.error,
                    );
                } else if (response.message) {
                    EventBus.publish(Event.setPage, {
                        url: `/restaurants/${this.restaurant}`,
                    });
                }
            })
            .catch((err) => {
                EventBus.publish(
                    Event.addProductByRestaurantError,
                    err,
                );
            });
    }
}

export default new AddProductByRestaurantController();
