export default class Validation {
    static inputValidation(inputComponent, errFieldComponent) {
        let [isValid, errors] = this.inputCheck(inputComponent.domElement);

        this.showErrors(errFieldComponent, errors);
        return isValid;
    }

    static inputCheck(inputElement) {
        let errors = Array();
        let validity = inputElement.validity;
        let isValid = validity.valid;

        if (isValid) return [true, errors];

        if (validity.valueMissing){
            errors.push('Required field');
        }

        if (validity.patternMismatch){
            errors.push('Wrong format');
        }

        if (validity.tooLong){
            errors.push(`Must be less than ${inputElement.maxLength} symbols`);
        }

        return [false, errors];
    }

    static showErrors(errComponent, errors) {
        errComponent.replaceMessage(errors.join('\n'));
    }
}
