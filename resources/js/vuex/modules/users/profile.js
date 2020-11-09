import { NAME_TOKEN } from '../../../config/configs'

const actions = {
    register(context, params) {
        context.commit('PRELOADER', true)

        return new Promise((resolve, reject) => {
            axios.post('/api/register', params)
                    .then(response => {
                        context.commit('AUTH_USER_OK', response.data.user)

                        const token = response.data.token

                        //Aqui é para não deslogar quando der F5 vou pegar a autenticação do próprio Browser ...
                        localStorage.setItem(NAME_TOKEN, token)
                        window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                        resolve()
                    })
                    .catch(error => reject(error.response.data))
                    .finally(() => context.commit('PRELOADER', false))
        })
    },

    updateProfile(context, params) {
        context.commit('PRELOADER', true)

        return new Promise((resolve, reject) => {
            axios.put('/api/update', params)
                    .then(response => {
                        context.commit('AUTH_USER_OK', response.data.user)

                        resolve()
                    })
                    .catch(error => reject(error.response.data))
                    .finally(() => context.commit('PRELOADER', false))
        })
    }
}

export default {
    actions: actions,
}