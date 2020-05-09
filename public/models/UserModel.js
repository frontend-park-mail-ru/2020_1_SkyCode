import Http from './Http.js';

class UserModel {
    getUser() {
        return Http.fetchGet({
            path: '/api/v1/profile',
        })
            .then((response) => response.json());
    }

    createUser(body) {
        return Http.fetchPost({
            path: '/api/v1/signup',
            body: JSON.stringify(body),
        })
            .then((response) => response.json());
    }

    updateUser(body) {
        return Http.fetchPut({
            path: '/api/v1/profile/bio',
            body: JSON.stringify(body),
        })
            .then((response) => response.json());
    }

    updateAvatar(body) {
        return Http.fetchPut({
            path: '/api/v1/profile/avatar',
            body,
            type: 'file',
        })
            .then((response) => response.json());
    }
}

export default new UserModel();
