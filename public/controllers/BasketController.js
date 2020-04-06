import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantController from './RestaurantController.js';

class BasketController extends BaseController {
    constructor() {
        super();
        this.basket = {};
        this.total = 0;
        this.persons = 1;
    }

    startCatchEvents() {
        EventBus.subscribe('add-product', this.addProductHandler.bind(this));
        EventBus.subscribe(
            'person-amount-change',
            this.personAmountChangeHandler.bind(this),
        );
    }

    stopCatchEvents() {
        EventBus.unsubscribe('add-product', this.addProductHandler.bind(this));
        EventBus.unsubscribe(
            'person-amount-change',
            this.personAmountChangeHandler.bind(this),
        );
    }

    productNumber() {
        return Object.keys(this.basket).length;
    }

    isEmpty() {
        return 0 === this.productNumber();
    }

    addProductHandler(data) {
        if (data.id in this.basket) {
            this.basket[data.id].amount++;
        } else {
            this.basket[data.id] = data;
            this.basket[data.id].amount = 1;
        }

        EventBus.publish('set-page', {
            url: `/restaurants/${RestaurantController.restaurantId}`,
        });
    }
    
    personAmountChangeHandler(personNum) {
        if (personNum > 0) {
            this.persons = personNum;
        }
    }
}

export default new BasketController();
