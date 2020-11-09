require('./bootstrap');
window.Vue = require('vue');

import router from './routes/routers'
import store from './vuex/store'
import Snotify from 'vue-snotify'
import VueAwesome from 'vue-awesome'

Vue.use(Snotify, {toast: {showProgressBar: false}})


//Componentes Globais ...
Vue.component('admin-component', require('./components/admin/AdminComponent.vue').default);
Vue.component('preloader-component', require('./components/layouts/PreloaderComponent.vue').default);
Vue.component('icon', VueAwesome)

const app = new Vue({
    router, 
    store, 
    el: '#app'
});

store.dispatch('loadCategories')
store.dispatch('checkLogin')
        .then(() => router.push({name: store.state.auth.urlBack}))
