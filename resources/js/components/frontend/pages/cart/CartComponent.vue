<template>
    <div>
        <h1>Carrinho</h1>
        <div class="row">
            <div class="col-12" v-for="product in products" :key="product.id">
                <div class="col-3">
                    <div v-if="product.image">
                        <img :src="[`/storage/products/${product.image}`]" :alt="product.name" class="img-list">
                    </div>
                    <div v-else>
                        <img src="/imgs/no-image.png" :alt="product.name" class="img-list">
                    </div>
                </div>
                <div class="col-7">
                    {{ product.name }}
                </div>
                <div class="col-2">
                    <button class="btn btn-danger" @click.prevent="removeCart(product)">
                        Remover Carrinho
                    </button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.state.cart.products
        },
    },

    methods: {
        removeCart(product) {
            this.$store.commit('REMOVE_PRODUCT_CART', product)
        }
    }
}
</script>

<style scoped>
.img-list{max-width: 100px;}
</style>