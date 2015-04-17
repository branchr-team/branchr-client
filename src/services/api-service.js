import http from 'http';

//const base = 'http://localhost:3000';
const base = 'https://branchr.herokuapp.com';

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
            return http.post(
                `${base}/user`,
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
            return http.post(
                `${base}/feed`,
                feed
            );
        },
        update: function(id, o) {
            return http.patch(
                `${base}/feed/${id}`,
				o
            );
        }
    },
    contrib: {
        get: function(id) {
            return http.get(
                `${base}/contrib/${id}`
            );
        },
        getByFeed: function(feedId) {
            return http.get(
                `${base}/contrib?feedId=${feedId}`
            );
        },
        create: function(o) {
            return http.post(
                `${base}/contrib`,
                o
            );
        }
    },
    engine: {
        get: function(id) {
            return http.get(
                `${base}/engine/${id}`
            );
        }
    }
}
