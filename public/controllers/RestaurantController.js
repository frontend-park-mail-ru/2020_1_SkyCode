'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';
import RestaurantModel from '../models/RestaurantModel.js';
import Mocks from '../mocks.js';
import BasketController from './BasketController.js';
import EventBus from '../services/Events/EventBus';
import Events from '../services/Events/Events';

class RestaurantController extends BaseController {
    constructor(title = 'Restaurant') {
        super(title);
        this.restaurantId = 0;
    }

    execute(matchData) {
        this.restaurantId = matchData[0];
        const count = 20;
        const page = (matchData.length > 1) ? matchData[1] : 1;

        Promise.all([
            RestaurantModel.getRestaurant(this.restaurantId),
            RestaurantModel.getProducts(this.restaurantId, page, count),
        ])
            .then(([restaurant, productResp]) => {
                this.restaurantName = restaurant.name;
                const basket = BasketController.basket.product;
                super.execute(new RestaurantView({
                    products: productResp.products,
                    restaurant,
                    basket,
                    page,
                    count,
                    total: productResp.total,
                }));
            })
            .catch((err) => {
                console.log(err);
                EventBus.broadcast(Events.setPage, {url: '/'});
            });
    }
}

export default new RestaurantController();
