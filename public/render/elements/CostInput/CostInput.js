import Input from '../input/Input';

export default class CostInput extends Input {
    constructor({
        id,
        classes,
        max,
        isRequired,
        placeholder,
    }) {
        super({
            type: 'text',
            id,
            classes,
            max,
            isRequired,
            placeholder,
        });
    }

    check() {
        if (super.context.isRequired && this.domElement.value === '') return 'Обязательное поле';
        if (!isFinite(parseFloat(this.domElement.value))) return 'Ожидается'
            + ' вещественное число';
        return '';
    }
}
