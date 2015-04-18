import Vue from 'vue';
import * as router from 'lib/router';

import 'components/loading-spinner';
import 'components/loading-content';
import 'components/post-fields';
import 'components/contrib';

router.page('/', 'home', 'controllers/home', true);
router.page('/users', 'users', 'controllers/users', true);
router.page('/feeds', 'feeds', 'controllers/feeds', true);
router.page('/feed/:id', 'feed', 'controllers/feed');

var vm = new Vue({
    el: '#main',
    data: {
        ctrlName: '',
        nav: router.navPages
    }
});

router.init(vm, '/');
