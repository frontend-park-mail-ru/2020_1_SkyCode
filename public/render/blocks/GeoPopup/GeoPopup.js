import Component from '../../Component';
import LoginField from '../loginField/LoginField';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import temp from './GeoPopup.hbs';
import GeoInput from '../../elements/GeoInput/GeoInput';
import CheckedInput from '../../elements/checkedInput/CheckedInput';
import NeonButton from '../../elements/neonButton/NeonButton';


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
                    EventBus.publish(Events.successGeo);
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

        EventBus.subscribe(Events.geoConfirmationRequest, this.confirmAppear.bind(this));
        EventBus.subscribe(Events.stopGeoConfirmation, this.confirmDisappear.bind(this));
        EventBus.subscribe(Events.successGeo, this.disappear.bind(this));
        EventBus.subscribe(Events.geoRequest, this.appear.bind(this));
        document.getElementsByClassName('geo-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        EventBus.unsubscribe(Events.geoRequest, this.appear.bind(this));
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
            const suggestView = new ymaps.SuggestView('alone_geo-input');
        }
    }

    disappear() {
        if (this.isStatic) {
            this.isStatic = false;
            this.becomeNotStatic();
        }
        this.domElement.style.display = 'none';
        EventBus.publish(Events.geoPopDisappear);
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
