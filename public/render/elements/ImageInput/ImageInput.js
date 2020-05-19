import temp from './ImageInput.hbs';
import Component from '../../Component';

export default class ImageInput extends Component {
    constructor({
        id,
        classes,
    }) {
        super(classes, {
            type: 'file',
        }, id, temp);
    }

    check() {
        if (this.value === '') return 'Выберите изображение';
        if (this.value.type !== 'image') return 'Выбрано не изображение';
        return '';
    }
}
