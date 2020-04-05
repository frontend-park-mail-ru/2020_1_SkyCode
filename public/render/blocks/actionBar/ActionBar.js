import Component from '../../Component.js';
import Action from '../action/Action.js';

export default class ActionBar extends Component {
    constructor({classes = 'action-bar', actionArr}) {
        super();
        this.addClasses(classes);

        const actions = [];
        for (const actionData of actionArr) {
            actions.push(new Action({
                classes: 'action-bar__action',
                src: actionData.src,
                alt: actionData.alt,
            }));
        }

        this.addContextData({actions}, true);
    }
}
