import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus';

export default class BasketProduct extends Component {
    constructor({classes, imageHref, name, quantity, cost, id}) {
        super(classes, {
            img: new Img({
                classes: 'basket-product__img',
                src: imageHref,
                alt: 'can\'t load picture',
            }),
            name,
            quantity,
            price: quantity * cost,
        }, id);
    }

    bind() {
        const node = super.domElement;
        if (node === undefined) {
            return;
        }

        node.onclick = () => {
            EventBus.publish('delete-prod', this.id);
            console.log('Del');
        };
    }

    unbind() {
        const node = super.domElement;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
    }
}
