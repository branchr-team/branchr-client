import Vue from 'vue';
import * as router from 'lib/router';
import * as AuthService from 'services/auth';

import 'components/login-dialog';

router.page('/', 'explore', 'controllers/home', true);
//router.page('/contribute', 'contribute', 'controllers/myContribs', true);
router.page('/feed/new', 'develop', 'controllers/developer-tools', true);
router.page('/feeds', 'feeds', 'controllers/feeds', true);
router.page('/feed/edit/:feedId', 'develop', 'controllers/developer-tools');
router.page('/feed/:feedId', 'feed', 'controllers/feed');
router.page('/post/new/:feedId', 'newpost','controllers/new-post');

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
        openLoginDialog(msg) {
            return this.$.loginDialog.open(msg).then(this.updateUser);
        },
        logout() {
            return AuthService.logout().then(this.updateUser);
        }
    }
});

router.init(vm, '/');
