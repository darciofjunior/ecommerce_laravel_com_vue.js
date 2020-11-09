<template>
    <div>
        <a href="#" @click.prevent="confirmDelete(item)" class="btn btn-danger">
            Deletar
        </a>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            require: true,
            type: Object
        },
    },

    methods: {
        confirmDelete(item) {
            this.$snotify.error(`DESEJA REALMENTE DELETAR O PRODUTO ${item.name}`, item.name, {
                timeout: 1500,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHouver: true,
                buttons: [
                    {text: 'NÃO'},
                    {text: 'SIM', action: () => this.$emit('destroy', item.id)}
                ]
            })
        },
    }
}
</script>
