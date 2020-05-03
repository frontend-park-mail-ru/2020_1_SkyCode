import Component from '../../Component.js';
import Header from '../header/Header.js';
import IconBar from '../iconBar/IconBar.js';
import template from './IconedHeader.hbs';

export default class IconedHeader extends Component {
    constructor({
        classes,
        HeaderComponent = new Header(),
        Icons = new IconBar(),
    } = {},
    ) {
        super(classes, {
            Header: HeaderComponent,
            Icons,
        });
        super.template = template;
    }
}
