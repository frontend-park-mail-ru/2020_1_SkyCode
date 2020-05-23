import template from './AddProductView.hbs';
import Component from '../../Component';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import Input from '../../elements/input/Input';
import NeonButton from '../../elements/neonButton/NeonButton';
import ImageInput from '../../elements/ImageInput/ImageInput';
import Events from '../../../services/Events/Events';
import EventBus from '../../../services/Events/EventBus';
import CostInput from '../../elements/CostInput/CostInput';


export default class AddProductView extends Component {
    constructor({classes = '', restName}) {
        const message = sessionStorage.getItem('message');
        sessionStorage.message = '';

        super(classes, {
            message,
            name: restName,
            NameInput: new CheckedInput({
                label: 'Название',
                Input: new Input({
                    classes: '',
                    id: 'add-product-by-restaurant__name-input',
                    type: 'text',
                    placeholder: 'продукта',
                    minlength: 4,
                    isRequired: true,
                }),
            }),
            CostInput: new CheckedInput({
                label: 'Цена',
                Input: new CostInput({
                    classes: '',
                    id: 'add-product-by-restaurant__cost-input',
                    placeholder: 'продукта (₽)',
                    max: 10000,
                    isRequired: true,
                }),
            }),

            ImageInput: new ImageInput({
                id: 'add-product__image-input',
                classes: 'add-product__image-input',
            }),
        });

        super.template = template;

        this.addContextData({
            SubmitButton: new NeonButton({
                classes: 'add-product-by-restaurant__submit',
                text: 'Добавить',
                callback: () => {
                    let isValid = this.context.NameInput.isValid();
                    isValid = this.context.CostInput.isValid() && isValid;
                    isValid = this.context.ImageInput.isValid() && isValid;
                    if (!isValid) return;

                    const formData = new FormData();
                    formData.append(
                        'image',
                        this.context.ImageInput.domElement.value,
                    );
                    formData.append(
                        'Name',
                        this.context.NameInput.value(),
                    );
                    formData.append(
                        'Price',
                        this.context.CostInput.value(),
                    );
                    EventBus.broadcast(Events.addProductByRestaurant, formData);
                },
            }),
        });
    }

    bind() {
        setTimeout(() => this.context.NameInput.focus(), 300);
        super.bind();
    }
}
