import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../placeTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import PersonInput from '../personInput/PersonInput.js';
import Href from '../../elements/href/Href.js';
import BasketController from '../../../controllers/BasketController.js';

export default class Order extends Component {
    constructor({
        basket = BasketController.basket,
        classes = 'order',
        withCheckoutButton = true,
        personNum = BasketController.persons,
    }) {
        super();
        this.addClasses(classes);
        this.addContextData({
            title: 'My Order',
            total: () => {
                let sum = 0;
                for (const id in basket) {
                    sum += basket[id].price * basket[id].amount;
                }
                BasketController.total = sum;
                return sum;
            },
            profileButton: new ImageHref({
                classes: 'order__profile-href',
                imageClasses: 'order__profile-image',
                src: '/static/profile.png',
                href: '/login',
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
                label: 'Persons:',
                personNum,
            }),
        });

        if (withCheckoutButton) {
            this.addContextData({
                checkout: new Href({
                    classes: 'order__checkout',
                    text: 'Checkout',
                    href: '/checkout',
                }),
            });
        }
    }
}
