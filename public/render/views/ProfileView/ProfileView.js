import Component from '../../Component.js';
import ProfileTextArea from '../../blocks/profileTextArea/ProfileTextArea.js';
import template from './ProfileView.hbs';

export default class ProfileView extends Component {
    constructor({profile}) {
        super();
        this.addContextData({
            ProfileTextArea: new ProfileTextArea({
                classes: 'profile-view__profile-area',
                data: profile,
            }),
        });

        super.template = template;
    }
}
