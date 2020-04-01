import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import Button from '../../elements/button/Button';

export default class OrderCheckout extends Component {
    constructor({classes, phone, address, email}) {
        super(classes, {
            PhoneInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__phone-input',
                type: 'phone',
                value: phone,
                placeholder: 'Enter your phone',
            }),
            AddressInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__address-input',
                type: 'text',
                value: address,
                placeholder: 'Enter your address',
            }),
            EmailInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__email-input',
                type: 'email',
                value: email,
                placeholder: 'Enter your email',
            }),
            CommentInput: new Input({
                classes: 'order-checkout__input',
                id: 'order-checkout__comment-input',
                type: 'text',
                placeholder: 'Enter your comment',
            }),
            SubmitButton: new Button({
                classes: 'order-checkout__submit-button',
                text: 'Confirm',
                callback: () => 0,
            }),
        });
    }
}
