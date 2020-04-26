import Component from '../../Component.js';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader.js';
import template from './BaseView.hbs';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue.js';

export default class BaseView extends Component {
    constructor() {
        const Header = new IconedHeader();
        const LeftBar = new WavingMenue({});

        super('', {
            Header,
            LeftBar,
            // RightSideBar,
            // MainArea,
        });
        super.template = template;
    }
}
