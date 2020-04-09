import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import Validation from '../../../services/InputValidation.js';
import template from './AddProductByRestaurant.hbs';

export default class AddProductByRestaurant extends Component {
    constructor({classes}) {
        super(classes, {
            nameInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__name-input',
                type: 'text',
                placeholder: 'Название',
                isRequired: true,
            }),
            nameError: new ErrorBlock({
                id: 'name-error',
            }),
            costInput: new Input({
                classes: 'add-product-by-restaurant__input',
                id: 'add-product-by-restaurant__cost-input',
                type: 'number',
                placeholder: 'Цена',
                min: '0',
                max: 10000,
                isRequired: true,
            }),
            costError: new ErrorBlock({
                id: 'cost-error',
            }),
            Image: new Input({
                classes: 'add-product-by-restaurant__image-input',
                id: 'add-product-by-restaurant__image-input',
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
                classes: 'add-product-by-restaurant__submit',
                text: 'Добавить',
                callback: () => {
                    this.context.generalError.clean();
                    let validationFlag;

                    validationFlag = Validation.inputValidation(
                        this.context.nameInput,
                        this.context.nameError,
                    );

                    validationFlag = Validation.inputValidation(
                        this.context.costInput,
                        this.context.costError,
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
                        'Price',
                        this.context.costInput.domElement.value,
                    );
                    EventBus.publish('add-product-by-restaurant', formData);
                },
            }),
        });
    }

    bind() {
        EventBus.subscribe(
            'add-product-by-restaurant-error',
            (message) => {
                this.context.generalError.addMessage(message);
            });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(
            'add-product-by-restaurant-error',
            (message) => {
                this.context.generalError.addMessage(message);
            });

        super.unbind();
    }
}
