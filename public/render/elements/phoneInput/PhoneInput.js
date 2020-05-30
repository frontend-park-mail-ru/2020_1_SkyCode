import Input from '../input/Input.js';

export default class PhoneInput extends Input {
    constructor({classes, id, isRequired, value}) {
        super({
            classes,
            id,
            isRequired,
            value,
            placeholder: '8(800)555-35-35',
            type: 'tel',
            pattern: '\\d\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}',
        });

        this.lastLength = 0;
    }

    correct() {
        const additionSymbolsMap = {
            1: '(',
            5: ')',
            9: '-',
            12: '-',
        };

        let value = this.domElement.value;

        // Вводить можно только числа
        if (isNaN(Number(value.slice(-1)))) {
            this.domElement.value = value.slice(0, -1);
            return;
        }

        // Удаляем все дополнительные символы
        for (let i = 0; i < value.length; i++) {
            if (isNaN(Number(value[i]))) {
                value = value.slice(0, i) + value.slice(i + 1);
                i--;
            }
        }

        // Если символы были добавлены
        let newValue = value.slice(0, 1) + additionSymbolsMap[1]
                + value.slice(1, 4) + additionSymbolsMap[5]
                + value.slice(4, 7) + additionSymbolsMap[9]
                + value.slice(7, 9) + additionSymbolsMap[12]
                + value.slice(9, 11);

        // Если были добавлены лишние дополнительные символы
        while (isNaN(Number(newValue.slice(-1)))) {
            newValue = newValue.slice(0, -1);
        }

        if (this.lastLength < newValue.length) {
            for (const i in additionSymbolsMap) {
                if (newValue.length === Number(i)) {
                    newValue += additionSymbolsMap[i];
                    break;
                }
            }
        }

        this.lastLength = newValue.length;
        this.domElement.value = newValue;
    }

    check() {
        const length = this.domElement.value.length;
        if (length === 15) {
            return '';
        } else if (length === 0) {
            return 'Обязательное поле';
        }
        return 'Номер набран не полностью';
    }
}
