import Component from '../../Component.js';
import template from './Input.hbs';
import EventBus from '../../../services/Events/EventBus';

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
        minlength,
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
            minlength,
        }, id);

        super.template = template;
    }

    bind() {
        if (this.domElement) {
            this.domElement.oninput = () => {
                EventBus.publish(Input.oninputEvent(this.id));
            };
        }
        super.bind();
    }

    unbind() {
        if (this.domElement) {
            this.domElement.oninput = () => {
                EventBus.publish(Input.oninputEvent(this.id));
            };
        }
        super.unbind();
    }

    static oninputEvent(idOrClass) {
        return 'input_' + idOrClass + '_ended';
    }
}
