import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../placeTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import PersonInput from '../personInput/PersonInput.js';
import Href from '../../elements/href/Href.js';
import BasketController from '../../../controllers/BasketController.js';
import template from './Order.hbs';
import EventBus from '../../../services/Events/EventBus.js';
import SupportChat from '../supportChat/supportChat.js';
import Button from '../../elements/button/Button';
import SupportChatController from '../../../controllers/SupportChatController.js';

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
            PlaceTimeCard: new PlaceTimeCard({
                classes: 'order__place-time-card',
            }),
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
        EventBus.subscribe('basket-changed', this.setTotal.bind(this));
        EventBus.subscribe('order-button-clicked', this.orderButtonHandler.bind(this));
        super.bind();
        if (this.needToHide) {
            this.disappear();
        }
    }

    unbind() {
        this.appear();
        EventBus.unsubscribe('basket-changed', this.setTotal.bind(this));
        EventBus.subscribe('order-button-clicked', this.orderButtonHandler.bind(this));
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
