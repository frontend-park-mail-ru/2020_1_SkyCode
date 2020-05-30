import Http from './Http.js';

class SessionModel {
    login(data) {
        return Http.fetchPost({
            path: '/api/v1/signin',
            body: JSON.stringify(data),
        });
    }

    logout() {
        return Http.fetchPost({
            path: '/api/v1/logout',
        });
    }
}

export default new SessionModel();
