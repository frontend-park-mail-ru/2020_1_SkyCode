class Http {
    constructor() {
        this.serverPath = 'http://skydelivery.site';
    }

    fetchRequest({
        path = '/',
        method = 'GET',
        body = null,
        headers = true,
        type = 'json',
    }) {
        const req = {
            method,
            mode: 'cors',
            credentials: 'include',
        };

        if (body != null) {
            req.body = body;
        }
        if (headers === true) {
            req.headers = {};
            if (type === 'json') {
                Object.assign(req.headers, {
                    'Content-Type': 'application/json',
                });
            }
            // If (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            Object.assign(req.headers, {
                'X-Csrf-Token': localStorage.getItem('token'),
            });
            // }
        }
        return fetch(`${this.serverPath}${path}`, req)
            .then((response) => Http.retCSRFToken(response))
            .then((response) => response.json());
    }

    async fetchGet({path}) {
        return await this.fetchRequest({
            method: 'GET',
            path,
        });
    }
    /*
     *     If (useCache && Object.prototype.hasOwnProperty.call(sessionStorage, path)) {
     *         const cacheRecord = JSON.parse(sessionStorage[path]);
     *         const second = 1000;
     *         const minute = second * 60;
     *         const fiveMinutes = minute * 5;
     *
     *         if (Date.now() - cacheRecord.created < fiveMinutes) {
     *             return cacheRecord.response;
     *         }
     *     }
     *
     *     const response = await this.fetchRequest({
     *         method: 'GET',
     *         path,
     *     });
     *
     *     if (Object.prototype.hasOwnProperty.call(response, 'error')) {
     *         return response;
     *     }
     *
     *     sessionStorage[path] = JSON.stringify({
     *         created: Date.now(),
     *         response,
     *     });
     *
     *     return response;
     * }
     */

    async fetchPost({path, body, type = 'json'}) {
        return await this.fetchRequest({
            method: 'POST',
            path,
            body,
            type,
        });
    }

    async fetchPut({path, body, type = 'json'}) {
        return await this.fetchRequest({
            method: 'PUT',
            path,
            body,
            type,
        });
    }

    async fetchDelete({path, body}) {
        return await this.fetchRequest({
            method: 'DELETE',
            path,
            body,
        });
    }

    static retCSRFToken(response) {
        const token = response.headers.get('X-Csrf-Token');
        if (token) {
            localStorage.setItem('token', token);
        }

        return response;
    }
}

export default new Http();
