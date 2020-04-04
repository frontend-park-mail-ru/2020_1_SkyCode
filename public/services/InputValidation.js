export default class Validation {
    static inputValidation(inputComponent, errFieldComponent) {
        let [isValid, errors] = this.inputCheck(inputComponent.domElement);
        if (isValid === true) {
            return true;
        }

        this.setErrors(errFieldComponent.domElement, errors);
        return false;
    }

    static inputCheck(inputElement) {
        let invalidates = Array();
        let validity = inputElement.validity;
        let isValid = validity.valid;

        if (inputElement.type === 'email') {
            let isOk = inputElement.value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
            if (isOk === null) {
                invalidates.push('Email does not match pattern');
                isValid = false;
            }
        }

        if (isValid) return [true, invalidates];

        if (validity.valueMissing){
            invalidates.push('Required field');
        }

        if (validity.patternMismatch){
            invalidates.push('Pattern mismatch');
        }

        if (validity.tooLong){
            invalidates.push('Must be less than 256 symbols');
        }

        return [false, invalidates];
    }

    static setErrors(errElement, errors) {
        errElement.innerHTML = errors.join('\n') + '\n';
    }
}
