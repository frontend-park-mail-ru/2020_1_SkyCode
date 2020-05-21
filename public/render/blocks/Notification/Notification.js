import Component from '../../Component';
import temp from './Notification.hbs';

export default class Notification extends Component {
    constructor({notifModel}) {
        super('', {
            status: notifModel.status,
            unread_status: notifModel.unread_status,
            datetime: notifModel.datetime,
        }, 'notif-' + notifModel.id, temp);
    }
}
