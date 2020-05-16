import Component from '../../Component.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './ProductCard.hbs';
import Events from '../../../services/Events/Events';
import NumberInput from '../../elements/numberInput/NumberInput';
import BasketController from '../../../controllers/BasketController';
import Button from '../../elements/button/Button';

export default class ProductCard extends Component {
    constructor({id, product, classes}) {
        const numInputEventBasis = 'product-card-button__input-' + product.name + product.id;
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
                    EventBus.publish(Events.addProduct, product);
                    this.hideAddButton();
                    this.context.Input.quitePlus();
                    this.showNumberInput();
                },
            }),
        });

        this.numInputEventBasis = numInputEventBasis;
        this.product = product;
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
        } else {
            this.hideAddButton();
        }
    }

    bind() {
        this.hideNeededElements();
        EventBus.subscribe(NumberInput.plusEvent(this.numInputEventBasis), () => {
            EventBus.publish(Events.addProduct, this.product);
        });
        EventBus.subscribe(NumberInput.minusEvent(this.numInputEventBasis), (num) => {
            EventBus.publish(Events.deleteProd, this.product.id);
            if (0 === Number(num)) {
                this.hideNumberInput();
                this.showAddButton();
            }
        });
        EventBus.subscribe(Events.addProductRequest(this.product.id), () => {
            this.context.Input.plus();
        });
        EventBus.subscribe(Events.delProductRequest(this.product.id), () => {
            this.context.Input.minus();
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(NumberInput.plusEvent(this.numInputEventBasis), () => {
            EventBus.publish(Events.addProduct, this.product);
        });
        EventBus.unsubscribe(NumberInput.minusEvent(this.numInputEventBasis), (num) => {
            EventBus.publish(Events.deleteProd, this.product.id);
            if (0 === Number(num)) {
                this.hideNumberInput();
                this.showAddButton();
            }
        });
        EventBus.unsubscribe(Events.addProductRequest(this.product.id), () => {
            this.context.Input.plus();
        });
        EventBus.unsubscribe(Events.delProductRequest(this.product.id), () => {
            this.context.Input.minus();
        });

        super.unbind();
    }
}
