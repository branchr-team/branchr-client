import Vue from 'vue';
import * as router from 'lib/router';
import * as AuthService from 'services/auth';

import 'components/login-dialog';

//router.page('/users', 'users', 'controllers/users');
router.page('/', 'explore', 'controllers/home', true);
//router.page('/contribute', 'contribute', 'controllers/myContribs', true);
router.page('/feed/edit/:feedId', 'develop', 'controllers/developer-tools');
router.page('/feed/:feedId', 'feed', 'controllers/feed');
router.page('/description', 'description','controllers/description');
router.page('/newpost/:feedId', 'newpost','controllers/new-post');

export var vm = new Vue({
    el: '#main',
    data: {
        ctrlName: '',
        nav: router.navPages,
        user: AuthService.user
    },
    methods: {
        updateUser() {
            this.user = AuthService.user;
        },
        openLoginDialog(msg) {
            return this.$.loginDialog.open(msg).then(this.updateUser);
        },
        logout() {
            return AuthService.logout().then(this.updateUser);
        }
    }
});

router.init(vm, '/');
