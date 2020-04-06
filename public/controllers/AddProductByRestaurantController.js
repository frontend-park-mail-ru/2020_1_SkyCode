import BaseController from './BaseController.js';
// eslint-disable-next-line max-len
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantModel from '../models/RestaurantModel.js';
import UserModel from '../models/UserModel.js';

class AddProductByRestaurantController extends BaseController {
    constructor(title = 'Add product') {
        super(title);
    }

    execute(state) {
        this.restaurant = state.matchData[0];
        UserModel.getUser().then((response) => {
            if (response.User.role === 'Moderator'
                || response.User.role === 'Admin') {
                super.execute(new AddProductByRestaurantView());
            } else {
                EventBus.publish('set-page', {url: '/'});
            }
        })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe(
            'add-product-by-restaurant',
            this.addProductHandler.bind(this),
        );
    }

    stopCatchEvents() {
        EventBus.unsubscribe(
            'add-product-by-restaurant',
            this.addProductHandler.bind(this),
        );
    }

    addProductHandler(data) {
        RestaurantModel
            .addProduct(this.restaurant, data)
            .then((response) => {
                if (response.error) {
                    EventBus.publish(
                        'add-product-by-restaurant-error',
                        response.error,
                    );
                } else if (response.message) {
                    EventBus.publish('set-page', {
                        url: `/restaurants/${this.restaurant}`,
                    });
                }
            })
            .catch((err) => {
                EventBus.publish(
                    'add-product-by-restaurant-error',
                    err,
                );
            });
    }
}

export default new AddProductByRestaurantController();
