import Component from '../../Component.js';
import template from './NumberInput.hbs';
import Input from '../input/Input';
import Button from '../button/Button';
import EventBus from '../../../services/Events/EventBus';

const plusEventSuffix = '-plus';
const minusEventSuffix = '-minus';
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
                id: id + '__input',
                max,
                min,
                value,
                isDisabled: true,
            }),
            isVertical,
        }, id, template);

        this.changedEvent = changeEventBasis;
        this.addContextData({
            PlusButton: new Button({
                id: id + '_plus-button',
                text: '+',
                classes: plusButtonClasses,
                callback: this.plus.bind(this),
            }),

            MinusButton: new Button({
                id: id + '_minus-button',
                text: '-',
                classes: minusButtonClasses,
                callback: this.minus.bind(this),
            }),
        });

        this.max = max;
        this.min = min;
    }

    quiteMinus() {
        let value = Number(this.context.Input.domElement.value);
        if (this.min >= value) {
            return;
        }

        value--;

        this.context.Input.domElement.value = value;
    }

    minus() {
        let value = Number(this.context.Input.domElement.value);
        if (this.min >= value) {
            return;
        }

        value--;

        this.context.Input.domElement.value = value;
        EventBus.publish(
            NumberInput.minusEvent(this.changedEvent),
            value,
        );
        EventBus.publish(
            NumberInput.changeEvent(this.changedEvent),
            value,
        );
    }

    quitePlus() {
        let value = Number(this.context.Input.domElement.value);
        if (this.max <= value) {
            return;
        }

        value++;

        this.context.Input.domElement.value = value;
    }

    plus() {
        let value = Number(this.context.Input.domElement.value);
        if (this.max <= value) {
            return;
        }

        value++;

        this.context.Input.domElement.value = value;
        EventBus.publish(
            NumberInput.plusEvent(this.changedEvent),
            value,
        );
        EventBus.publish(
            NumberInput.changeEvent(this.changedEvent),
            value,
        );
    }

    getValue() {
        return this.context.Input.domElement.value;
    }

    static changeEvent(basis, suffix = changeEventSuffix) {
        return basis
            + suffix;
    }

    static plusEvent(basis, suffix = plusEventSuffix) {
        return basis + suffix;
    }

    static minusEvent(basis, suffix = minusEventSuffix) {
        return basis + suffix;
    }
}
