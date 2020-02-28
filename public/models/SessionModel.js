import Http from './Http.js';

/**
 * Модель пользовательской сессии, реализует управление текущей
 *  пользовательской сессией
 */
class SessionModel {
    login(usr, password) {
        return Http.fetchPost({path: '/session',
            body: JSON.stringify({email: usr, password: password})
        }).then(res => res.json());
    }

    logout() {
        return Http.fetchDelete({path: '/session'}).then(response => response.json());
    }

}

export default new SessionModel();
