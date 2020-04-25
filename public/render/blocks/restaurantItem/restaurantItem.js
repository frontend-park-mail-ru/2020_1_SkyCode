import Component from '../../Component.js';
import template from './restaurantItem.hbs';

export default class RestaurantItem extends Component {
    constructor({classes, name, id, callback}) {
        super(classes, {
            Name: name,
            Id: id,
        }, id);
        super.template = template;
        this.callback = callback;
    }

    bind() {
        const node = super.domElement;
        if (node === undefined || this.callback === undefined) {
            return;
        }

        node.onclick = this.callback;
    }

    unbind() {
        const node = super.domElement;
        if (node  === undefined) {
            return;
        }

        node.onclick = null;
    }
}
