<template>
    <div>
        <h1>Listagem de Produtos</h1>

        <div class="row">
            <div class="col">
                <button class="btn btn-success" @click.prevent="create">
                    Novo
                </button>

                <vodal 
                    :show="showModal" 
                    animation="zoom"
                    @hide="hideModal"
                    :width="600"
                    :height="500">
                    <product-form 
                        :product="product"
                        :update="update"
                        @success="success">
                    </product-form>
                </vodal>
            </div>
            <div class="col">
                <search @search="searchForm">
                </search>
            </div>
        </div>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th width="150">IMAGEM</th>
                    <th>NOME</th>
                    <th width="100%">AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products.data" :key="product.id">
                    <td>
                        <div v-if="product.image">
                            <img :src="[`/storage/products/${product.image}`]" :alt="product.name" class="img-list">
                        </div>
                    </td>
                    <td>
                        {{ product.name }}
                    </td>
                    <td>
                        <a href="#" @click.prevent="edit(product.id)" class="btn btn-info">
                            Editar
                        </a>
                        <destroy :item="product" @destroy="destroy"/>
                    </td>
                </tr>
            </tbody>
        </table>

        <pagination
            :pagination="products"
            :offset="6"
            @paginate="loadProducts">
        </pagination>
    </div>
</template>

<script>

import Vodal from 'vodal';
import PaginationComponent from '../../../layouts/PaginationComponent';
import SearchComponent from '../../layouts/SearchComponent';
import ProductForm from './partials/ProductForm';
import ButtonDestroyComponent from '../../layouts/ButtonDestroyComponent';

export default {
    created () {
        this.loadProducts(1)
    },

    data() {
        return {
            search: '',
            showModal: false,
        }
    },

    computed: {
        products() {
            return this.$store.state.products.items
        },
        params() {
            return {
                page: this.products.current_page,
                filter: this.search,
            }
        }
    },

    methods: {
        loadProducts(page) {
            this.$store.dispatch('loadProducts', {...this.params, page})
        },

        create() {
            this.update = false,
            this.showModal = true
            this.reset()
        },

        edit(id) {
            this.$store.dispatch('loadProduct', id)
                        .then(response => {
                            this.product = response
                            this.showModal = true
                            this.update = true
                        })
                        .catch(() => {
                            this.$snotify.error('ERRO AO CARREGAR PRODUTO !')
                        })

        },
        searchForm(filter) {
            this.search = filter
            this.loadProducts(1)
        },
        hideModal() {
            this.showModal = false
        },
        success() {
            this.hideModal()
            this.loadProducts(1)
        },

        reset() {
            this.product = {
                id: '',
                name: '',
                description: '',
                category_id: '',
            }
        },

        destroy(id) {
            this.$store.dispatch('destroyProduct', id)
                        .then(() => {
                            this.$snotify.success('PRODUTO DELETADO COM SUCESSO !')
                            this.loadProducts(1)
                        })
                        .catch(() => this.$snotify.error('ERRO AO CARREGAR PRODUTO !'))
        }
    },

    components: {
        pagination: PaginationComponent,
        search: SearchComponent,
        Vodal,
        ProductForm,
        destroy: ButtonDestroyComponent
    }
}
</script>

<style scoped>
.img-list{max-width: 100px;}
</style>