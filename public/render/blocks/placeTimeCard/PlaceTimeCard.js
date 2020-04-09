import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import template from './PlaceTimeCard.hbs';

export default class PlaceTimeCard extends Component {
    constructor({
        classes = 'place-time-card',
        place = 'ул. Ломономова, 23',
        time = '35 мин.',
    }) {
        super(classes, {
            place,
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
}
