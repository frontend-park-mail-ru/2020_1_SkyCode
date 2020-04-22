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

        // Добавление ко всем классам нужного суффикса
        [classes, inputClasses, plusButtonClasses, minusButtonClasses]
        = [classes, inputClasses, plusButtonClasses, minusButtonClasses]
                .map((string) => string + addition);

        // Добавление ко всем классам нужных доп классов
        [classes, inputClasses, plusButtonClasses, minusButtonClasses]
        = [classes, inputClasses, plusButtonClasses, minusButtonClasses]
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
                    const value = this.context.Input.domElement.value;
                    if (max <= value) {
                        return;
                    }

                    this.context.Input.domElement.value += 1;
                    EventBus.publish(
                        NumberInput.changeEvent(this.changeEventBasis),
                        value + 1,
                    );
                },
            }),

            MinusButton: new Button({
                text: '-',
                classes: minusButtonClasses,
                callback: () => {
                    const value = this.context.Input.domElement.value;
                    if (min >= value) {
                        return;
                    }

                    this.context.Input.domElement.value -= 1;
                    EventBus.publish(
                        NumberInput.changeEvent(this.changeEventBasis),
                        value - 1,
                    );
                },
            }),
        });

        this.changeEventBasis = changeEventBasis;
    }

    static changeEvent(basis) {
        return basis
            + changeEventSuffix;
    }
}
