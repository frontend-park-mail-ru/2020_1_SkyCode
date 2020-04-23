'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';
import RestaurantModel from '../models/RestaurantModel.js';
import BasketController from './BasketController.js';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
    }

    execute() {
        RestaurantModel.getRestaurants(1, 10).then((response) => {
            const actions = Mocks.actions;
            const categories = Mocks.categories;
            super.execute(new MainView({
                actionArr: actions,
                categoryArr: categories,
                restaurantArr: response.restaurants,
                products: BasketController.basket.product,
            }));
        })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default new MainController();
