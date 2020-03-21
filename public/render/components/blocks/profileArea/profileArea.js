import Block from "../../../Block.js";
import href from '../../elements/href/href.js';

class profileArea extends Block {
    constructor({user} = {}) {
        super();
        this.addTemplateData({
            logout: new href({
                text: 'log out',
                href: '/logout',
                classes: 'profile-area__logout',
            }),

            login: new href({
                text: 'log in',
                href: '/login',
                classes: 'profile-area__login',
            }),

            signup: new href({
                text: 'sign up',
                href: '/signup',
                classes: 'profile-area__signup',
            }),
        }, true);

        this.addTemplateData({
            user: user,
        }, false);
    }
}

export default profileArea;