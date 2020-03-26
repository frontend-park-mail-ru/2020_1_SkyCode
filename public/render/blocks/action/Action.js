import Component from '../../Component.js';

export default class Action extends Component {
    constructor({classes = 'action', href, src, alt = 'default alt'}) {
        super();
        this.addClasses(classes);
        this.addContextData({
            href,
            src,
            alt
        }, false);
    }
}