import Component from '../../Component';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import temp from './GeoPopup.hbs';
import GeoInput from '../../elements/GeoInput/GeoInput';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import NeonButton from '../../elements/neonButton/NeonButton';
import Router from '../../../routing/Router';


export default class GeoPopup extends Component {
    constructor() {
        super('geo-popup');
        this.addContextData({
            Input: new CheckedInput({
                Input: new GeoInput(),
                label: 'Введите адрес доставки',
            }),
            Submit: new NeonButton({
                text: 'Подтвердить',
                id: 'geo-popup-submit',
                callback: () => {
                    let isNewGeo = false;
                    if (localStorage.getItem('deliveryGeo') === null) {
                        isNewGeo = true;
                    }
                    localStorage.setItem(
                        'deliveryGeo',
                        sessionStorage.getItem('deliveryGeo'),
                    );
                    localStorage.setItem(
                        'latitude',
                        sessionStorage.getItem('latitude'),
                    );
                    localStorage.setItem(
                        'longitude',
                        sessionStorage.getItem('longitude'),
                    );
                    EventBus.broadcast(Events.successGeo);
                    if (!isNewGeo) {
                        Router.reload('Адрес доставки успешно изменён');
                    }
                },
            }),
        });

        this.template = temp;
        this.isStatic = false;
    }

    confirmDisappear() {
        this.context.Submit.domElement.style.display = 'none';
    }

    confirmAppear() {
        this.context.Submit.domElement.style.display = 'block';
    }

    bind() {
        this.confirmDisappear();

        this.addUnbind(
            EventBus.subscribe(Events.escButPressed, () => {
                if (!this.isStatic) {
                    this.disappear();
                }
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.geoConfirmationRequest, this.confirmAppear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.stopGeoConfirmation, this.confirmDisappear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.successGeo, this.disappear.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.geoRequest, this.appear.bind(this)),
        );
        document.getElementsByClassName('geo-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        document.getElementsByClassName('geo-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear({isStatic = false} = {}) {
        this.isStatic = isStatic;
        if (isStatic) this.becomeStatic();

        this.domElement.style.display = 'flex';
        ymaps.ready(init);
        function init() {
            const input = document.getElementById('alone_geo-input');
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
    }

    disappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }

        this.domElement.style.display = 'none';
        EventBus.broadcast(Events.geoPopDisappear);
    }

    quiteDisappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.display = 'none';
    }

    becomeStatic() {
        document.getElementsByClassName('geo-popup__hider')[0]
            .onclick = null;
    }

    becomeNotStatic() {
        document.getElementsByClassName('geo-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };
    }
}
