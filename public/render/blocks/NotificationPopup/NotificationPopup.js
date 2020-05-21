import Component from '../../Component';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import temp from './NotificationPopup.hbs';
import Notif from '../Notification/Notification';
import UserController from '../../../controllers/UserController';
import NotifModel from '../../../models/NotifModel';

export default class NotificationPopup extends Component {
    constructor() {
        super('notif-popup', {}, 'notif-popup', temp);
        if (UserController.logined) {
            NotifModel.all()
                .then((response) => {
                    const notifArr = response.notifications;
                    const notifComponents = [];

                    for (const notif of notifArr) {
                        notifComponents.push(new Notif({notifModel: notif}));
                    }

                    this.addContextData({
                        Notifs: notifComponents,
                    });
                });
        }
    }

    handleLogin() {
        NotifModel.all()
            .then((response) => {
                const notifArr = response.notifications;
                const notifComponents = [];

                for (const notif of notifArr) {
                    notifComponents.push(new Notif({notifModel: notif}));
                }

                this.addContextData({
                    Notifs: notifComponents,
                });

                this.domElement.outerHTML = this.toString();
                this.startWebsocket();
            });
    }

    startWebsocket() {
        const socket = new WebSocket('wss://skydelivery.site:8081/api/v1/notification_server');
        socket.onopen = (e) => {
            console.log('opened', JSON.stringify(e));
        };

        socket.onmessage = (e) => {
            console.log('message!', JSON.stringify(e));
        };

        socket.onclose = (e) => {
            console.log('closed', JSON.stringify(e));
        };
    }

    bind() {
        this.startWebsocket();
        EventBus.subscribe(Events.successLogin, this.handleLogin.bind(this));
        EventBus.subscribe(Events.escButPressed, () => {
            this.disappear.bind(this);
        });
        EventBus.subscribe(Events.notifRequest, this.appear.bind(this));
        document.getElementsByClassName('notif-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
        this.disappear();
    }

    unbind() {
        EventBus.subscribe(Events.escButPressed, () => {
            this.disappear.bind(this);
        });
        EventBus.unsubscribe(Events.notifRequest, this.appear.bind(this));
        document.getElementsByClassName('notif-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear() {
        this.domElement.style.display = 'flex';
    }

    disappear() {
        this.domElement.style.display = 'none';
        EventBus.publish(Events.logPopDisappear);
    }

    quiteDisappear() {
        this.domElement.style.display = 'none';
    }
}
