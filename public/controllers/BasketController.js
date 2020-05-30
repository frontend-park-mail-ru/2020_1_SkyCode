import BaseController from './BaseController.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';
import RestaurantController from './RestaurantController.js';

class BasketController extends BaseController {
    constructor() {
        super();
        if (localStorage.basket) {
            this.basket = JSON.parse(localStorage.basket);
        } else {
            this.basket = {
                restaurant: RestaurantController.restaurantId,
                owner: -1,
                product: {},
            };
        }

        if (localStorage.total) {
            this.total = Number(localStorage.total);
        } else {
            this.total = 0;
        }

        if (localStorage.persons) {
            this.persons = Number(localStorage.total);
        } else {
            this.persons = 1;
        }
    }

    saveBasket() {
        localStorage.basket = JSON.stringify(this.basket);
    }

    saveTotal() {
        localStorage.total = String(this.total);
    }

    savePersonNum() {
        localStorage.persons = String(this.persons);
    }

    startCatchEvents() {
        this.addUnbind(
            EventBus.subscribe(Event.addProduct, this.addProductHandler.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.personAmountChange,
                this.personAmountChangeHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.checkoutSuccess,
                this.cleanBasketHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.successLogin,
                this.CheckBasketHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.successSignup,
                this.CheckBasketHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Event.deleteProd,
                this.deleteProductHandler.bind(this),
            ),
        );
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
            EventBus.broadcast(Event.restaurantSelected, {
                name: RestaurantController.restaurantName,
                id: RestaurantController.restaurantId,
            });
        }
        if (this.basket.restaurant !== RestaurantController.restaurantId) {
            this.cleanBasketHandler();
            this.basket.restaurant = RestaurantController.restaurantId;
        }
        if (data.id in this.basket.product) {
            this.basket.product[data.id].amount++;
            EventBus.broadcast(Event.productAdded(data.id));
        } else {
            this.basket.product[data.id] = data;
            this.basket.product[data.id].amount = 1;
            EventBus.broadcast(Event.updateBasket, this.basket.product);
        }

        this.saveBasket();
        EventBus.broadcast(Event.basketChanged, this.basket.product);
    }

    deleteProductHandler(id) {
        if (id in this.basket.product) {
            if (this.basket.product[id].amount === 1) {
                delete this.basket.product[id];
                EventBus.broadcast(Event.productDeleted(id));
                EventBus.broadcast(Event.updateBasket, this.basket.product);
            } else if (this.basket.product[id].amount > 1) {
                this.basket.product[id].amount--;
                EventBus.broadcast(Event.productDeleted(id));
            }

            this.saveBasket();
            EventBus.broadcast(Event.basketChanged, this.basket.product);
        }
    }

    personAmountChangeHandler(personNum) {
        if (personNum > 0) {
            this.persons = personNum;
        }
        this.savePersonNum();
    }

    CheckBasketHandler(data) {
        this.basket.owner = data;
        this.saveBasket();
    }

    cleanBasketHandler() {
        this.basket = {
            owner: -1,
            product: {},
        };

        this.saveBasket();
        EventBus.broadcast(Event.updateBasket, this.basket.product);
    }
}

export default new BasketController();
