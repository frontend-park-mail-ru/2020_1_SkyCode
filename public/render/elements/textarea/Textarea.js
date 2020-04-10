import Component from '../../Component';
import template from './Textarea.hbs';

class Textarea extends Component {
    constructor({
        classes,
        isRequired,
        palceholder,
        maxLength,
        value,
        id,
    }) {
        super(classes, {
            isRequired,
            palceholder,
            value,
            maxLength,
        }, id, template);
    }
}

export default Textarea;
