import Http from './Http.js';

class UserModel {
    getUser() {
        return Http.fetchGet({
            path: '/api/v1/profile',
        });
    }

    createUser(body) {
        return Http.fetchPost({
            path: '/api/v1/signup',
            body: JSON.stringify(body),
        });
    }

    updateUser(body) {
        return Http.fetchPut({
            path: '/api/v1/profile/bio',
            body: JSON.stringify(body),
        });
    }

    updateAvatar(body) {
        return Http.fetchPut({
            path: '/api/v1/profile/avatar',
            body,
            type: 'file',
        });
    }
}

export default new UserModel();
