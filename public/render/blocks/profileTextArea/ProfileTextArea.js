import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import Img from '../../elements/img/Img.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import template from './ProfileTextArea.hbs';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import Events from '../../../services/Events/Events';

export default class ProfileTextArea extends Component {
    constructor({classes, data}) {
        const imgSrc = data.profile_photo ? `/images/${data.profile_photo}`
            : '/static/Portrait_Placeholder.png';

        const message = sessionStorage.message;
        sessionStorage.message = '';

        super(classes, {
            message,
            fNameInput: new CheckedInput({
                label: 'Ваше имя',
                Input: new Input({
                    classes: '',
                    id: 'fname-input',
                    type: 'text',
                    value: data.firstName,
                    placeholder: 'Михаил',
                    isRequired: true,
                    minlength: 4,
                }),
            }),

            lNameInput: new CheckedInput({
                label: 'Ваша фамилия',
                Input: new Input({
                    classes: '',
                    id: 'lname-input',
                    type: 'text',
                    value: data.lastName,
                    placeholder: 'Волынов',
                    isRequired: true,
                    minlength: 4,
                }),
            }),

            EmailInput: new CheckedInput({
                label: 'Ваша почта',
                Input: new Input({
                    classes: '',
                    id: 'email-input',
                    type: 'email',
                    value: data.email,
                    // eslint-disable-next-line max-len
                    pattern: '^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$',
                    placeholder: 'email@example.com',
                }),
            }),

            Image: new Img({
                classes: 'profile-avatar-area__image',
                src: imgSrc,
                alt: 'profile avatar',
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
                    id: 'profile-area__submit',
                    classes: 'profile-area__submit',
                    text: 'Сохранить',
                    callback: () => {
                        EventBus.broadcast(Events.profileViewUpdateUser);
                    },
                }),

            LogoutButton:
                new NeonButton({
                    id: 'profile-area__log-out',
                    classes: 'profile-area__submit',
                    text: 'Выйти',
                    callback: () => {
                        EventBus.broadcast(Events.logout);
                    },
                }),
            ordersButton: new NeonButton({
                text: 'Заказы',
                id: 'profile-area__orders',
                classes: 'profile-area__submit',
                callback: () => {
                    EventBus.broadcast(Events.setPage, {url: '/orders'});
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
            EventBus.broadcast(Events.avatarUpdate, formData);
        });

        this.addUnbind(
            EventBus.subscribe('update-bio-error', (message) => {
                this.context
                    .generalErrorField
                    .addMessage('Пользователь с таким email уже существует');
                // .addMessage(message);
            }),
        );

        this.addUnbind(
            EventBus.subscribe('update-avatar-error', (message) => {
                this.context
                    .avatarErrorField
                    .addMessage('Ошибка обновления аватара');
                // .addMessage(message);
            }),
        );

        this.addUnbind(
            EventBus.subscribe(Events.profileViewUpdateUser, () => {
                this.context.generalErrorField.clean();

                const isValid = this.context.fNameInput.isValid()
                    && this.context.lNameInput.isValid()
                    && this.context.EmailInput.isValid();

                if (!isValid) return;

                const data = {
                    firstName: this.context.fNameInput.value(),
                    lastName: this.context.lNameInput.value(),
                    email: this.context.EmailInput.value(),
                };
                EventBus.broadcast(Events.updateUser, data);
            }),
        );

        super.bind();
    }

    unbind() {
        this.context.AvatarInput.domElement.onchange = null;
        super.unbind();
    }
}
