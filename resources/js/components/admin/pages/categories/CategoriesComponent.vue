<template>
    <div>
        <h1>Listagem das Categorias</h1>

        <div class="row">
            <div class="col">
                <router-link :to="{name: 'admin.categories.create'}" class="btn btn-success">Cadastrar</router-link>
            </div>
            <div class="col">
                <search @searchCategory="search"></search>
            </div>
        </div>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th width="100%">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categories.data" :key="index">
                    <td>{{ category.id }}</td>
                    <td v-text="category.name"></td>
                    <td>
                        <router-link :to="{name: 'admin.categories.edit', params: {id: category.id}}" class="btn btn-info">Editar</router-link>

                        <a href="#" class="btn btn-danger" @click.prevent="confirmDestroy(category)">
                            Deletar
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import SearchCategoryComponent from './partials/SearchCategoryComponent'

export default {
    created () {
        this.loadCategories()
    },

    data () {
        return {
            name: '',
        }
    },

    computed: {
        categories() {
            return this.$store.state.categories.items
        }
    },
    
    methods: {
        loadCategories() {
            this.$store.dispatch('loadCategories', {name: this.name})
        },

        confirmDestroy(category) {
            this.$snotify.error(`DESEJA REALMENTE DELETAR A CATEGORIA: ${category.name}`, 'DELETAR', {
                timeout: 10000,
                showProgressBar: true,
                closeonClick: true,

                buttons: [
                    {text: 'NÃO', action: () => console.log('NÃO DELETOU ...')},
                    {text: 'SIM', action: () => this.destroy(category)}
                ]
            })
        },

        destroy(category) {
            this.$store.dispatch('destroyCategory', category.id)
                        .then(() => {
                            this.$snotify.success(`CATEGORIA DELETADA COM SUCESSO ! ${category.name}`)
                            this.loadCategories()
                        })
                        .catch(errors => {
                            console.log(error)
                            this.$snotify.error('ESSA CATEGORIA NÃO PODE SER DELETADA !', '404')
                            this.$router.push({name: 'admin.categories'})
                        })
        },

        search(filter) {
            this.name = filter
            this.loadCategories()
        }
    },

    components: {
        search: SearchCategoryComponent
    }
}
</script>

<style scoped>

</style>