import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import template from './SearchField.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class SearchField extends Component {
    constructor({classes = 'search-field'}) {
        super();

        super.template = template;

        this.addClasses(classes);
        this.addContextData({
            inputButton: new Input({
                type: 'image',
                src: '/static/map-pin.svg',
                classes: 'search-field__input-button',
                isReadonly: true,
            }),
            inputField: new Input({
                type: 'text',
                placeholder: 'Изменить адрес доставки',
                classes: 'search-field__input-field',
                isReadonly: true,
                value: localStorage.getItem('deliveryGeo'),
            }),
        }, true);
    }

    bind() {
        const me = this.domElement;
        if (me === undefined) return;

        me.getElementsByClassName(
            'search-field__input-button',
        )[0].onclick = () => EventBus.broadcast(Events.geoRequest);

        me.getElementsByClassName(
            'search-field__input-field',
        )[0].onclick = () => EventBus.broadcast(Events.geoRequest);

        this.addUnbind(
            EventBus.subscribe(Events.successGeo, this.successGeoHandler.bind(this)),
        );
        super.bind();
    }

    successGeoHandler() {
        this.context.inputField.domElement.value = localStorage.getItem('deliveryGeo');
    }

    unbind() {
        const me = this.domElement;
        if (me === undefined) return;

        me.getElementsByClassName(
            'search-field__input-button',
        )[0].onclick = null;

        me.getElementsByClassName(
            'search-field__input-field',
        )[0].onclick = null;

        super.unbind();
    }
}
