<template>
    <div>
        <ul class="nav bg-dark">
            <li class="nav-item">
                <router-link :to="{name: 'admin.dashboard'}" class="nav-link">DashBoard</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'admin.categories'}" class="nav-link">Categorias ({{totalCategories}})</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'admin.products'}" class="nav-link">Produtos ({{totalProducts}})</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'products.reports'}" class="nav-link">Relatórios</router-link>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    {{ me.name }} (<a href="#" @click.prevent="logout" class="link">Sair</a>)
                </a>
            </li>
        </ul>

        <div class="container">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    computed: {
        totalCategories() {
            return this.$store.state.categories.items.data.length
        },

        totalProducts() {
            return this.$store.state.products.items.data.length
        },

        me() {
            return this.$store.state.auth.me
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style scoped>

</style>