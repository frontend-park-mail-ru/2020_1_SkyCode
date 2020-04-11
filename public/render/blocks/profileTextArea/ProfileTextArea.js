import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import Img from '../../elements/img/Img.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';
import template from './ProfileTextArea.hbs';

export default class ProfileTextArea extends Component {
    constructor({classes, data}) {
        super(classes, {
            fNameInput: new Input({
                classes: 'profile-text-area__input',
                id: 'fname-input',
                type: 'text',
                value: data.User.firstName,
                placeholder: 'first name',
                isRequired: true,
            }),
            firstNameErrorField: new ErrorBlock({
                id: 'profile-first-name-error',
            }),
            lNameInput: new Input({
                classes: 'profile-text-area__input',
                id: 'lname-input',
                type: 'text',
                value: data.User.lastName,
                placeholder: 'last name',
                isRequired: true,
            }),
            lastNameErrorField: new ErrorBlock({
                id: 'profile-second-name-error',
            }),
            EmailInput: new Input({
                classes: 'profile-text-area__input',
                id: 'email-input',
                type: 'email',
                value: data.User.email,
                // eslint-disable-next-line max-len
                pattern: '^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
                placeholder: 'email@example.com',
            }),
            emailErrorField: new ErrorBlock({
                id: 'profile-email-error',
            }),
            Image: new Img({
                classes: 'profile-avatar-area__image',
                src: `/images/${data.User.profile_photo}`,
            }),
            avatarErrorField: new ErrorBlock({
                id: 'profile-avatar-error',
            }),
            AvatarInput: new Input({
                classes: 'profile-avatar-area__image-input',
                id: 'profile-avatar-area__image-input',
                type: 'file',
                value: 'xxx',
            }),
            generalErrorField: new ErrorBlock({
                id: 'profile-general-error',
            }),
        });

        super.template = template;

        this.addContextData({
            SubmitButton:
                new NeonButton({
                    text: 'Обновить',
                    classes: 'profile-update__submit-btn',
                    callback: () => {
                        this.context.generalErrorField.clean();

                        let validationFlag;

                        validationFlag = Validation.inputValidation(
                            this.context.fNameInput,
                            this.context.firstNameErrorField,
                        );

                        validationFlag = Validation.inputValidation(
                            this.context.lNameInput,
                            this.context.lastNameErrorField,
                        ) && validationFlag;

                        validationFlag = Validation.inputValidation(
                            this.context.EmailInput,
                            this.context.emailErrorField,
                        ) && validationFlag;

                        if (validationFlag === false) {
                            return;
                        }

                        const data = {
                            firstName: this.context.fNameInput.domElement.value,
                            lastName: this.context.lNameInput.domElement.value,
                            email: this.context.EmailInput.domElement.value,
                        };
                        EventBus.publish('update-user', data);
                    },
                }),

            LogoutButton:
                new NeonButton({
                    text: 'Выйти',
                    classes: 'profile-update__logout-btn',
                    callback: () => {
                        EventBus.publish('log-out');
                    },
                }),
            ordersButton: new NeonButton({
                text: 'Заказы',
                classes: 'orders-btn',
                callback: () => {
                    EventBus.publish('redirect', {url: '/orders'});
                },
            }),
        });
    }

    bind() {
        this.context.AvatarInput.domElement.addEventListener('change', () => {
            const img = this.context.AvatarInput.domElement.files[0];
            const formData = new FormData();
            formData.append('avatar', img);
            this.context.avatarErrorField.clean();
            EventBus.publish('avatar-update', formData);
        });

        EventBus.subscribe('update-bio-error', (message) => {
            this.context
                .generalErrorField
                .addMessage(message);
        });

        EventBus.subscribe('update-avatar-error', (message) => {
            this.context
                .avatarErrorField
                .addMessage(message);
        });

        super.bind();
    }
}
