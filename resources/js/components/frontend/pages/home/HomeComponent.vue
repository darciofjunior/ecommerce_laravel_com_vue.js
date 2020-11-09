<template>
    <div>
        <h1>Produtos</h1>

        <search @search="search"></search>

        <div class="row">
            <item 
                v-for="product in products.data" 
                :key="product.id"
                :item="product"
                :path="'products'">
            </item>
            <paginate
                :pagination="products"
                @paginate="loadProducts">
            </paginate>
        </div>
    </div>
</template>

<script>
import PaginationComponent from '../../../layouts/PaginationComponent'
import Item from '../../../layouts/Item'
import Search from './partials/Search'

export default {
    created() {
        if(this.products.data.length == 0)
            this.$store.dispatch('loadProducts', {})
    },

    data() {
        return {
            filter: '',
            category_id: '',
        }
    },

    computed: {
        products() {
            return this.$store.state.products.items
        },

        params () {
            return {
                filter:         this.filter,
                category_id:    this.category_id,
                page:           this.products.current_page,
            }
        }
    },

    methods: {
        loadProducts (page = 1) {
            this.$store.dispatch('loadProducts', {...this.params, page})
        },

        search(values) {
            this.filter         = values.filter,
            this.category_id    = values.category_id,

            this.loadProducts()
        }
    },

    components: {
        paginate: PaginationComponent,
        item: Item,
        Search,
    }
}
</script>