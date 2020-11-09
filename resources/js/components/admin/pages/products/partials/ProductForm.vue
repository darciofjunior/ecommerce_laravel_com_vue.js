<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <div :class="['form-group', {'has-error': errors.image}]">
                <div v-if="errors.image">{{ errors.image }}</div>
                <div v-if="imagePreview" class="text-center">
                    <img :src="imagePreview" class="image-preview">
                    <button class="btn btn-danger" @click.prevent="removePreviewImage">Remover</button>
                </div>
                <div v-else>
                    <input type="file" class="form-control" @change="onFileChange">
                </div>
            </div>
            
            <div :class="['form-group', {'has-error': errors.name}]">
                <div v-if="errors.name">{{ errors.name }}</div>
                <input type="text" v-model="product.name" class="form-control" placeholder="Produto"/>
            </div>

            <div :class="['form-group', {'has-error': errors.description}]">
                <div v-if="errors.description">{{ errors.description }}</div>
                <textarea v-model="product.description" cols="30" rows="10" class="form-control" placeholder="Descrição"></textarea>
            </div>

            <div :class="['form-group', {'has-error': errors.category_id}]">
                <div v-if="errors.category_id">{{ errors.category_id }}</div>
                <select class="form-control" v-model="product.category_id">
                    <option value="">Selecione a Categoria</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
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
        update: {
            require: false,
            type: Boolean,
            default: false,
        },

        product: {
            require: false,
            type: Object,
            default: () => {
                return {
                    id: '',
                    name: '',
                    description: '',
                    category_id: '',
                }
            }
        }
    },

    computed: {
        categories() {
            return this.$store.state.categories.items.data
        }
    },
    
    data() {
        return {
            errors: {},
            upload: null,
            imagePreview: null,
        }
    },

    methods: {
        onSubmit() {
            let action = this.update ? 'updateProduct' : 'storeProduct'

            const formData = new FormData()

            if(this.upload != null)
                formData.append('image', this.upload)

            formData.append('id', this.product.id)
            formData.append('name', this.product.name)
            formData.append('description', this.product.description)
            formData.append('category_id', this.product.category_id)
            
            this.$store.dispatch(action, formData)
                        .then(() => {
                            this.$snotify.success('SUCESSO AO CADASTRAR / ATUALIZAR O PRODUTO !')
                            this.reset()
                            this.$emit('success')
                        })
                        .catch(error => {
                            this.$snotify.error('NÃO FOI POSSÍVEL CADASTRAR !', 'ERRO')
                            this.errors = error.data
                        })
        },

        reset() {
            this.errors = {}
            this.imagePreview = null
            this.upload = null
        },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files

            if(!files.length)
                return 

            this.upload = files[0]

            this.previewImage(files[0])
        },

        previewImage(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }
            reader.readAsDataURL(file)
        },

        removePreviewImage() {
            this.imagePreview = null
            this.upload = null
        }
    }
}
</script>

<style scoped>
.image-preview{max-width: 60px;}
</style>