import Component from '../../Component';
import template from './Textarea.hbs';

class Textarea extends Component {
    constructor({
        classes,
        isRequired,
        palceholder,
        maxLength,
        minLength,
        disabled = false,
        value,
        id,
    }) {
        super(classes, {
            isRequired,
            palceholder,
            maxLength,
            minLength,
            disabled,
            value,
        }, id, template);
    }
}

export default Textarea;
