import Vue from 'vue';
import * as router from 'lib/router';
import * as AuthService from 'services/auth';

import 'components/loading-spinner';
import 'components/loading-content';
import 'components/login-dialog';
import 'components/post-fields';
import 'components/engine-form-builder';
import 'components/contrib';

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
        openLoginDialog() {
            this.$.loginDialog.open().then(() => {
                this.user = AuthService.user;
            })
        },
        logout() {
            AuthService.logout().then(() => {
                this.user = AuthService.user;
            });
        }
    }
});

router.init(vm, '/');
