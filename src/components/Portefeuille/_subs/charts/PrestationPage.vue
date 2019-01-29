<template>
    <div id="prestation-chart">
        <el-row>
            <el-col :span="24"><prestations-chart/></el-col>
        </el-row>
    </div>
</template>

<script>
// import AssTable from './Portefeuille/tables/AssTable.vue'
import PrestationsChart from './_subs_charts/PrestationsChart.vue'

export default {
  name: 'PrestationChart',
  data () {
    return {
    }
  },
  props: {
  },
  components: {
    'prestations-chart': PrestationsChart,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>