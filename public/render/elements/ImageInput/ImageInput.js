import temp from './ImageInput.hbs';
import Component from '../../Component';


const fileTypes = [
    'image/jpeg',
    'image/jpeg',
    'image/png',
    'image/svg',
];

function validFileType(file) {
    for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }

    return false;
}

export default class ImageInput extends Component {
    constructor({
        id,
        classes,
        isRequired,
    }) {
        super(classes, {
            type: 'file',
        }, id, temp);

        this.isRequired = isRequired;
    }

    check() {
        if (this.domElement.files.length === 0) return 'Изображение' +
            ' обязательно';
        if (!validFileType(this.value())) return 'Выберите изображение (.png,'
            + ' .jpg)';
        return '';
    }

    imageElement() {
        return document.getElementById('img-input__image');
    }

    labelElement() {
        return document.getElementById('img-input__label');
    }

    errorElement() {
        return document.getElementById('img-input__error');
    }

    value() {
        return this.domElement.files[0];
    }

    bind() {
        this.domElement.onchange = () => {
            const error = this.check();
            this.errorElement().innerHTML = error;
            if (error !== '') return;

            const innterHtml = this.labelElement().innerHTML;
            this.labelElement().innerHTML = `"${this.value().name}"`
                + innterHtml.slice(innterHtml.indexOf('<'));
        };

        super.bind();
    }

    isValid() {
        const error = this.check();
        this.errorElement().innerHTML = error;
        return error === '';
    }
}