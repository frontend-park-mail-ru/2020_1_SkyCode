import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus.js';
import ErrorBlock from '../errorBlock/ErrorBlock.js';
import template from './AddRestaurant.hbs';
import Textarea from '../../elements/textarea/Textarea';
import Events from '../../../services/Events/Events';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import ImageInput from '../../elements/ImageInput/ImageInput';
import RadiusInput from '../../elements/RadiusInput/RadiusInput';
import GeoInput from '../../elements/GeoInput/GeoInput';

export default class AddRestaurant extends Component {
    constructor({classes}) {
        super(classes, {
            nameInput: new CheckedInput({
                label: 'Название',
                Input: new Input({
                    id: 'add-restaurant__name-input',
                    type: 'text',
                    placeholder: 'ресторана',
                    minlength: 4,
                    isRequired: true,
                }),
            }),
            descInput: new CheckedInput({
                label: 'Описание',
                Input: new Textarea({
                    id: 'add-restaurant__desc-textarea',
                    placeholder: 'ресторана',
                    maxlength: 255,
                    minLength: 10,
                    isRequired: true,
                }),
            }),
            Image: new CheckedInput({
                label: 'Изображение',
                Input: new ImageInput({
                    id: 'add-restaurant__image-input',
                    isRequired: true,
                }),
            }),
            RadiusInput: new CheckedInput({
                label: 'Радиус доставки',
                Input: new RadiusInput({
                    id: 'add-rest-point__rad-input',
                }),
            }),
            AddressInput: new CheckedInput({
                label: 'Адрес ресторана',
                Input: new GeoInput('__add-rest-point'),
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
                    let valFlag = this.context.nameInput.isValid();
                    valFlag = valFlag && this.context.descInput.isValid();
                    valFlag = valFlag && this.context.Image.isValid();
                    valFlag = valFlag && this.context.RadiusInput.isValid();
                    valFlag = valFlag && this.context.AddressInput.isValid();
                    if (!valFlag) return;

                    const formData = new FormData();
                    formData.append(
                        'image',
                        this.context.Image.context.Input.domElement.files[0],
                    );
                    formData.append(
                        'Name',
                        this.context.nameInput.value(),
                    );
                    formData.append(
                        'Description',
                        this.context.descInput.value(),
                    );
                    formData.append(
                        'Address',
                        this.context.AddressInput.value(),
                    );
                    formData.append(
                        'Radius',
                        this.context.RadiusInput.value(),
                    );
                    EventBus.broadcast(Events.addRestaurant, formData);
                },
            }),
        });
    }

    focusOnAddressInput() {
        this.context.AddressInput.focus();
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(
                'add-restaurant-error',
                (message) => {
                    this.context.generalError.addMessage(message);
                }),
        );

        ymaps.ready(init);
        function init() {
            const input = document.getElementById(GeoInput.id('__add-rest-point'));
            Object.defineProperty(input, 'value', {
                get() {
                    return this.innerText.replace(/\s+/g, ' ').trim();
                },
                set(v) {
                    this.innerText = v.replace(/\s+/g, '\n');
                },
            });

            const suggestView = new ymaps.SuggestView(input);
        }

        super.bind();
    }
}
