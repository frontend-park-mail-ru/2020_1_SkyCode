import BaseController from './BaseController.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/Events/EventBus';
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
                    console.log(response.error);
                }

                if (response.User.role === 'Moderator'
                || response.User.role === 'Admin') {
                    super.execute(new AddRestaurantView());
                } else {
                    EventBus.publish('set-page', {url: '/'});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    startCatchEvents() {
        EventBus.subscribe(
            'add-restaurant',
            this.addRestaurantHandler.bind(this),
        );
    }

    stopCatchEvents() {
        EventBus.subscribe(
            'add-restaurant',
            this.addRestaurantHandler.bind(this),
        );
    }

    addRestaurantHandler(data) {
        RestaurantModel
            .addRestaurant(data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish(
                        'add-restaurant-error',
                        response.error,
                    );
                } else if (response.message) {
                    EventBus.publish('set-page', {
                        // Лучше переводить на страницу ресторана
                        url: '/',
                    });
                }
            })
            .catch((err) => {
                EventBus.publish(
                    'add-restaurant-error',
                    err,
                );
            });
    }
}

export default new AddRestaurantController();
