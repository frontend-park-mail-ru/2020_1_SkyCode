import Block from "../../../block.js";
import href from '../../elements/href/href.js';

class profileArea extends Block {
    constructor({user} = {}) {
        if (user) {
            super([
                new href({
                    text: 'log out',
                    href: '/logout',
                    classes: [
                        'profile-area__logout'
                    ]
                }),
            ]);
        } else {
            super([
                new href({
                    text: 'log in',
                    href: '/login',
                    classes: [
                        'profile-area__login'
                    ]
                }),
                new href({
                    text: 'sign up',
                    href: '/signup',
                    classes: [
                        'profile-area__signup'
                    ]
                }),
            ], []);
        }

        this.user = user;
    }
}

export default profileArea;