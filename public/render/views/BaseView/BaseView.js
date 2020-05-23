import Component from '../../Component.js';
import template from './BaseView.hbs';
import EventBus from '../../../services/Events/EventBus';

export default class BaseView extends Component {
    constructor({
        Main,
    } = {}) {
        super();
        this.addContextData({
            Main,
        });
        this.template = template;
    }

    bind() {
        let active = false;
        this.addUnbind(
            EventBus.subscribe('order-button-clicked', () => {
                const newWidth = (active) ? '100%' : 'calc(100% - 305px)';
                document.getElementsByClassName('base-container')[0]
                    .style.width = newWidth;
                active = !active;
            }),
        );
        super.bind();
    }
}
