import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../placeTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import PersonInput from '../personInput/PersonInput.js';
import Href from '../../elements/href/Href.js';
import BasketController from '../../../controllers/BasketController.js';
import template from './Order.hbs';
import EventBus from '../../../services/Events/EventBus.js';
import SupportChatController from '../../../controllers/SupportChatController.js';

export default class Order extends Component {
    constructor({
        basket = BasketController.basket.product,
        classes = 'order',
        withCheckoutButton = true,
        personNum = BasketController.persons,
    }) {
        super();
        super.template = template;

        this.addClasses(classes);
        this.addContextData({
            title: 'Заказ',
            total: this.countTotal(basket),
            profileButton: new ImageHref({
                classes: 'order__profile-href',
                imageClasses: 'order__profile-image',
                src: '/static/profile.png',
                href: '/login',
            }),
            supportButton: new ImageHref({
                classes: 'support-button',
                src: '/static/support.svg',
                imageClasses: 'order__profile-image',
                href: '/support',
                cb: () => {
                    EventBus.publish('set-page', {url: '/support'});
                    //SupportChatController.win = window.open('http://89.208.199.114:8080/support', '_blank', 'width=100,height=200,left=100,top=100,menubar=no,toolbar=no');
                },
            }),
            placeTimeCard: new PlaceTimeCard({
                classes: 'order__place-time-card',
            }),
            basket: new Basket({
                classes: 'order__basket',
                basket,
            }),
            personInput: new PersonInput({
                classes: 'order__person-input',
                label: 'Гостей:',
                personNum,
            }),
        });

        if (withCheckoutButton) {
            this.addContextData({
                checkout: new Href({
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
        EventBus.subscribe('basket-changed', this.setTotal.bind(this));
        super.bind();
    }

    unbind() {
        EventBus.unsubscribe('basket-changed', this.setTotal.bind(this));
        super.unbind();
    }
}
