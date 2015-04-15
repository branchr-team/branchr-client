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

    }
}