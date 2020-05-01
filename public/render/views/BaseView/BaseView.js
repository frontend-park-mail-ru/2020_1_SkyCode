import Component from '../../Component.js';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader.js';
import template from './BaseView.hbs';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue.js';

export default class BaseView extends Component {
    constructor({
        MainArea,
        Header = new IconedHeader(),
        LeftBar = new WavingMenue(),
    }) {
        super();
        this.addContextData({
            Header,
            LeftBar,
            MainArea,
        });
        super.template = template;
    }
}
