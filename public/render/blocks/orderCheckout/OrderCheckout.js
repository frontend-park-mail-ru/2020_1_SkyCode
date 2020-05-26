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
                    id: 'order-checkout__phone-input',
                    value: phone,
                    isRequired: true,
                }),
            }),
            AddressInput: new CheckedInput({
                label: 'Адрес',
                Input: new Input({
                    id: 'order-checkout__address-input',
                    type: 'text',
                    minlength: '5',
                    maxlength: '255',
                    value: localStorage.getItem('deliveryGeo'),
                    placeholder: 'Введите адрес доставки',
                    isRequired: true,
                }),
            }),
            EmailInput: new CheckedInput({
                label: 'Почта',
                Input: new Input({
                    id: 'order-checkout__email-input',
                    type: 'email',
                    value: email,
                    pattern: '^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
                    placeholder: 'email@example.com',
                }),
            }),
            CommentInput: new CheckedInput({
                label: 'Комментарии',
                Input: new Input({
                    id: 'order-checkout__comment-input',
                    type: 'text',
                    maxlength: 255,
                    placeholder: 'пожелания',

                }),
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
                        let validFlag = this.context.PhoneInput.isValid();
                        validFlag = validFlag && this.context.AddressInput.isValid();
                        validFlag = validFlag && this.context.EmailInput.isValid();
                        validFlag = validFlag && this.context.CommentInput.isValid();

                        if (BasketController.isEmpty()) {
                            this.context
                                .GeneralError
                                .replaceMessage('Ваша корзина пуста');
                            validFlag = false;
                        }

                        if (validFlag === false) {
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
                            phone: this.context.PhoneInput.value(),
                            address: this.context.AddressInput.value(),
                            email: this.context.EmailInput.value(),
                            comment: this.context.CommentInput.value(),
                            personNum: parseInt(BasketController.persons),
                            price: BasketController.total,
                            restId: parseInt(BasketController.basket.restaurant),
                            products,
                        };

                        EventBus.broadcast(Events.checkout, data);
                    },
                }),
        });

        setTimeout(() => {
            this.context.PhoneInput.context.Input.correct();
        }, 500);
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe('order-checkout-error', (message) => {
                this.context.GeneralError.replaceMessage(message);
            }),
        );

        super.bind();
    }
}
