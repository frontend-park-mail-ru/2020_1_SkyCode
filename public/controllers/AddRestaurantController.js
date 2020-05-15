import BaseController from './BaseController.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events.js';
import RestaurantModel from '../models/RestaurantModel';
import AddRestaurantView
    from '../render/views/AddRestaurantView/AddRestaurantView';


class AddRestaurantController extends BaseController {
    constructor(title = 'Add restaurant') {
        super(title);
    }

    execute() {
        UserModel.getUser()
            .then((response) => {
                if (response.error) {
                    EventBus.publish(Event.setPage, {url: '/login'});
                }
                if (response.User.role === 'Moderator'
                        || response.User.role === 'Admin') {
                    super.execute(new AddRestaurantView());
                } else {
                    EventBus.publish(Event.setPage, {url: '/'});
                }
            },
            )
            .catch((error) => {
                console.log(error);
            });
    }

    startCatchEvents() {
        EventBus.subscribe(
            Event.addRestaurant,
            this.addRestaurantHandler.bind(this),
        );
    }

    stopCatchEvents() {
        EventBus.subscribe(
            Event.addRestaurant,
            this.addRestaurantHandler.bind(this),
        );
    }

    addRestaurantHandler(data) {
        RestaurantModel
            .addRestaurant(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish(
                        Event.addRestaurantError,
                        response.error,
                    );
                } else if (response.message) {
                    EventBus.publish(Event.setPage, {
                        // Лучше переводить на страницу ресторана
                        url: '/',
                    });
                }
            })
            .catch((err) => {
                EventBus.publish(
                    Event.addRestaurantError,
                    err,
                );
            });
    }
}

export default new AddRestaurantController();
