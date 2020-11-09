<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <div :class="['form-group', {'has-error': errors.name}]">
                <div v-if="errors.name">{{ errors.name }}</div>
                <input type="text" v-model="category.name" class="form-control" placeholder="Categoria"/>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            require: false,
            type: Object|Array,
            default: () => {
                return {
                    id: '',
                    name: ''
                }
            }
        },
        updating: {
            require: false,
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            errors: {}
        }
    },

    methods: {
        onSubmit() {
            const action = this.updating ? 'updateCategory' : 'storeCategory'

            this.$store.dispatch(action, this.category)
                        .then(() => {
                            this.$snotify.success('CADASTRO COM SUCESSO !')
                            this.$router.push({name: 'admin.categories'})
                        })
                        .catch(error => {
                            this.$snotify.error('NÃO FOI POSSÍVEL CADASTRAR !', 'ERRO')
                            this.errors = error.data
                        })
        }
    }
}
</script>

<style scoped>
.has-error {color: red;}
.has-error input {border: 1px solid red;}
</style>