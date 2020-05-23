import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './BasketProduct.hbs';
import NumberInput from '../../elements/numberInput/NumberInput';
import Events from '../../../services/Events/Events';

export default class BasketProduct extends Component {
    constructor({classes, imageHref, name, quantity, cost, id, mainId: prodId, product}) {
        const changeEventInputBasis = 'basket-product_input-1' + id;
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
        this.product = product;
        this.changeEventInputBasis = changeEventInputBasis;
        this.isPublisher = false;
    }

    bind() {
        console.log('!!!', NumberInput.minusEvent(this.changeEventInputBasis));
        this.addUnbind(
            EventBus.subscribe(NumberInput.minusEvent(this.changeEventInputBasis), () => {
                this.isPublisher = true;
                EventBus.broadcast(Events.deleteProd, this.prodId);
                this.isPublisher = false;
            }),
        );

        this.addUnbind(
            EventBus.subscribe(NumberInput.plusEvent(this.changeEventInputBasis), () => {
                this.isPublisher = true;
                EventBus.broadcast(Events.addProduct, this.product);
                this.isPublisher = false;
            }),
        );

        this.addUnbind(
            EventBus.subscribe(Events.productAdded(this.prodId), () => {
                if (this.isPublisher) return;
                this.context.Input.quitePlus();
            }),
        );

        this.addUnbind(
            EventBus.subscribe(Events.productDeleted(this.prodId), () => {
                if (this.isPublisher) return;
                this.context.Input.quiteMinus();
            }),
        );

        super.bind();
    }
}
