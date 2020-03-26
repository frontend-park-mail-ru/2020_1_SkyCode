'use strict';

import BasePage from "./BasePage";

class MainPage extends BasePage {
    constructor({title = 'main page'}) {
        super({title});
    }

    show(url, {actions, categories} = {}) {
        if (actions === undefined) {
            actions = Models.getActions(); // Моделей пока нет
        }

        if (categories === undefined) {
            categories = Models.getActions(); // Моделей пока нет
        }

        super.show(new MainView({actions: actions, categories: categories}));
    }
}

export default new MainPage();