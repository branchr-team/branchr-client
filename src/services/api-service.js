import http from 'http';

const base = 'http://localhost:3000';

export default {
    user: {
        list: function() {
            return http.get(
                `${base}/user/`
            );
        },
        get: function(name) {
            return http.get(
                `${base}/user/${name}`
            );
        },
        register: function(user) {
            return http.put(
                `${base}/user/${user.name}`,
                user
            );
        },
        unregister: function(name) {
            return http.delete(
                `${base}/user/${name}`
            );
        }
    },
    feed: {
        list: function() {
            return http.get(
                `${base}/feed/`
            );
        },
        get: function(id) {
            return http.get(
                `${base}/feed/${id}`
            );
        },
        new: function(feed) {
            return http.put(
                `${base}/feed`,
                feed
            );
        },
        update: function(id, o) {
            return http.put(
                `${base}/feed/${id}`,
				o
            );
        }

    }
}
