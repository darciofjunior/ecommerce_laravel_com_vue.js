<template>
    <div>
        <h1>Relatório de Produtos</h1>
        <hr/>
        
        <select class="form-control" v-model="year" @change="charts">
            <option :value="i" v-for="i in years" :key="i">{{ i }}</option>
        </select>
        <hr/>

        <line-charts
            :labels="labels"
            :datasets="datasets"></line-charts>
    </div>
</template>

<script>
import LineCharts from './charts/LineCharts'

export default {
    mounted() {
        this.charts()
    },

    computed: {
        years() {
            let year        = new Date().getFullYear()
            let startYear   = (year - 10)

            let years = []
            let j = 0

            for(let i = year; i >= startYear; i--) {
                years[j] = i
                j++
            }
            return years
        }
    },

    data() {
        return {
            year: new Date.getFullYear(),
            labels: [],
            datasets: [
                {
                    label: 'Qtde de Produtos cadastrados por mês',
                    backgroundColor: 'transparent',
                    borderColor: '#000',
                    data: []
                }
            ]
        }
    },

    methods: {
        charts() {
            this.$store.dispatch('reportsProducts', {year: this.year})
                        .then(response => {
                            this.labels             = response.data.labels
                            this.datasets[0].data   = response.data.datasets
                        })
                        .catch(() => {
                            this.$snotify.error('ERRO AO ATUALIZAR GRÁFICOS !!!')
                        })
        }
    },

    components: {
        LineCharts
    }
}
</script>
