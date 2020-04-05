import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';

export default class BasketProduct extends Component {
    constructor({classes, imageHref, name, quantity, cost}) {
        super(classes, {
            img: new Img({
                classes: 'basket-product__img',
                src: imageHref,
                alt: 'can\'t load picture',
            }),
            name,
            quantity,
            price: quantity * cost,
        });
    }
}
