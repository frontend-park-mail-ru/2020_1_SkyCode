import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class ProfileTextArea extends Component {
	constructor({classes, data}) {
		super(classes, {
			PhoneInput: new Input({
				classes: 'profile-text-area__input',
				id: 'phone-input',
				type: 'phone',
				value: data.User.phone,
				placeholder: 'phone'
			}),
			fNameInput: new Input({
				classes: 'profile-text-area__input',
				id: 'fname-input',
				type: 'text',
				value: data.User.firstName,
				placeholder: 'first name'
			}),
			lNameInput: new Input({
				classes: 'profile-text-area__input',
				id: 'lname-input',
				type: 'text',
				value: data.User.lastName,
				placeholder: 'last name'
			}),
			EmailInput: new Input({
				classes: 'profile-text-area__input',
				id: 'email-input',
				type: 'email',
				value: data.User.email,
				placeholder: 'e-mail'
			}),
		});

		this.addContextData({SubmitButton:
		new neonButton({
			text: 'Save',
            callback: () => {
				console.log('123');
			    const data = {
                    email: this.context.EmailInput.domElement.value,
                    firstName: this.context.fNameInput.domElement.value,
                    lastName: this.context.lNameInput.domElement.value
                };
			    EventBus.publish('update-user', data);
			    console.log('publish');
            }
		})});


	}
}