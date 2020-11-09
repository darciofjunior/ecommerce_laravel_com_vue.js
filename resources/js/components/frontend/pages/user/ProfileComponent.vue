<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card">
                    <div class="card-header">
                        Atualizar Perfil
                    </div>
                    <div class="card-body">
                        <form class="form" @submit.prevent="updateProfile">
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
    computed: {
        formData() {
            return this.$store.state.auth.me
        }
    },

    data() {
        return {
            errors: {},
        }
    },

    methods: {
        updateProfile() {
            this.$store.dispatch('updateProfile', this.formData)
                        .then(() => 
                            this.$router.push({name: 'admin.dashboard'}),
                            this.$snotify.success('SUCESSO AO ATUALIZAR !')
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
