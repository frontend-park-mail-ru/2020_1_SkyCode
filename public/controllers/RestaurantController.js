'use strict';

import BaseController from './BaseController.js';
import RestaurantView from '../render/views/RestaurantView/RestaurantView.js';
import RestaurantModel from '../models/RestaurantModel.js';
import Mocks from '../mocks.js';
import BasketController from './BasketController.js';

class RestaurantController extends BaseController {
    constructor(title = 'Restaurant') {
        super(title);
        this.restaurantId = 0;
    }

    execute(matchData) {
        this.restaurantId = matchData[0];
        RestaurantModel.getRestaurant(this.restaurantId).then((response) => {
            RestaurantModel.getProducts(this.restaurantId, 1, 10).then((products) => {
                const categoryArr = Mocks.categories;
                const basket = BasketController.basket.product;
                super.execute(new RestaurantView({
                    restaurant: response,
                    products: products.products,
                    basket,
                    categoryArr}));
            })
                .catch((err) => console.log(err));
        })
            .catch((err) => console.log(err));
    }
}

export default new RestaurantController();
