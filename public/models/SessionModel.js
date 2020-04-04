import Http from './Http.js';

class SessionModel {
    login(data) {
        return Http.fetchPost({path: '/api/v1/signin',
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

    logout() {
        return Http.fetchPost({path: '/api/v1/logout'}).then(response => response.json());
    }

}

export default new SessionModel();
