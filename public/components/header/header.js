import {Logo} from '../general/logo/logo.js';
import {Nav} from '../general/nav/nav.js';
import {Location} from '../general/location/location.js';
import EventBus from '../../services/EventBus.js';

class Header {
    constructor() {
        this.menuElements = {
            login: 'Log In',
            signup: 'Sign Up',
        };
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        EventBus.subscribe('updateUser', this.updateUser);
        EventBus.subscribe('deleteUser', this.deleteUser);
    }

    static getInstance() {
        if (!Header.instance) {
            Header.instance = new Header();
        }
        return Header.instance;
    }

    updateUser(user) {
        if (!user) {
            return;
        }

        this.menuElements = {
            logout: 'Log Out',
            profile: 'Profile',
            restaurant: 'Restaurant',
        };
    }

    deleteUser(user) {
        if (!user) {
            return;
        }

        this.menuElements = {
            login: 'Log In',
            signup: 'Sign Up',
        };
    }

    render() {
        const logo = new Logo().render();
        const nav = new Nav().render(this.menuElements);
        const location = new Location().render();

        const template = '<header class="header">' + logo + nav + location + '</header>';
        const compileTemplate = Handlebars.compile(template);

        return compileTemplate({});
    }
}

export default Header;
