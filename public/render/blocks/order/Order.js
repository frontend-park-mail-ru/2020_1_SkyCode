import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../placeTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import PersonInput from '../personInput/PersonInput.js';
import Button from '../../elements/button/Button.js';

export default class Order extends Component {
    constructor({products,
                    classes = 'order',
                    withCheckoutButton = true,
                    personNum = 1}) {
        super();
        this.addClasses(classes);
        this.addContextData({
            title: 'My Order',
            total: products.reduce(
                (accumulate, current) => accumulate + current.cost * current.quantity, 0
            ),
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
                products
            }),
            personInput: new PersonInput({
                classes: 'order__person-input',
                label: 'Persons:',
                value: personNum,
            }),
        });

        if (withCheckoutButton) {
            this.addContextData({
                checkout: new Button({
                    id: 'order__checkout',
                    classes: 'order__checkout',
                    text: 'Checkout',
                    callback: () => 0,
                })
            });
        }
    }
}
