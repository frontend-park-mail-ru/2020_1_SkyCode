import Http from './Http.js';

class SessionModel {
    login(data) {
        return Http.fetchPost({
            path: '/api/v1/signin',
            body: JSON.stringify(data),
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }

    logout() {
        return Http.fetchPost({
            path: '/api/v1/logout',
        })
            .then((response) => {
                const token = response.headers.get('X-Csrf-Token');
                if (token) {
                    localStorage.setItem('token', token);
                }
                return response.json();
            });
    }
}

export default new SessionModel();
