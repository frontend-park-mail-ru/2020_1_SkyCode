import Component from '../../Component';
import template from './Textarea.hbs';

class Textarea extends Component {
    constructor({
        classes,
        isRequired,
        palceholder,
        maxLength,
        minLength,
        id,
    }) {
        super(classes, {
            isRequired,
            palceholder,
            maxLength,
            minLength,
        }, id, template);
    }
}

export default Textarea;
