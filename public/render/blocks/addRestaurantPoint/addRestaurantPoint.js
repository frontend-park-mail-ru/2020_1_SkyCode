import Component from '../../Component.js';
import template from './addRestaurantPoint.hbs';
import NeonButton from '../../elements/neonButton/NeonButton';
import EventBus from '../../../services/Events/EventBus.js';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import GeoInput from '../../elements/GeoInput/GeoInput';
import Events from '../../../services/Events/Events';
import RadiusInput from '../../elements/RadiusInput/RadiusInput';

export default class AddRestaurantPoint extends Component {
    constructor({classes, name}) {
        super(classes, {
            RestaurantName: name,
        });

        super.template = template;

        this.addContextData({
            RadiusInput: new CheckedInput({
                label: 'Радиус доставки',
                Input: new RadiusInput({
                    id: 'add-rest-point__rad-input',
                }),
            }),
            AddressInput: new CheckedInput({
                label: 'Адрес доставки',
                Input: new GeoInput('__add-rest-point'),
            }),
            Submit: new NeonButton({
                text: 'Добавить',
                id: 'add-rest-point__submit',
                callback: () => {
                    if (!this.context.AddressInput.isValid()) return;
                    if (!this.context.RadiusInput.isValid()) return;

                    const body = {
                        address: this.context.AddressInput.value(),
                        radius: parseFloat(this.context.RadiusInput.value()),
                    };
                    EventBus.broadcast(Events.addRestaurantPoint, body);
                },
            }),
        });
    }

    bind() {
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
                configurable: true,
            });

            new ymaps.SuggestView(input);
        }

        super.bind();
    }

    focusOnAddressInput() {
        this.context.AddressInput.focus();
    }
}
