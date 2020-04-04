import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

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
		});

		this.addContextData({
			SubmitButton:
				new neonButton({
					classes: 'order-checkout__confirm',
					text: 'Confirm',
                    callback: () => {
					    const data = {
                            phone: this.context.PhoneInput.domElement.value,
                            address: this.context.AddressInput.domElement.value,
                            email: this.context.EmailInput.domElement.value,
                            comment: this.context.CommentInput.domElement.value,
                        };
					    EventBus.publish('checkout', data);
                    }
				}),
		});
	}
}
