import Component from '../../Component.js';
import Header from '../header/Header.js';
import IconBar from '../iconBar/IconBar.js';
import template from './IconedHeader.hbs';

export default class IconedHeader extends Component {
    constructor({
        headerClasses = 'iconed-header__header',
        iconsClasses = 'iconed-header__icon-bar'} = {},
    ) {
        super('', {
            Header: new Header({classes: headerClasses}),
            Icons: new IconBar({classes: iconsClasses}),
        });
        super.template = template;
    }
}
