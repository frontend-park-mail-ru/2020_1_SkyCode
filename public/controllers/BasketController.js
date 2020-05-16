import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import RestaurantController from './RestaurantController.js';

class BasketController extends BaseController {
    constructor() {
        super();
        this.basket = {
            restaurant: RestaurantController.restaurantId,
            owner: -1,
            product: {},
        };
        this.total = 0;
        this.persons = 1;
    }

    startCatchEvents() {
        EventBus.subscribe(Event.addProduct, this.addProductHandler.bind(this));
        EventBus.subscribe(
            Event.personAmountChange,
            this.personAmountChangeHandler.bind(this),
        );
        EventBus.subscribe(Event.checkoutSuccess, this.cleanBasketHandler.bind(this));
        EventBus.subscribe(Event.successLogin, this.CheckBasketHandler.bind(this));
        EventBus.subscribe(Event.successSignup, this.CheckBasketHandler.bind(this));
        EventBus.subscribe(Event.logout, this.cleanBasketHandler.bind(this));
        EventBus.subscribe(Event.deleteProd, this.deleteProductHandler.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe(Event.addProduct, this.addProductHandler.bind(this));
        EventBus.unsubscribe(
            Event.personAmountChange,
            this.personAmountChangeHandler.bind(this),
        );
        EventBus.unsubscribe(Event.successLogin, this.CheckBasketHandler.bind(this));
        EventBus.unsubscribe(Event.logout, this.cleanBasketHandler.bind(this));
        EventBus.unsubscribe(Event.checkoutSuccess, this.cleanBasketHandler.bind(this));
        EventBus.unsubscribe(Event.deleteProd, this.deleteProductHandler.bind(this));
    }

    productNumber() {
        return Object.keys(this.basket.product).length;
    }

    isEmpty() {
        return 0 === this.productNumber();
    }

    addProductHandler(data) {
        if (Object.entries(this.basket.product).length === 0) {
            this.basket.restaurant = RestaurantController.restaurantId;
        }
        if (this.basket.restaurant !== RestaurantController.restaurantId) {
            this.cleanBasketHandler();
            this.basket.restaurant = RestaurantController.restaurantId;
        }
        if (data.id in this.basket.product) {
            this.basket.product[data.id].amount++;
        } else {
            this.basket.product[data.id] = data;
            this.basket.product[data.id].amount = 1;
        }
        EventBus.publish(Event.basketChanged, this.basket.product);
    }

    deleteProductHandler(id) {
        if (id in this.basket.product) {
            if (this.basket.product[id].amount === 1) {
                delete this.basket.product[id];
            } else if (this.basket.product[id].amount > 1) {
                this.basket.product[id].amount--;
            }

            EventBus.publish(Event.basketChanged, this.basket.product);
        }
    }

    personAmountChangeHandler(personNum) {
        if (personNum > 0) {
            this.persons = personNum;
        }
    }

    CheckBasketHandler(data) {
        this.basket.owner = data;
    }

    cleanBasketHandler() {
        this.basket = {
            owner: -1,
            product: {},
        };
    }
}

export default new BasketController();
