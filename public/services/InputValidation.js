export default class Validation {
    static inputValidation(inputComponent, errFieldComponent) {
        const [isValid, errors] = this.inputCheck(inputComponent.domElement);
        this.showErrors(errFieldComponent, errors);
        return isValid;
    }

    static inputCheck(inputElement) {
        const errors = [];
        const validity = inputElement.validity;
        const isValid = validity.valid;

        if (isValid) return [true, errors];

        if (validity.valueMissing) {
            errors.push('Обязательное поле');
        }

        if (validity.typeMismatch) {
            errors.push('Неверный тип');
        }

        if (validity.patternMismatch) {
            errors.push('Неверный формат');
        }

        if (validity.tooLong) {
            errors.push(`Длина должна быть меньше ${inputElement.maxLength} символов`);
        }

        if (validity.tooShort) {
            errors.push(`Длина должна быть больше ${inputElement.minLength} символов`);
        }

        if (validity.rangeUnderflow) {
            errors.push(`Значение должно быть больше ${inputElement.min}`);
        }

        if (validity.rangeOverflow) {
            errors.push(`Значение должно быть меньше ${inputElement.max}`);
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

        return [false, errors];
    }

    static showErrors(errComponent, errors) {
        errComponent.replaceMessage(errors.join('\n'));
    }
}
