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
        Promise.all([
            RestaurantModel.getRestaurant(this.restaurantId),
            RestaurantModel.getProducts(this.restaurantId, 1, 10),
        ])
            .then(([restaurant, products]) => {
                this.restaurantName = restaurant.name;
                const categoryArr = Mocks.categories;
                const basket = BasketController.basket.product;
                super.execute(new RestaurantView({
                    products: products.products,
                    restaurant,
                    basket,
                    categoryArr}));
            })
            .catch((err) => {
                console.log(err);
                EventBus.broadcast(Events.setPage, {url: '/'});
            });
    }
}

export default new RestaurantController();
