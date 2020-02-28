

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

                    Validation.showErrors(i, messages);
                    valid = false;
                }
            }
        }

        return valid;
    }

    static inputCheck(input) {
        let invalidates = Array();
        let validity = input.validity;
        if (validity.valid) return [true, invalidates];

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

    static showErrors(input, messages) {
        let errFieldName = input.name + '__err';
        let errField = document.getElementsByClassName(errFieldName)[0];
        errField.innerHTML = messages.join('\n') + '\n';
    }
}
