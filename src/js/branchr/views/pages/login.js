import View from 'view';
import APIService from 'branchr/services/api-service';

export default new View('/html/login.html', {
    data: function() {
        return {
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
            APIService.user.list()
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
            APIService.user.register({name: this.newUsername})
                .then(res => {
                    this.updateUsers();
                    this.newUsername = '';
                })
                .catch(err => {
                    console.error(err);
                    alert(err.data);
                });
        },
        removeUser: function(name) {
            console.log(`Removing user ${name}`);
            APIService.user.unregister(name)
                .then(res => {
                    this.updateUsers();
                })
                .catch(err => {
                    console.error(err);
                    alert(err.data);
                });
        }
    }
});
