import Http from './Http.js';

/**
 * Модель пользователя, реализует запросы к серверу за пользовательскими данными
 */
class UserModel {
    getUser() {
        return Http.fetchGet({path: '/profile'}).then(response => response.json());
    }

    createUser(body) {
        return Http.fetchPost({path: '/user', body: JSON.stringify(body)}).then(response => response.json());
    }

    updateUser(body) {
        return Http.fetchPut({path: '/profile', body: body}).then(response => response.json());
    }
}

export default new UserModel();
