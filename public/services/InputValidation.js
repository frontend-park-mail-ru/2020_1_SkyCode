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
            errors.push('Required field');
        }

        if (validity.typeMismatch) {
            errors.push('Wrong type');
        }

        if (validity.patternMismatch) {
            errors.push('Wrong format');
        }

        if (validity.tooLong) {
            errors.push(`Must be less than ${inputElement.maxLength} symbols`);
        }

        if (validity.tooShort) {
            errors.push(`Must be more than ${inputElement.minLength} symbols`);
        }

        if (validity.rangeUnderflow) {
            errors.push(`Must be more than ${inputElement.min}`);
        }

        if (validity.rangeOverflow) {
            errors.push(`Must be less than ${inputElement.max}`);
        }

        if (validity.stepMismatch) {
            errors.push(`Must have step ${inputElement.step}`);
        }

        if (validity.badInput) {
            errors.push('Browser can\'t convert your input');
        }

        if (validity.customError) {
            errors.push('unexpected error... lights off... ');
        }

        return [false, errors];
    }

    static showErrors(errComponent, errors) {
        errComponent.replaceMessage(errors.join('\n'));
    }
}
