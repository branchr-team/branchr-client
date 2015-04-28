import Vue from 'vue';
import * as router from 'lib/router';

import 'components/loading-spinner';
import 'components/loading-content';
import 'components/post-fields';
import 'components/contrib';

router.page('/', 'home', 'controllers/home');
router.page('/users', 'users', 'controllers/users');
router.page('/feeds', 'explore', 'controllers/feeds', true);
router.page('#', 'contribute', '', true)
router.page('/develop', 'develop', 'controllers/developer-tools', true);
router.page('/feed/:id', 'feed', 'controllers/feed');
router.page('/description', 'description','controllers/description');

var vm = new Vue({
    el: '#main',
    data: {
        ctrlName: '',
        nav: router.navPages
    }
});

router.init(vm, '/');
