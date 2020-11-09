import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import routes from './routers.map'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

//Verificação se está autenticado ...
router.beforeEach((to, from, next) => {
    if(to.meta.auth && !store.state.auth.authenticated) {
        store.commit('CHANGE_URL_BACK', to.name)

        return router.push({name: 'login'})
    }

    //Se a rota pai precisa de autenticação 
    if(to.matched.some(record => record.meta.auth) && !store.state.auth.authenticated) {
        store.commit('CHANGE_URL_BACK', to.name)

        return router.push({name: 'login'})
    }

    /*Verifica se existe a propriedade auth e não precisa de autenticação na rota 
    e a pessoa está logada então ...*/
    if(to.meta.hasOwnProperty('auth') && !to.meta.auth && store.state.auth.authenticated) {
        return router.push({name: 'admin.dashboard'})
    }

    next()
})

export default router