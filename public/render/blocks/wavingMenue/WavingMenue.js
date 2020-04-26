import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './WavingMenue.hbs';

export default class WavingMenue extends Component {
    constructor({classes}) {
        classes = classes || 'waving-menue';
        super(classes);
        this.invisible = true;
        super.template = template;
    }

    bind() {
        EventBus.subscribe('hamburger-button-clicked', () => {
            if (this.invisible) {
                this.domElement.style.left = '0';
                this.invisible = false;
            } else {
                this.domElement.style.left = '-5000px';
                this.invisible = true;
            }
        });

        super.bind();
    }

    unbind() {
        EventBus.unsubscribe('hamburger-button-clicked', () => {
            if (this.invisible) {
                this.domElement.style.left = '0';
                this.invisible = false;
            } else {
                this.domElement.style.left = '-5000';
                this.invisible = true;
            }
        });

        super.bind();
    }
}
