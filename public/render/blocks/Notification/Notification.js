import Component from '../../Component';
import temp from './Notification.hbs';
import NeonButton from '../../elements/neonButton/NeonButton';
import NotifModel from '../../../models/NotifModel';

export default class Notification extends Component {
    constructor({notifModel}) {
        const datetime = notifModel.DateTime;
        const date = datetime.slice(0, 10);
        const time = datetime.slice(11, 19);

        super('', {
            Status: frontStatus(notifModel.Status),
            time,
            ID: notifModel.ID,
            UnreadStatus: notifModel.UnreadStatus,
        }, 'notif-' + notifModel.ID, temp);
        this.addContextData({
            del: new NeonButton({
                text: 'X',
                id: 'del_' + notifModel.ID + '__notif',
                callback: () => {
                    NotifModel.delete(notifModel.ID).then((resp) => {
                        console.log(resp);
                    });

                    this.selfDelete();
                },
            }),
        });
    }

    selfDelete() {
        this.unbind();
        this.domElement.outerHTML = '';

        const notifs = this.contextParent.context.Notifs;

        for (let i = 0; i < notifs.length; i++) {
            if (notifs[i].id === this.id) {
                notifs.splice(i, 1);
            }
        }

        if (notifs.length === 0) {
            document.getElementsByClassName('notif-container')[0].innerText = 'Новых уведомлений нет';
        }
    }
}

const frontStatuses = [
    'Принят',
    'У курьера',
    'Доставлен',
    'Отменён',
];

const backStatuses = [
    'Accepted',
    'Delivering',
    'Done',
    'Canceled',
];


function frontStatus(backSt) {
    return frontStatuses[backStatuses.indexOf(backSt)];
}

function backStatus(frontSt) {
    return backStatuses[frontStatuses.indexOf(frontSt)];
}

function nextBackStatus(frontSt) {
    return backStatuses[frontStatuses.indexOf(frontSt) + 1];
}

