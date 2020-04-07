import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import BasketController from '../../../controllers/BasketController.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';

export default class OrderCheckout extends Component {
    constructor({classes, phone, address, email, profile}) {
        super(classes, {
            PhoneInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__phone-input',
                type: 'tel',
                value: phone[0]
                    + '(' + phone.slice(1, 4)
                    + ')' + phone.slice(4, 7)
                    + '-' + phone.slice(7, 9)
                    + '-' + phone.slice(9, 11),
                placeholder: '8(800)555-35-35',
                isRequired: true,
                pattern: '\\d\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}',
            }),
            PhoneError: new ErrorBlock({
                id: 'phone-input-error',
            }),
            AddressInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__address-input',
                type: 'text',
                value: address,
                placeholder: 'Enter your address',
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
                placeholder: 'Enter your comment',
            }),
            GeneralError: new ErrorBlock({
                id: 'general-error',
            }),
        });

        this.addContextData({
            SubmitButton:
                new NeonButton({
                    classes: 'order-checkout__confirm',
                    text: 'Confirm',
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
                                .addMessage('Your basket is empty');
                            validationFlag = false;
                        }

                        if (validationFlag === false) {
                            return;
                        }

                        const products = [];
                        const basket = BasketController.basket.product;
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
                            products,
                        };
                        EventBus.publish('checkout', data);
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
