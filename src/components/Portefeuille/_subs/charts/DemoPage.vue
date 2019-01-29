<template>
    <div id="Demo-page">
        <el-row>
            <el-col :span="24"><demo-chart/></el-col>
            <el-col :span="24"><age-chart /></el-col>
        </el-row>
    </div>
</template>

<script>
import DemoChart from './_subs_charts/DemoChart.vue'
import AgeChart from './_subs_charts/AgeChart.vue'

export default {
  name: 'DemoPage',
  data () {
    return {
    }
  },
  props: {
  },
  components: {
    'demo-chart': DemoChart,
    'age-chart': AgeChart
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>