import Vue from 'vue';
import http from 'http';

export default Vue.extend({
    template: '<h1>Users</h1><ul><li v-repeat="users">{{id}}:{{name}}</li></ul><input type="text" v-model="newUsername"><button v-on="click: registerNewUser()">Add</button>',
    data: function() {
        return {
            users: [],
            newUsername: ''
        }
    },
    attached: function() {
        this.updateUsers();
    },
    methods: {
        updateUsers: function() {
            let self = this;
            http.get("http://localhost:3000/user/")
                .then(res => {
                    self.users = res.data.map((o) => {
                        return {
                            id: o._id.toString(),
                            name: o.name
                        };
                    })
                })
                .catch(err => alert(err));
        },
        registerNewUser: function() {
            console.log(`Putting new user ${this.newUsername}`);
            http.put(`http://localhost:3000/user/${this.newUsername}`, {foo: 'bar'})
                .then(res => {
                    this.updateUsers();
                    this.newUsername = '';
                })
                .catch(err => {
                    console.error(err);
                    alert(err.data);
                });
        }
    }
});
