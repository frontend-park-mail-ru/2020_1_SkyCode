import template from './AddProductByRestaurantView.hbs';
import Component from '../../Component';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import Input from '../../elements/input/Input';
import ErrorBlock from '../../blocks/errorBlock/ErrorBlock';
import NeonButton from '../../elements/neonButton/NeonButton';
import ImageInput from '../../elements/ImageInput/ImageInput';
import Events from '../../../services/Events/Events';
import EventBus from '../../../services/Events/EventBus';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';

export default class AddProductByRestaurantView extends BaseView {
    constructor({restName}) {
        super({
            Main: new MainArea({restName}),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor({classes = '', restName}) {
        const message = sessionStorage.getItem('message');
        sessionStorage.message = '';

        super(classes, {
            message,
            name: restName,
            NameInput: new CheckedInput({
                label: 'Название',
                Input: new Input({
                    classes: 'add-product-by-restaurant__input',
                    id: 'add-product-by-restaurant__name-input',
                    type: 'text',
                    placeholder: 'продукта',
                    minlength: 4,
                    isRequired: true,
                }),
            }),
            CostInput: new CheckedInput({
                label: 'Цена',
                Input: new Input({
                    classes: 'add-product-by-restaurant__input',
                    id: 'add-product-by-restaurant__cost-input',
                    type: 'number',
                    placeholder: 'продукта',
                    min: '0',
                    max: 10000,
                    isRequired: true,
                }),
            }),

            ImageInput: new ImageInput({
                id: 'add-product__image-input',
            }),
        });

        super.template = template;

        this.addContextData({
            SubmitButton: new NeonButton({
                classes: 'add-product-by-restaurant__submit',
                text: 'Добавить',
                callback: () => {
                    const isValid = this.context.NameInput.isValid()
                        && this.context.CostInput.isValid()
                        && this.context.ImageInput.isValid();
                    if (!isValid) return;

                    const formData = new FormData();
                    formData.append(
                        'image',
                        this.context.ImageInput.domElement.value,
                    );
                    formData.append(
                        'Name',
                        this.context.NameInput.domElement.value,
                    );
                    formData.append(
                        'Price',
                        this.context.CostInput.domElement.value,
                    );
                    EventBus.publish(Events.addProductByRestaurant, formData);
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
