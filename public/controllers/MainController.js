'use strict';

import BaseController from "./BaseController.js";
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
    }

    show(url, {actions, categories} = {}) {
        if (actions === undefined) {
            actions = Mocks.actions;
        }

        if (categories === undefined) {
            categories = Mocks.categories;
        }

        super.show(new MainView({actionArr: actions, categoryArr: categories}));
    }
}

export default new MainController();