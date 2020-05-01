import Component from '../../Component.js';
import template from './BaseView.hbs';

export default class BaseView extends Component {
    constructor({
        Main,
        Header,
        LeftBar,
    } = {}) {
        super();
        this.addContextData({
            Header,
            LeftBar,
            Main,
        });
        this.template = template;
    }
}
