import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import template from './PlaceTimeCard.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class PlaceTimeCard extends Component {
    constructor({
        classes = 'place-time-card',
        place = 'Введите адрес',
        time = '35 мин.',
    }) {
        super(classes, {
            place: localStorage.getItem('deliveryGeo'),
            time,
            changePlaceButton: new Input({
                type: 'image',
                classes: 'place-time-card__change-place-button',
                src: '/static/edit.svg',
            }),
            changeTimeButton: new Input({
                type: 'image',
                classes: 'place-time-card__change-time-button',
                src: '/static/clock.svg',
            }),
        });

        super.template = template;
    }

    bind() {
        EventBus.subscribe(Events.successGeo, () => {
            this.context.place = localStorage.getItem('deliveryGeo');
            document.getElementsByClassName('place-time-card__place-text')[0]
                .innerHTML = localStorage.getItem('deliveryGeo');
        });
        // eslint-disable-next-line max-len
        document.getElementsByClassName('place-time-card__change-place-button')[0].addEventListener('click', (e) => {
            e.preventDefault();
            EventBus.publish(Events.geoRequest);
        });
        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(Events.successGeo, () => {
            this.context.place = localStorage.getItem('deliveryGeo');
            document.getElementsByClassName('place-time-card__place-text')[0]
                .innerHTML = localStorage.getItem('deliveryGeo');
        });
        // eslint-disable-next-line max-len
        document.getElementsByClassName('place-time-card__change-place-button')[0].addEventListener('click', (e) => {
            e.preventDefault();
            EventBus.publish(Events.geoRequest);
        });
        super.unbind();
    }
}
