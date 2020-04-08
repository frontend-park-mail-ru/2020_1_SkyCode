import Component from '../../Component.js';
import template from './Action.hbs';

export default class Action extends Component {
    constructor({classes = 'action', href, src, alt = 'default alt'}) {
        super(classes, {
            href,
            src,
            alt,
        });
        
        super.template = template;
    }
}
