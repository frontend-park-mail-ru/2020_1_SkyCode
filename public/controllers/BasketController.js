import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';

class BasketController extends BaseController {
    constructor() {
        super();
        this.basket = {};
    }

    startCatchEvents() {
        EventBus.subscribe('add-product', this.addProductCb.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('add-product', this.addProductCb.bind(this));
    }

    addProductCb(data) {
        if (data.id in this.basket) {
            this.basket[data.id].amount++;
        } else {
            this.basket[data.id] = data;
            this.basket[data.id].amount = 1;
        }

        EventBus.publish('set-page', {url: '/restaurants'});
        console.log(this.basket);
    }
}

export default new BasketController();