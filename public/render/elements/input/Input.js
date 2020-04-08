import Component from '../../Component.js';
import template from './Input.hbs';

export default class Input extends Component {
    constructor({
        type,
        placeholder,
        classes = 'input',
        src,
        max,
        min,
        id,
        value,
        isRequired,
        pattern,
        maxlength,
    }) {
        super(classes, {
            src,
            type,
            placeholder,
            min,
            max,
            value,
            isRequired,
            pattern,
            maxlength,
        }, id);

        super.template = template;
    }
}
