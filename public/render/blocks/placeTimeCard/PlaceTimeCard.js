import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';

export default class PlaceTimeCard extends Component {
    constructor({
        classes = 'place-time-card',
        place = '23, Lomonosova st.',
        time = '35 min.',
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
    }
}
