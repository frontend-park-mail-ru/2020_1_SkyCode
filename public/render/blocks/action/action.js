import Component from '../../Component.js';

// В actionData должны присутствовать href, src, alt
export default class Action extends Component {
    constructor({classes = 'action', href, src, alt = 'default alt'}) {
        super();
        this.addClasses(classes);
        this.addTemplateData({
            href,
            src,
            alt
        }, false);
    }
}