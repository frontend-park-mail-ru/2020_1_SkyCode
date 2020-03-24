import Component from '../../Component.js';
import Action from '../action/action.js';

export default class actionBar extends Component{
    constructor({classes = 'action-bar', actionArr}) {
        super();
        this.addClasses(classes);

        let actions = [];
        for (let actionData of actionArr) {
            actions.push(new Action({
                classes: 'action-bar__action',
                href: actionData.href,
                src: actionData.src,
                alt: actionData.alt,
            }));
        }

        this.addTemplateData({actions}, true);
    }
}