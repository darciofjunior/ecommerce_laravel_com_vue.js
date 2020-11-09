<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        Cadastrar-se
                    </div>
                    <div class="card-body">
                        <form class="form" @submit.prevent="register">
                            <user-form
                                :user="formData"
                                :errors="errors">
                            </user-form>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import UserForm from './UserForm'

export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: '',
            },
            errors: {},
        }
    },

    methods: {
        register() {
            this.$store.dispatch('register', this.formData)
                        .then(() => 
                            this.$router.push({name: 'admin.dashboard'}),
                            this.$snotify.success('SUCESSO AO CADASTRAR !')
                        )
                        .catch(response => {
                            this.errors = response.errors
                        })
        }
    },

    components: {
        UserForm
    }
}
</script>
