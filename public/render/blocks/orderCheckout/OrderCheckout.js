import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import BasketController from '../../../controllers/BasketController.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';
import template from './OrderCheckout.hbs';
import PhoneInput from '../../elements/phoneInput/PhoneInput.js';
import Button from '../../elements/button/Button';
import Events from '../../../services/Events/Events';
import CheckedInput from '../../elements/checkedInput/CheckedInput';

export default class OrderCheckout extends Component {
    constructor({classes, phone, address, email, profile}) {
        super(classes, {
            PhoneInput: new CheckedInput({
                label: 'Телефон',
                Input: new PhoneInput({
                    classes: 'order-checkout__input',
                    id: 'order-checkout__phone-input',
                    isRequired: true,
                }),
            }),
            PhoneError: new ErrorBlock({
                id: 'phone-input-error',
            }),
            AddressInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__address-input',
                type: 'text',
                minlength: '5',
                maxlength: '255',
                value: localStorage.getItem('deliveryGeo'),
                placeholder: 'Введите адрес доставки',
                isRequired: true,
            }),
            AddressError: new ErrorBlock({
                id: 'address-input-error',
            }),
            EmailInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__email-input',
                type: 'email',
                value: email,
                // eslint-disable-next-line max-len
                pattern: '^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
                placeholder: 'email@example.com',
            }),
            EmailError: new ErrorBlock({
                id: 'email-input-error',
            }),
            CommentInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__comment-input',
                type: 'text',
                maxlength: 255,
                placeholder: 'Пожелания',

            }),
            GeneralError: new ErrorBlock({
                id: 'general-error',
            }),
        });

        super.template = template;

        this.addContextData({
            SubmitButton:
                new Button({
                    classes: 'product-card-button',
                    text: 'Заказать',
                    callback: () => {
                        this.context.GeneralError.clean();
                        let validationFlag;

                        validationFlag = Validation.inputValidation(
                            this.context.PhoneInput,
                            this.context.PhoneError,
                        );

                        validationFlag = Validation.inputValidation(
                            this.context.AddressInput,
                            this.context.AddressError,
                        ) && validationFlag;

                        validationFlag = Validation.inputValidation(
                            this.context.EmailInput,
                            this.context.EmailError,
                        ) && validationFlag;

                        if (BasketController.isEmpty()) {
                            this.context
                                .GeneralError
                                .addMessage('Ваша корзина пуста');
                            validationFlag = false;
                        }

                        if (validationFlag === false) {
                            return;
                        }

                        const basket = BasketController.basket.product;
                        const products = [];
                        for (const id in basket) {
                            const productItem = {
                                productId: parseInt(id),
                                count: basket[id].amount,
                            };
                            products.push(productItem);
                        }
                        const data = {
                            userId: profile.id,
                            phone: this.context.PhoneInput.domElement.value,
                            address: this.context.AddressInput.domElement.value,
                            email: this.context.EmailInput.domElement.value,
                            comment: this.context.CommentInput.domElement.value,
                            personNum: parseInt(BasketController.persons),
                            price: BasketController.total,
                            restId: parseInt(BasketController.basket.restaurant),
                            products,
                        };

                        EventBus.publish(Events.checkout, data);
                    },
                }),
        });
    }

    bind() {
        EventBus.subscribe('order-checkout-error', (message) => {
            this.context.GeneralError.addMessage(message);
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe('order-checkout-error', (message) => {
            this.context.GeneralError.addMessage(message);
        });

        super.unbind();
    }
}
