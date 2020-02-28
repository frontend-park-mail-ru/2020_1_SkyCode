

export default class Validation {
    static validationCheck() {
        let valid = true;
        let isValid, messages;
        let f = document.getElementsByTagName('form')[0];

        for (let i of f.elements){
            if (i !== f.lastElementChild){
                [isValid, messages] = Validation.inputCheck(i);

                if (!isValid){
                    console.log(messages);
                    console.log(i);

                    Validation.setErrors(i, ...messages);
                    valid = false;
                } else {
                    Validation.setErrors(i, '');
                }
            }
        }

        return valid;
    }

    static inputCheck(input) {
        let invalidates = Array();
        let validity = input.validity;
        let isValid = validity.valid;

        if (input.type === 'email') {
            let isOk = input.value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
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

    static setErrors(input, ...messages) {
        let errFieldName = input.name + '__err';
        let errField = document.getElementsByClassName(errFieldName)[0];
        errField.innerHTML = messages.join('\n') + '\n';
    }

    static setError(errClass, ...messages) {
        let errField = document.getElementsByClassName(errClass)[0];
        errField.innerHTML = messages.join('\n') + '\n';
    }
}
