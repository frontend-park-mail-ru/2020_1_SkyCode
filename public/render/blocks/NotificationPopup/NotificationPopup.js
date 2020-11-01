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
        const notifComponents = [];
        this.addContextData({
            Notifs: notifComponents,
        });

        setTimeout(() => {
            if (UserController.logined) {
                this.handleLogin();
            }
        }, 500);
    }

    handleLogin() {
        NotifModel.all()
            .then((response) => {
                const notifArr = response.notifications || [];
                const notifComponents = [];

                for (const notif of notifArr) {
                    notifComponents.push(new Notif({notifModel: notif}));
                }

                this.addContextData({
                    Notifs: notifComponents,
                });

                this.domElement.outerHTML = this.toString();
                this.bind();
                this.startWebsocket();
            });
    }

    startWebsocket() {
        if (!UserController.logined) return;

        const socket = new WebSocket('ws://skydelivery.site/api/v1/notification_server');
        socket.onopen = (e) => {
            console.log('opened', JSON.stringify(e));
        };

        socket.onmessage = (e) => {
            EventBus.broadcast(Events.notifReceived);
            const notifModel = JSON.parse(e.data);
            console.log('message!', JSON.stringify(notifModel));
            const notif = new Notif({notifModel});

            this.context.Notifs.push(notif);
            notif.contextParent = this;

            this.domElement.outerHTML = this.toString();
            this.bind();
        };

        socket.onclose = (e) => {
            console.log('closed', JSON.stringify(e));
        };
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.successLogin, this.handleLogin.bind(this)),
        );
        this.addUnbind(
            EventBus.subscribe(Events.escButPressed, () => {
                this.disappear.bind(this);
            }),
        );
        this.addUnbind(
            EventBus.subscribe(Events.notifRequest, this.appear.bind(this)),
        );
        document.getElementsByClassName('notif-popup__hider')[0]
            .onclick = () => {
                this.disappear();
            };

        super.bind();
    }

    unbind() {
        document.getElementsByClassName('notif-popup__hider')[0]
            .onclick = null;
        super.unbind();
    }

    appear() {
        this.domElement.style.display = 'flex';
        setTimeout(() => {
            this.domElement.style.opacity = '1';
        }, 100);
    }

    disappear() {
        this.domElement.style.opacity = '0';

        setTimeout(() => {
            this.domElement.style.display = 'none';
            EventBus.broadcast(Events.logPopDisappear);
        }, 100);
    }

    quiteDisappear() {
        this.domElement.style.opacity = '0';

        setTimeout(() => {
            this.domElement.style.display = 'none';
        }, 100);
    }
}
