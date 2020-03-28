'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
    }

    show(url, {
        actions = Mocks.actions,
        categories = Mocks.categories,
        products = Mocks.products
    } = {}) {
        super.show(new MainView({
            actionArr: actions,
            categoryArr: categories,
            products
        }));
    }
}

export default new MainController();