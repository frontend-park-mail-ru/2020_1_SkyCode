import Input from '../input/Input';

export default class RadiusInput extends Input {
    constructor({classes, id}) {
        super({
            type: 'text',
            classes,
            id,
            isRequired: true,
        });
    }

    check() {
        const value = parseFloat(this.domElement.value);
        if (isFinite(value)) return '';
        return 'Ожидается вещественное число';
    }
}
