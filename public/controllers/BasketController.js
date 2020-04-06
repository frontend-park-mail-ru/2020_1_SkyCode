import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantController from './RestaurantController.js';
import ProfileController from './ProfileController.js';

class BasketController extends BaseController {
    constructor() {
        super();
        this.basket = {
            owner: -1,
            product: {},
        };
        this.total = 0;
        this.persons = 1;
    }

    startCatchEvents() {
        EventBus.subscribe('add-product', this.addProductHandler.bind(this));
        EventBus.subscribe(
            'person-amount-change',
            this.personAmountChangeHandler.bind(this),
        );
        EventBus.subscribe('success-login', this.CheckBasketHandler.bind(this));
        EventBus.subscribe('log-out', this.cleanBasketHandler.bind(this));
        EventBus.subscribe('delete-prod', this.deleteProductHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('add-product', this.addProductHandler.bind(this));
        EventBus.unsubscribe(
            'person-amount-change',
            this.personAmountChangeHandler.bind(this),
        );
        EventBus.unsubscribe('success-login', this.CheckBasketHandler.bind(this));
        EventBus.unsubscribe('log-out', this.cleanBasketHandler.bind(this));
        EventBus.unsubscribe('delete-prod', this.deleteProductHandler.bind(this));
    }

    productNumber() {
        return Object.keys(this.basket).length;
    }

    isEmpty() {
        return 0 === this.productNumber();
    }

    addProductHandler(data) {
        if (data.id in this.basket.product) {
            this.basket.product[data.id].amount++;
        } else {
            this.basket.product[data.id] = data;
            this.basket.product[data.id].amount = 1;
        }

        EventBus.publish('set-page', {
            url: `/restaurants/${RestaurantController.restaurantId}`,
        });
    }

    deleteProductHandler(id) {
        if (!(id in this.basket.product)) {
            return;
        }

        if (this.basket.product[id].amount === 1) {
            delete this.basket.product[id];
        } else if (this.basket.product[id].amount > 1) {
            this.basket.product[id].amount--;
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

    CheckBasketHandler(data) {
        console.log(this.basket.owner, data);
        if (this.basket.owner !== data) {
            this.basket = {
                owner: data,
                product: {},
            };
        }
    }

    cleanBasketHandler(data) {
        this.basket = {
            owner: -1,
            product: {},
        };
    }
}

export default new BasketController();
