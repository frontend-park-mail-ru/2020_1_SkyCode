import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './BasketProduct.hbs';
import NumberInput from '../../elements/numberInput/NumberInput';
import Events from '../../../services/Events/Events';

export default class BasketProduct extends Component {
    constructor({classes, imageHref, name, quantity, cost, id, mainId: prodId}) {
        const changeEventInputBasis = 'basket-product_input-' + id;
        super(classes, {
            img: new Img({
                classes: 'basket-product__img',
                src: imageHref,
                alt: 'can\'t load picture',
            }),
            Input: new NumberInput({
                classes: 'basket-product__product-num',
                id: 'basket-product_input-' + id,
                min: '0',
                max: '9999',
                value: quantity,
                changeEventBasis: changeEventInputBasis,
                isVertical: true,
            }),
            name,
            price: quantity * cost,
        }, id, template);
        this.prodId = prodId;
        this.changeEventInputBasis = changeEventInputBasis;
    }

    bind() {
        EventBus.subscribe(NumberInput.minusEvent(this.changeEventInputBasis), () => {
            EventBus.publish(Events.delProductRequest(this.prodId));
        });

        EventBus.subscribe(NumberInput.plusEvent(this.changeEventInputBasis), () => {
            EventBus.publish(Events.addProductRequest(this.prodId));
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(NumberInput.minusEvent(this.changeEventInputBasis), () => {
            EventBus.publish(Events.delProductRequest(this.prodId));
        });

        EventBus.unsubscribe(NumberInput.plusEvent(this.changeEventInputBasis), () => {
            EventBus.publish(Events.addProductRequest(this.prodId));
        });

        super.unbind();
    }
}
