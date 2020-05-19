import Component from '../../Component.js';
import ProfileTextArea from '../../blocks/profileTextArea/ProfileTextArea.js';
import template from './ProfileView.hbs';
import BaseView from '../BaseView/BaseView';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import ProfileHeader from '../../blocks/profileHeader/ProfileHeader';


export default class
ProfileView extends BaseView {
    constructor({profile}) {
        super({
            Main: new MainArea({profile}),
            Header: new ProfileHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
        });
    }
}

class MainArea extends Component {
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
