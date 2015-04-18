import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/users.html!';

export default Vue.extend({
	template: template,
    data: function() {
        return {
			loading: true,
            users: [],
            newUsername: ''
        }
    },
    created: function() {
        this.updateUsers();
    },
    methods: {
        updateUsers: function() {
            let self = this;
			this.loading = true;
            APIService.user.list()
                .then(res => {
                    self.users = res.data.map((o) => {
                        return {
                            id: o._id.toString(),
                            name: o.name
                        };
                    });
					self.loading = false;
                })
                .catch(err => alert(err));
        },
        registerNewUser: function(e) {
            e.preventDefault();
            console.log(`Putting new user ${this.newUsername}`);
            APIService.user.register({name: this.newUsername})
                .then(res => {
                    this.updateUsers();
                    this.newUsername = '';
                })
                .catch(err => {
                    alert(err.data.msg);
                });
        },
        removeUser: function(name) {
            console.log(`Removing user ${name}`);
            APIService.user.unregister(name)
                .then(res => {
                    this.updateUsers();
                })
                .catch(err => {
                    alert(err.data.msg);
                });
        }
    }
});
