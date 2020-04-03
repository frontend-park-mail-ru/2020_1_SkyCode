import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import ProfileTextArea from '../../blocks/profileTextArea/ProfileTextArea.js';

export default class ProfileView extends Component {
    constructor({profile}) {
        super();
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            ProfileTextArea: new ProfileTextArea({
                classes: 'profile-view__profile-area',
                data: profile
            }),
        });
    }
}