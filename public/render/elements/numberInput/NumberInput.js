import Component from '../../Component.js';
import template from './NumberInput.hbs';
import Input from '../input/Input';
import Button from '../button/Button';
import EventBus from '../../../services/Events/EventBus';

const changeEventSuffix = '-number-input-changed';

export default class NumberInput extends Component {
    constructor({
        classes,
        id,
        min,
        max,
        changeEventBasis,
        value = min,
        isVertical = false,
    }) {
        let inputClasses = 'number-input__input';
        let plusButtonClasses = 'number-input__plus-button';
        let minusButtonClasses = 'number-input__minus-button';
        const addition = isVertical ? '-vertical' : '-horizontal';

        classes += ' ' + 'feedback-form' + addition;

        // Добавление ко всем классам нужного суффикса
        [inputClasses, plusButtonClasses, minusButtonClasses]
        = [inputClasses, plusButtonClasses, minusButtonClasses]
                .map((string) => string + addition);

        // Добавление ко всем классам нужных доп классов
        [inputClasses, plusButtonClasses, minusButtonClasses]
        = [inputClasses, plusButtonClasses, minusButtonClasses]
                .map((string) => string
                    + ' '
                    + 'number-input__internals'
                    + ' '
                    + 'number-input__internals'
                    + addition);

        super(classes, {
            Input: new Input({
                type: 'number',
                classes: inputClasses,
                id,
                max,
                min,
                value,
            }),
            isVertical,
        });
        super.template = template;
        this.addContextData({
            PlusButton: new Button({
                text: '+',
                classes: plusButtonClasses,
                callback: () => {
                    let value = Number(this.context.Input.domElement.value);
                    if (max <= value) {
                        return;
                    }

                    value++;

                    this.context.Input.domElement.value = value;
                    EventBus.publish(
                        NumberInput.changeEvent(this.changeEventBasis),
                        value,
                    );
                },
            }),

            MinusButton: new Button({
                text: '-',
                classes: minusButtonClasses,
                callback: () => {
                    let value = Number(this.context.Input.domElement.value);
                    if (min >= value) {
                        return;
                    }

                    value--;

                    this.context.Input.domElement.value = value;
                    EventBus.publish(
                        NumberInput.changeEvent(this.changeEventBasis),
                        value,
                    );
                },
            }),
        });

        this.changeEventBasis = changeEventBasis;
    }

    getValue() {
        return this.context.Input.domElement.value;
    }

    static changeEvent(basis) {
        return basis
            + changeEventSuffix;
    }
}
