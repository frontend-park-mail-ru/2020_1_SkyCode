import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';
import template from './AddRestaurant.hbs';
import Textarea from '../../elements/textarea/Textarea';

export default class AddRestaurant extends Component {
    constructor({classes}) {
        super(classes, {
            nameInput: new Input({
                classes: 'add-restaurant__input',
                id: 'add-restaurant__name-input',
                type: 'text',
                placeholder: 'Название',
                isRequired: true,
            }),
            nameError: new ErrorBlock({
                id: 'name-error',
            }),
            descInput: new Textarea({
                classes: 'add-restaurant__textarea',
                id: 'add-restaurant__desc-textarea',
                placeholder: 'Описание',
                maxlength: 255,
                isRequired: false,
            }),
            descError: new ErrorBlock({
                id: 'desc-error',
            }),
            Image: new Input({
                classes: 'add-restaurant__image-input',
                id: 'add-restaurant__image-input',
                type: 'file',
                value: 'xxx',
                isRequired: true,
            }),
            ImageError: new ErrorBlock({
                id: 'image-error',
            }),
            generalError: new ErrorBlock({
                id: 'general-error',
            }),
        });

        super.template = template;

        this.addContextData({
            submitButton: new NeonButton({
                classes: 'add-restaurant__submit',
                text: 'Добавить',
                callback: () => {
                    this.context.generalError.clean();
                    let validationFlag;

                    validationFlag = Validation.inputValidation(
                        this.context.nameInput,
                        this.context.nameError,
                    );

                    validationFlag = Validation.inputValidation(
                        this.context.descInput,
                        this.context.descError,
                    ) && validationFlag;

                    validationFlag = Validation.inputValidation(
                        this.context.Image,
                        this.context.ImageError,
                    ) && validationFlag;

                    if (validationFlag === false) {
                        return;
                    }

                    const formData = new FormData();
                    formData.append(
                        'image',
                        this.context.Image.domElement.files[0],
                    );
                    formData.append(
                        'Name',
                        this.context.nameInput.domElement.value,
                    );
                    formData.append(
                        'Description',
                        this.context.descInput.domElement.value,
                    );
                    EventBus.publish('add-restaurant', formData);
                },
            }),
        });
    }

    bind() {
        EventBus.subscribe(
            'add-restaurant-error',
            (message) => {
                this.context.generalError.addMessage(message);
            });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(
            'add-restaurant-error',
            (message) => {
                this.context.generalError.addMessage(message);
            });

        super.unbind();
    }
}
