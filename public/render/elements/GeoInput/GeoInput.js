import MapModel from '../../../models/MapModel';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import Component from '../../Component';
import temp from './GeoInput.hbs';

export default class GeoInput extends Component {
    constructor(idSuffix = '') {
        super('geo-input__input', {
            type: 'text',
            isRequired: true,
            placeholder: 'с точностью до дома',
        }, GeoInput.id(idSuffix), temp);

        this.id = GeoInput.id(idSuffix);
        this._isValid = false;
        this.last = 0;
    }

    correct() {
        /*
         * Const element = document.getElementById(this.id);
         * const address = element.innerText
         *     .replace(/\s+/g, ' ')
         *     .trim()
         *     .replace(/\s+/g, '\n');
         * const len = address.length;
         *
         * element.innerText = address;
         * setTimeout(() => {
         *     console.log(element.selectionStart);
         *     console.log(element.selectionEnd);
         *
         *     element.selectionStart = 0;
         *     element.selectionEnd = len;
         * }, 1000);
         */
    }

    get value() {
        return document.getElementById(this.id).innerText;
    }

    set value(val) {
        document.getElementById(this.id).innerText = val;
    }

    check() {
        const address = document.getElementById(this.id).innerText
            .replace(/\s+/g, ' ').trim();

        if (address.length === 0) {
            return 'Обязательное поле';
        }

        MapModel
            .getCoordinates(address)
            .then((response) => {
                if (response.geopos) {
                    this.geopos = response.geopos;
                    sessionStorage.setItem('deliveryGeo', address);
                    sessionStorage.setItem('latitude', this.geopos.latitude);
                    sessionStorage.setItem('longitude', this.geopos.longitude);
                    this._isValid = true;
                    EventBus.broadcast(Events.geoConfirmationRequest);
                } else {
                    EventBus.broadcast(Events.stopGeoConfirmation);
                    document.getElementById(this.contextParent.errFieldId())
                        .innerText = 'с точностью до дома';
                }
            });

        return this._isValid ? '' : 'с точностью до дома';
    }

    static id(suffix) {
        return 'alone_geo-input' + suffix;
    }

    isValid() {
        return this._isValid;
    }

    bind() {
        this.domElement.addEventListener('input', (e) => {
            const len = this.domElement.value.length;

            if (len - this.last > 1) {
                e.stopPropagation();
                e.preventDefault();
            }

            this.last = len;
        }, true);


        super.bind();
    }

    unbind() {
        this.domElement.oninput = null;
        EventBus.broadcast(Events.stopGeoConfirmation);
        super.unbind();
    }
}
