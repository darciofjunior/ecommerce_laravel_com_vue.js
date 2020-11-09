<template>
    <div>
        <ul class="nav">
            <li class="nav-item">
                <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'contact'}" class="nav-link">Contact</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'cart'}" class="nav-link">Carrinho ({{ cart.length }})</router-link>
            </li>
            <li class="nav-item dropdown-show" v-if="me.name">
                <a class="dropdown-toggle nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Olá {{ me.name }} !!!
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <router-link :to="{name: 'profile'}" class="dropdown-item">Meu Perfil</router-link>
                    <a class="dropdown-item" @click.prevent="logout">Sair</a>
                </div>
            </li>
            <li class="nav-item" v-else>
                <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
            </li>
        </ul>
    </div>  
</template>

<script>
export default {
    computed: {
        cart() {
            return this.$store.state.cart.products
        },

        me() {
            return this.$store.state.auth.me
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>
