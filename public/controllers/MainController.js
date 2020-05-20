'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';
import RestaurantModel from '../models/RestaurantModel.js';
import BasketController from './BasketController.js';
import EventBus from '../services/Events/EventBus';
import Event from '../services/Events/Events';
import TagModel from '../models/TagModel';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
        this.geopos;
    }

    execute() {
        Promise.all([
            RestaurantModel
                .getRecommendationsByAddress(1, 20, localStorage.getItem('deliveryGeo')),
            RestaurantModel
                .getRestaurantsByAddress(1, 50, localStorage.getItem('deliveryGeo')),
            TagModel.all(),
        ])
            .then(([recomResponse, restResponse, tagsResponse]) => {
                if (recomResponse.error) throw recomResponse.error;
                if (restResponse.error) throw restResponse.error;
                if (tagsResponse.error) throw tagsResponse.error;

                Promise.all(restResponse.restaurants.map((rest) => RestaurantModel.tags(rest.id)))
                    .then((tagsArr) => {
                        tagsArr.map((resp) => {
                            if (resp.error) throw resp.error;
                        });
                        const tagsIds = tagsArr.map((restTagsArr) =>
                            restTagsArr.tags.map((tag) =>
                                tag.id));

                        for (let i = 0; i < tagsIds.length; i++) {
                            restResponse.restaurants[i].tagsIds = tagsIds[i];
                        }

                        const actions = Mocks.actions;
                        super.execute(new MainView({
                            actionArr: actions,
                            recommendArr: recomResponse.restaurants,
                            categoryArr: tagsResponse.rest_tags,
                            restaurantArr: restResponse.restaurants,
                            products: BasketController.basket.product,
                        }));
                    });
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
