import Vue from 'vue';
import * as router from 'lib/router';
import * as AuthService from 'services/auth';

import 'components/login-dialog';

router.page('/', 'home', 'controllers/home', true);
//router.page('/users', 'users', 'controllers/users', true);
router.page('/feeds', 'feeds', 'controllers/feeds', true);
router.page('/feed/:feedId', 'feed', 'controllers/feed');
router.page('/dev/:engineId', 'dev', 'controllers/developer-tools');
router.page('/description', 'description','controllers/description');

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
        openLoginDialog() {
            return this.$.loginDialog.open().then(this.updateUser);
        },
        logout() {
            return AuthService.logout().then(this.updateUser);
        }
    }
});

router.init(vm, '/');
