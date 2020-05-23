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
        isDisabled,
        isChecked,
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
            isDisabled,
            isChecked,
        }, id);

        super.template = template;
    }

    bind() {
        if (this.domElement) {
            this.domElement.oninput = () => {
                EventBus.broadcast(Input.oninputEvent(this.id));
            };
        }
        super.bind();
    }

    unbind() {
        if (this.domElement) {
            this.domElement.oninput = null;
        }
        super.unbind();
    }

    static oninputEvent(idOrClass) {
        return 'input_' + idOrClass + '_ended';
    }

    check() {
        const inputElement = this.domElement;
        const errors = [];
        const validity = inputElement.validity;
        const isValid = validity.valid;

        if (isValid) return '';

        if (validity.valueMissing) {
            errors.push('Обязательное поле');
        }

        /*
         * If (validity.typeMismatch) {
         *     errors.push('Неверный тип');
         * }
         */

        if (validity.patternMismatch) {
            errors.push('Неверный формат');
        }

        if (validity.tooLong) {
            errors.push(`Максимальная длина: ${inputElement.maxLength}`);
        }

        if (validity.tooShort) {
            errors.push(`Минимальная длина: ${inputElement.minLength}`);
        }

        if (validity.rangeUnderflow) {
            errors.push(`Минимальное значение: ${inputElement.min}`);
        }

        if (validity.rangeOverflow) {
            errors.push(`Максимальное значение: ${inputElement.max}`);
        }

        if (validity.stepMismatch) {
            errors.push(`Знчечение должно иметь шаг ${inputElement.step}`);
        }

        if (validity.badInput) {
            errors.push('Ввод не может правильно распознаться браузером');
        }

        if (validity.customError) {
            errors.push('Такого быть не должно, туши свет...');
        }

        if (errors.length === 0) {
            return '';
        }

        return errors.join('\n');
    }

    correct() {
        void 0;
    }

    isValid() {
        return this.check() === '';
    }

    focus() {
        this.domElement.focus();
    }
}
