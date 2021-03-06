import BaseController from './BaseController.js';
import AddProductView from '../render/views/AddProductView/AddProductView.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import RestaurantModel from '../models/RestaurantModel.js';
import Router from '../routing/Router';

class AddProductController extends BaseController {
    constructor(title = 'Add product') {
        super(title);
    }

    execute(matchData) {
        this.restaurantId = matchData[0];
        RestaurantModel.getRestaurant(matchData[0]).then((restaurant) => {
            super.execute(new AddProductView({restName: restaurant.name}));
        })
            .catch((error) => {
                sessionStorage.message = 'Ошибка: ' + error;
                Router.reload();
            });
    }

    startCatchEvents() {
        this.addUnbind(EventBus.subscribe(
            Event.addProductByRestaurant,
            this.addProductHandler.bind(this),
        ));
    }

    addProductHandler(data) {
        RestaurantModel
            .addProduct(this.restaurantId, data)
            .then((response) => {
                if (response.error) {
                    EventBus.broadcast(
                        Event.addProductByRestaurantError,
                        response.error,
                    );
                } else if (response.message) {
                    EventBus.broadcast(Event.setPage, {
                        url: `/restaurants/${this.restaurantId}`,
                        message: 'Продукт успешно добавлен',
                    });
                }
            })
            .catch((err) => {
                sessionStorage.message = 'Ошибка: ' + err;
                Router.reload();
            });
    }
}

export default new AddProductController();
