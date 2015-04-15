import PageController from 'page-controller';
import APIService from 'services/api-service';

export default new PageController({
    url: '/',
    name: 'home',
    template: '/html/home.html'
}, {
    data: function() { return {
        foo: 'bar'
    }},
    created: function() {
        console.log("Home created");
    },
    destroyed: function() {
        console.log("Home destroyed");
    },
    methods: {
    }
});

