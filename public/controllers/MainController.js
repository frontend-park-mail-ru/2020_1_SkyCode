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

    run() {
        RestaurantModel.getRestaurants().then(response => {
            const actions = Mocks.actions;
            const categories = Mocks.categories;
            super.run(new MainView({
                actionArr: actions,
                categoryArr: categories,
                restaurantArr: response.Restaurants,
                products: BasketController.basket,
            }));
        }).catch(err => {
            console.log(err);
            super.run(new MainView({
                actionArr: Mocks.actions,
                categoryArr: Mocks.categories,
                restaurantArr: Mocks.restaurants,
                products: BasketController.basket,
            }));
        });

    }
}

export default new MainController();
