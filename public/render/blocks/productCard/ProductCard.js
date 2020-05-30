import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './ProductCard.hbs';
import Events from '../../../services/Events/Events';
import NumberInput from '../../elements/numberInput/NumberInput';
import BasketController from '../../../controllers/BasketController';
import Button from '../../elements/button/Button';

export default class ProductCard extends Component {
    constructor({id, product, classes}) {
        const numInputEventBasis = 'product-card-button__input-product' + product.id;
        const productNum = BasketController.basket.product[product.id]
            ? BasketController.basket.product[product.id].amount : '0';

        super(classes, {
            imgSrc: `/images/${product.image}`,
            productName: product.name,
            productPrice: product.price,
            Input: new NumberInput({
                classes: 'product-card__product-input',
                id: 'number-input-' + product.id + product.name,
                min: '0',
                max: '9999',
                changeEventBasis: numInputEventBasis,
                value: productNum,
            }),
        }, id, template);

        this.addContextData({
            button: new Button({
                classes: 'product-card-button',
                text: 'Добавить',
                id: 'product-card__add-button-' + product.name + product.id,
                callback: () => {
                    EventBus.broadcast(Events.addProduct, product);
                    this.hideAddButton();
                    this.context.Input.quitePlus();
                    this.showNumberInput();
                },
            }),
        });

        this.numInputEventBasis = numInputEventBasis;
        this.product = product;
        this.isPublisher = false;
    }

    hideNumberInput() {
        this.context.Input.domElement.style.display = 'none';
    }

    showNumberInput() {
        this.context.Input.domElement.style.display = 'flex';
    }

    hideAddButton() {
        this.context.button.domElement.style.display = 'none';
    }

    showAddButton() {
        this.context.button.domElement.style.display = 'block';
    }

    hideNeededElements() {
        if (this.context.Input.getValue() === '0') {
            this.hideNumberInput();
            this.showAddButton();
        } else {
            this.hideAddButton();
            this.showNumberInput();
        }
    }

    bind() {
        this.hideNeededElements();
        this.addUnbind(
            EventBus.subscribe(
                NumberInput.plusEvent(this.numInputEventBasis), () => {
                    this.isPublisher = true;
                    EventBus.broadcast(Events.addProduct, this.product);
                    this.isPublisher = false;
                }),
        );
        this.addUnbind(
            EventBus.subscribe(NumberInput.minusEvent(this.numInputEventBasis), (num) => {
                if (0 === Number(num)) {
                    this.hideNumberInput();
                    this.showAddButton();
                }
                this.isPublisher = true;
                EventBus.broadcast(Events.deleteProd, this.product.id);
                this.isPublisher = false;
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.productAdded(this.product.id), () => {
                if (this.isPublisher) return;
                this.context.Input.quitePlus();
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.productDeleted(this.product.id), () => {
                if (this.isPublisher) return;
                this.context.Input.quiteMinus();
                this.hideNeededElements();
            }),
        );

        super.bind();
    }
}
