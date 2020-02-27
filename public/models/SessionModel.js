import Http from './Http.js';

class SessionModel {
    login(usr, pswd) {
        return Http.fetchPost({path: '/session',
            body: JSON.stringify({email: usr, password: pswd})
        }).then(res => res.json());
    }

    logout() {
        return Http.fetchDelete({path: '/session'}).then(response => response.json());
    }

}

export default new SessionModel();