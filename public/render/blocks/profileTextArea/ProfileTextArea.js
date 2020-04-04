import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import neonButton from '../../elements/neonButton/neonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import Img from '../../elements/img/Img.js';

export default class ProfileTextArea extends Component {
	constructor({classes, data}) {
		super(classes, {
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
			Image: new Img({
				classes: 'profile-avatar-area__image',
				src: `/images/${data.User.profile_photo}`,
			}),
			AvatarInput: new Input({
				classes: 'profile-avatar-area__image-input',
				id: 'profile-avatar-area__image-input',
				type: 'file',
				value: 'xxx',
			})
		});

		this.addContextData({
			SubmitButton:
				new neonButton({
					text: 'Save',
					classes: 'profile-update__submit-btn',
					callback: () => {
						const data = {
							firstName: this.context.fNameInput.domElement.value,
							lastName: this.context.lNameInput.domElement.value,
							email: this.context.EmailInput.domElement.value
						};
						EventBus.publish('update-user', data);
					}
				}),
			LogoutButton:
				new neonButton({
					text: 'Log Out',
					classes: 'profile-update__logout-btn',
					callback: () => {
						EventBus.publish('log-out');
						},
				})
		});
	}

	bind() {
		this.context.AvatarInput.domElement.addEventListener('change', () => {
			const img = this.context.AvatarInput.domElement.files[0];
			let formData = new FormData();
			formData.append('avatar', img);
			EventBus.publish('avatar-update', formData);
		});
		super.bind();
	}
}