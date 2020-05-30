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

export default Textarea;
