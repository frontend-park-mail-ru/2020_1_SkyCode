import Http from './Http';

const prefix = '/api/v1';

class TagModel {
    all() {
        return Http.fetchGet({path: prefix + '/rest_tags'});
    }

    get(id) {
        return Http.fetchGet({path: prefix + `/rest_tags/${id}`});
    }

    create(name, image) {
        const form = new FormData();
        form.append('name', String(name));
        form.append('image', String(image));
        return Http.fetchPost({
            body: form,
            path: prefix + '/rest_tags',
        });
    }

    delete(id) {
        return Http.fetchDelete({path: prefix + `/rest_tags/${id}`});
    }
}

export default new TagModel();
