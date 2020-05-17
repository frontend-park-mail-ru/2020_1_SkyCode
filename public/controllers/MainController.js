'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';
import RestaurantModel from '../models/RestaurantModel.js';
import BasketController from './BasketController.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
        this.geopos;
    }

    execute() {
        RestaurantModel.getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo'))
            .then((response) => {
                const actions = Mocks.actions;
                const categories = Mocks.categories;
                super.execute(new MainView({
                    actionArr: actions,
                    categoryArr: categories,
                    restaurantArr: response.restaurants,
                    products: BasketController.basket.product,
                }));
            })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        EventBus.subscribe(Event.newLocation, this.GetRestaurantsByAddress.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe(Event.newLocation, this.GetRestaurantsByAddress.bind(this));
    }

    GetRestaurantsByAddress() {
        RestaurantModel.getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo'))
            .then((response) => {
                super.execute(new MainView({
                    actionArr: Mocks.actions,
                    categoryArr: Mocks.categories,
                    restaurantArr: response.restaurants,
                    products: BasketController.basket.product,
                }));
            })
            .catch((err) => console.log(err));
    }
}

export default new MainController();
