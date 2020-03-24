import Block from '../../Block.js';
import action from '../action/action.js';

export default class actionBar extends Block{
    constructor({classes = 'action-bar', actionArr}) {
        super();
        this.addClasses(classes);

        let actions = [];
        for (let actionData of actionArr) {
            actions.push(new action({
                classes: 'action-bar__action',
                href: actionData.href,
                src: actionData.src,
                alt: actionData.alt,
            }));
        }

        this.addTemplateData({actions}, true);
    }
}