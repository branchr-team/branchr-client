import Vue from 'vue';
import * as router from 'lib/router';

import 'components/loading-spinner';
import 'components/loading-content';
import 'components/login-dialog';
import 'components/post-fields';
import 'components/engine-form-builder';
import 'components/contrib';

router.page('/', 'home', 'controllers/home', true);
router.page('/users', 'users', 'controllers/users', true);
router.page('/feeds', 'feeds', 'controllers/feeds', true);
router.page('/feed/:id', 'feed', 'controllers/feed');
router.page('/description', 'description','controllers/description');

var vm = new Vue({
    el: '#main',
    data: {
        ctrlName: '',
        nav: router.navPages,
        username: null
    },
    methods: {
        openLoginDialog: function() {
            this.$.loginDialog.open().then(username => this.username = username);
        }
    }
});

window.vm = vm;

router.init(vm, '/');
