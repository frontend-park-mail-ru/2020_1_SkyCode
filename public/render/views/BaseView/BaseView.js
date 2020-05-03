import Component from '../../Component.js';
import template from './BaseView.hbs';

export default class BaseView extends Component {
    constructor({
        Main,
        Header,
        LeftBar,
        AddOnes,
    } = {}) {
        super();
        this.addContextData({
            Header,
            LeftBar,
            Main,
            AddOnes,
        });
        this.template = template;
    }
}
