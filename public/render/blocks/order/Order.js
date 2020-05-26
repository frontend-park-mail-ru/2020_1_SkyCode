import Component from '../../Component.js';
import PlaceTimeCard from '../placeTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import PersonInput from '../personInput/PersonInput.js';
import Href from '../../elements/href/Href.js';
import BasketController from '../../../controllers/BasketController.js';
import template from './Order.hbs';
import EventBus from '../../../services/Events/EventBus.js';
import Events from '../../../services/Events/Events';

export default class Order extends Component {
    constructor({
        basket = BasketController.basket.product,
        classes = 'order',
        withCheckoutButton = true,
        personNum = BasketController.persons,
        isVisible = false,
    } = {}) {
        super();
        super.template = template;
        this.isVisible = true;
        this.needToHide = !isVisible;

        this.addClasses(classes);
        this.addContextData({
            Title: 'Заказ',
            Total: this.countTotal(basket),
            Basket: new Basket({
                classes: 'order__basket',
                basket,
            }),
            PersonInput: new PersonInput({
                classes: 'order__person-input',
                label: 'Гостей:',
                personNum,
            }),
        });

        if (withCheckoutButton) {
            this.addContextData({
                Checkout: new Href({
                    id: 'order-checkout__href',
                    classes: 'order__checkout',
                    text: 'Заказать',
                    href: '/checkout',
                }),
            });
        }
    }

    setTotal(basket) {
        document.getElementById('total')
            .innerText = String(this.countTotal(basket));
    }

    countTotal(basket) {
        let sum = 0;
        for (const id in basket) {
            sum += basket[id].price * basket[id].amount;
        }
        BasketController.total = sum;
        return sum;
    }

    bind() {
        this.appear();
        this.addUnbind(
            EventBus.subscribe(
                Events.setPage,
                this.disappear.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Events.updateBasket,
                this.updateBasketHandler.bind(this),
            ),
        );
        this.addUnbind(
            EventBus.subscribe(
                Events.restaurantSelected,
                this.restaurantSelectedHandler.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.basketChanged, this.setTotal.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.updateBasket, () => {
                if (BasketController.isEmpty()) {
                    document.getElementById('order-checkout__href').style.visibility = 'hidden';
                } else {
                    document.getElementById('order-checkout__href').style.visibility = 'visible';
                }
            }),
        );
        this.addUnbind(
            EventBus.subscribe('order-button-clicked', this.orderButtonHandler.bind(this)),
        );

        super.bind();
        if (this.needToHide) {
            this.disappear();
        }
    }

    updateBasketHandler() {
        if (!BasketController.isEmpty()) return;
        document.getElementsByClassName('order__title')[0].innerHTML = 'Заказ';
        document.getElementsByClassName('order__restaurant-href')[0].style.display = 'none';
    }

    restaurantSelectedHandler(restaurant) {
        const href = new Href({
            text: restaurant.name,
            href: '/restaurants/' + restaurant.id,
            classes: 'order__restaurant-href',
            id: 'order__restaurant-href',
        });
        document.getElementsByClassName('order__title')[0].innerHTML = 'Заказ в';
        document.getElementsByClassName('order__restaurant-href')[0].outerHTML = href.toString();
        href.bind();
        this.addContextData({href});
    }

    unbind() {
        super.unbind();
        this.disappear();
    }

    orderButtonHandler() {
        if (this.isVisible) {
            this.disappear();
        } else {
            this.appear();
        }
    }

    appear() {
        if (!this.isVisible) {
            const order = this.domElement;
            order.style.display = 'flex';
            if (document.getElementsByClassName('order__checkout').length > 0) {
                if (BasketController.isEmpty()) {
                    document.getElementsByClassName('order__checkout')[0]
                        .style.visibility = 'hidden';
                } else {
                    document.getElementsByClassName('order__checkout')[0]
                        .style.visibility = 'visible';
                }
            }

            this.isVisible = true;
        }
    }

    disappear() {
        if (this.isVisible) {
            const order = this.domElement;
            order.style.display = 'none';
            this.isVisible = false;
        }
    }
}
