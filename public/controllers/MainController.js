'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
    }

    run({
        actions = Mocks.actions,
        categories = Mocks.categories,
        products = Mocks.products,
        restaurants = Mocks.restaurants,
        profile = Mocks.noProfile,
    } = {}) {
        super.run(new MainView({
            actionArr: actions,
            categoryArr: categories,
            restaurantArr: restaurants,
            products,
        }));
    }
}

export default new MainController();
