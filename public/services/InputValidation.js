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

        // if (inputElement.type === 'email') {
        //     let isOk = inputElement.value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
        //     if (isOk === null) {
        //         errors.push('Not right email form');
        //         isValid = false;
        //     }
        // }

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
