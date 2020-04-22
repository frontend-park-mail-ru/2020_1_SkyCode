import Component from '../../Component.js';
import template from './RestaurantFeedbackCard.hbs';

export default class RestaurantFeedbackCard extends Component {
    constructor({classes, name, rate, text, date}) {
        super(classes, {
            Name: name,
            Rate: rate,
            Text: text,
            Date: date,
        });

        super.template = template;
    }
}
