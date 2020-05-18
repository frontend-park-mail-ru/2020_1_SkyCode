import Component from '../../Component';
import temp from './tagCheckbox.hbs';

export default class TagCheckbox extends Component {
    constructor({tagModel}) {
        super('', {
            name: tagModel.name,
            src: tagModel.image,
        }, tagModel.id, temp);
    }
}
