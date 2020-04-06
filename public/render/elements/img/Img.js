import Component from '../../Component.js';
import template from './Img.hbs';

export default class Img extends Component {
    constructor({classes, src, alt}) {
        super(classes, {
            src,
            alt,
        });

        super.template = template;
    }
}
