import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './WavingMenue.hbs';

export default class WavingMenue extends Component {
    constructor({classes}) {
        classes = classes || 'waving-menue';
        super(classes);
        this.isVisible = false;
        super.template = template;
    }

    bind() {
        this.appear();
        EventBus.subscribe('hamburger-button-clicked', () => {
            if (this.isVisible) {
                this.disappear();
            } else {
                this.appear();
            }
        });

        super.bind();
        this.disappear();
    }

    unbind() {
        this.appear();
        EventBus.unsubscribe('hamburger-button-clicked', () => {
            if (this.isVisible) {
                this.disappear();
            } else {
                this.appear();
            }
        });

        super.bind();
        this.disappear();
    }

    appear() {
        if (!this.isVisible) {
            this.domElement.style.left = '0';
            this.isVisible = true;
        }
    }

    disappear() {
        if (this.isVisible) {
            this.domElement.style.left = '-5000px';
            this.isVisible = false;
        }
    }
}
