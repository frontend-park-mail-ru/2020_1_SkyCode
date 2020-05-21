import Component from '../../Component';
import temp from './Notification.hbs';
import NeonButton from '../../elements/neonButton/NeonButton';
import NotifModel from '../../../models/NotifModel';

export default class Notification extends Component {
    constructor({notifModel}) {
        super('', {
            Status: notifModel.Status,
            UnreadStatus: notifModel.UnreadStatus,
            DateTime: notifModel.DateTime,
        }, 'notif-' + notifModel.ID, temp);
        this.addContextData({
            del: new NeonButton({
                text: 'X',
                id: 'del_' + notifModel.ID + '__notif',
                callback: () => {
                    NotifModel.delete(notifModel.ID).then((resp) => {
                        if (resp.message) this.selfDelete();
                    });
                },
            }),
        });
    }

    selfDelete() {
        this.domElement.outerHTML = '';
        const notifs = this.contextParent.context.Notifs;
        for (let i = 0; i < notifs.length; i++) {
            if (notifs[i].id === 'notif-' + this.id  + '__notif') {
                delete notifs[i];
            }
        }
    }
}
