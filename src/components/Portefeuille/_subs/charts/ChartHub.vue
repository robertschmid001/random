<template>
  <div id="ChartHub">
      <el-row>
          <el-col class="inner-wrapper">
            <button class="button-style pointer" v-bind:class="[{ isActive: currentPage == 'recap-page' },{ isHover: currentPage != 'recap-page' }]" @click="changeChart('recap-page')">Récapitulatif de votre sélection</button>
            <button class="button-style pointer" v-bind:class="[{ isActive: currentPage == 'demo-page' },{ isHover: currentPage != 'demo-page' }]" @click="changeChart('demo-page')"> Analyse Démographique</button>
            <!-- <button class="button-style pointer" v-bind:class="[{ isActive: currentPage == 'prestation-page' },{ isHover: currentPage != 'prestation-page' }]" @click="changeChart('prestation-page')">Prestation</button> -->
            <button class="button-style pointer" v-bind:class="[{ isActive: currentPage == 'noemie-page' },{ isHover: currentPage != 'noemie-page' }]" @click="changeChart('noemie-page')">Télétransmission Noémie</button>
          </el-col>
      </el-row>
      <keep-alive><component :is="currentPage"></component></keep-alive>
  </div>
</template>

<script>
import NoemiePage from './NoemiePage.vue'
// import PrestationPage from './PrestationPage.vue'
import DemoPage from './DemoPage.vue'
import Recap from './Recap.vue'

export default {
  name: 'ChartHub',
  data () {
    return {
        currentPage:'demo-page',
    }
  },
  components: {
    // 'prestation-page': PrestationPage,
    'noemie-page': NoemiePage,
    'demo-page': DemoPage,
    'recap-page': Recap
  },
  methods: {
      changeChart ( param ) {
          this.currentPage = param
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../styles/_global.scss";

.inner-wrapper {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(4, 151, 151, 0.5);
}
.button-style {
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
    border-style: none;
    color: white;
    background-color: rgba(13, 151, 151, 0)
}
.isActive {
    background: rgba(13, 151, 151, 0.582)!important;
    cursor: default;
}
.isHover:hover {
    color: $button-color;
}
</style>