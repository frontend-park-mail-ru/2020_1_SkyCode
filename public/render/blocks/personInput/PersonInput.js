import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import Button from '../../elements/button/Button.js';

export default class PersonInput extends Component {
    constructor({classes, label, personNum = 1}) {
        super(classes, {
            label,
            input: new Input({
                id: 'person-input__number-input',
                type: 'number',
                classes: 'person-input__input',
                value: personNum,
                min: 1,
                max: 1000,
            }),
        });

        const incrementCallback = (add) => () => {
            const input = this.context.input.domElement;
            const setValue = Number(input.value) + add;

            if (input.min <= setValue && setValue <= input.max) {
                input.value = setValue;
            }
        };

        this.addContextData({
            minusButton: new Button({
                id: 'person-input__minus-button',
                classes: 'person-input__minus-button',
                text: '-',
                callback: incrementCallback(-1),
            }),
            plusButton: new Button({
                id: 'person-input__plus-button',
                classes: 'person-input__plus-button',
                text: '+',
                callback: incrementCallback(1),
            }),
        });
    }
}
