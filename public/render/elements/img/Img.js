import Component from '../../Component.js';

export default class Img extends Component {
    constructor({classes, src, alt}) {
        super(classes, {
            src,
            alt,
        });
    }
}
