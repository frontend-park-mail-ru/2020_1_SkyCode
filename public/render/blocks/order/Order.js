import Component from '../../Component.js';
import ImageHref from '../imageHref/ImageHref.js';
import PlaceTimeCard from '../placeTimeCard/PlaceTimeCard.js';
import Basket from '../basket/Basket.js';
import PersonInput from '../personInput/PersonInput.js';
import Button from '../../elements/button/Button.js';

export default class Order extends Component {
    constructor({profile = {src: '/static/profile.png', href: '/login'},
                    products, classes = 'order'}) {
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
                src: profile.src,
                href: profile.href,
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
                min: 1,
                label: 'Persons:',
            }),
            checkout: new Button({
                id: 'order__checkout',
                classes: 'order__checkout',
                text: 'Checkout',
                callback: () => 0,
            })
        });
    }
}
