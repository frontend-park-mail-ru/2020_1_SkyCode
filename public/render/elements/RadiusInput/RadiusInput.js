import Input from '../input/Input';

export default class RadiusInput extends Input {
    constructor({classes, id}) {
        super({
            type: 'text',
            classes,
            id,
            // placeholder: 'в километрах',
        });
    }

    check() {
        const value = parseFloat(this.domElement.value);
        if (isFinite(value)) return '';
        return 'Ожидается вещественное число';
    }
}
