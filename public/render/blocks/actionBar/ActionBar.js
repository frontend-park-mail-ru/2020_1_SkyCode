import Component from '../../Component.js';
import Action from '../action/Action.js';

export default class ActionBar extends Component{
    constructor({classes = 'action-bar', actionArr}) {
        super();
        this.addClasses(classes);

        let actions = [];
        for (let actionData of actionArr) {
            actions.push(new Action({
                classes: 'action-bar__action',
                // href: actionData.href, нужно в будущем добавить гиперссылку или коллбек на нажатие
                src: actionData.src,
                alt: actionData.alt,
            }));
        }

        this.addContextData({actions}, true);
    }
}