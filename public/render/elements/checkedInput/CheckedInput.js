import temp from './CheckedInput.hbs';
import Component from '../../Component';

export default class CheckedInput extends Component {
    constructor({Input, label}) {
        Input.addClasses('checked-input__input');
        super('', {
            Input,
            label,
        });

        this.timeoutId = null;
        this.id = Input.context.id + '-wrapper';
        this.template = temp;

        this.addContextData({
            errId: this.errFieldId(),
            labelId: this.labelFieldId(),
        });
    }

    bind() {
        this.context.Input.domElement.oninput = () => {
            this.context.Input.correct();

            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.errFieldElement().innerText = this.context.Input.check();
            }, 300);
        };

        this.context.Input.domElement.onblur = () => {
            this.errFieldElement().innerText = this.context.Input.check();
        };
    }

    isValid() {
        return this.context.Input.isValid();
    }

    value() {
        return this.context.Input.domElement.value;
    }

    errFieldElement() {
        return document.getElementById(this.errFieldId());
    }

    errFieldId() {
        return this.id + '_err';
    }

    labelFieldId() {
        return this.id + '_label';
    }

    unbind() {
        this.context.Input.domElement.oninput = null;
        this.context.Input.domElement.onblur = null;
    }
}
