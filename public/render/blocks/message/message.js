import Component from '../../Component.js';
import template from './message.hbs';

export default class Message extends Component {
    constructor(classes, message, user) {
        super();

        super.template = template;

        this.addClasses(classes);

        this.addContextData({
            text: message,
            user: user,
        });
    }
}

