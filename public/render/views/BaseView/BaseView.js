import Component from '../../Component';
import Header from '../../blocks/header/Header.js';


export default class BaseView extends Component {
    constructor({MainArea, RightSideBar}) {
        const Header = new Header();
        const LeftSideBar = new LeftMenue();
        super('base-view', {
            Header,
            LeftSideBar,
            RightSideBar,
            MainArea,
        });
    }
}
