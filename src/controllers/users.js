import Vue from 'vue';
import APIService from 'services/api-service';
import template from 'templates/pages/users.html!';

export default Vue.extend({
	template: template,
    data: function() {
        return {
			loading: true,
            users: [],
            newUsername: '',
            userId: ''
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
                    self.users = res.data;
					self.loading = false;
                })
                .catch(err => alert(err));
        },
        registerNewUser: function(e) {
            e.preventDefault();
            console.log(`Putting new user ${this.newUsername}`);
            APIService.user.register({username: this.newUsername})
                .then(res => {
                    this.updateUsers();
                    userId = this.newUserName._id;
                    this.newUsername = '';
                })
                .catch(err => {
                    alert(err.data.msg);
                });
        },
        removeUser: function(username) {
            console.log(`Removing user ${username}`);
            let userId = this.user_id
            APIService.user.unregister(userId)
                .then(res => {
                    this.updateUsers();
                })
                .catch(err => {
                    alert(err.data.msg);
                });
        }
    }
});
