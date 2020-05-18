import Component from '../../Component.js';
import template from './BaseView.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class BaseView extends Component {
    constructor({
        Main,
        Header,
        LeftBar,
        AddOnes,
    } = {}) {
        super();
        this.addContextData({
            Header,
            LeftBar,
            Main,
            AddOnes,
        });
        this.template = template;
    }

    bind() {
        let active = false;
        EventBus.subscribe('order-button-clicked', () => {
            const newWidth = (active) ? '100%' : 'calc(100% - 305px)';
            document.getElementsByClassName('base-container')[0]
                .style.width = newWidth;
            active = !active;
        });
        super.bind();
    }

    unbind() {
        EventBus.unsubscribe('order-button-clicked', () => {
            const newWidth = (active) ? '100%' : 'calc(100% - 270px)';
            document.getElementsByClassName('base-container')[0]
                .style.width = newWidth;
            active = !active;
        });

        super.unbind();
    }
}
