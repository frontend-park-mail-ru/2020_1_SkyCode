import Component from '../../Component.js';
import template from './RestaurantFeedbackCard.hbs';
import Textarea from '../../elements/textarea/Textarea';

export default class RestaurantFeedbackCard extends Component {
    constructor({classes, name, rate, text, date}) {
        const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
        super(classes, {
            Name: name,
            Rate: strRate,
            Date: date,
            Text: text,
        });

        super.template = template;
    }
}
