import Component from '../../Component.js';
import template from './RestaurantFeedbackCard.hbs';
import Textarea from '../../elements/textarea/Textarea';

export default class RestaurantFeedbackCard extends Component {
    constructor({classes, name, rate, text, date: timestamp}) {
        const time = timestamp.slice(11, 16);
        const date = timestamp.slice(0, 10);
        const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
        super(classes, {
            Name: name,
            Rate: strRate,
            Date: date,
            Time: time,
            Text: text,
        });

        super.template = template;
    }
}
