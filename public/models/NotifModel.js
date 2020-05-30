import Http from './Http';

class NotifModel {
    all() {
        return Http.fetchGet({path: '/api/v1/notifications'});
    }

    changeReadStatus(id) {
        return Http.fetchPost({path: `/api/v1/notifications/${id}`});
    }

    delete(id) {
        return Http.fetchDelete({path: `/api/v1/notifications/${id}`});
    }

    notifServer() {
        return Http.fetchGet({path: '/api/v1/notification_server'});
    }
}

export default new NotifModel();
