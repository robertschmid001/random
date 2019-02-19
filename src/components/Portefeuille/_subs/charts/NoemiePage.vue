<template>
    <div id="NoemiePage">
        <el-row>
            <el-col :span="24"><noemie-chart/></el-col>
        </el-row>
    </div>
</template>

<script>
import NoemieChart from './_subs_charts/NoemieChart.vue'

export default {
  name: 'NoemiePage',
  data () {
    return {
    }
  },
  props: {
  },
  components: {
    'noemie-chart': NoemieChart,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>