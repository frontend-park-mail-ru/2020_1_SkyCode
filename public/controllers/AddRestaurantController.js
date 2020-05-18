import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events.js';
import RestaurantModel from '../models/RestaurantModel';
import AddRestaurantView
    from '../render/views/AddRestaurantView/AddRestaurantView';
import UserController from './UserController';


class AddRestaurantController extends BaseController {
    constructor(title = 'Add restaurant') {
        super(title);
    }

    execute() {
        super.execute(new AddRestaurantView());
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
                    sessionStorage.message = 'Ресторан успешно создан';
                    EventBus.publish(Event.setPage, {
                    // Лучше переводить на страницу ресторана
                        url: '/admin/restaurants',
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
