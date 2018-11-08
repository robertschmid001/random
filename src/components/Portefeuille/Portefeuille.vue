<template>
  <div id="portefeuille">
    <div class="header" :class="[{active: currentView == 'sante'},{active2: currentView == 'prevoyance'},{active3: currentView == 'risques'}]">
      <button class="header-button pointer" :class="{active: currentView == 'sante'}" @click="spaFilter('s')">Santé</button>
      <button class="header-button pointer" :class="{active2: currentView == 'prevoyance'}" @click="spaFilter('p')">Prévoyance</button>
      <button class="header-button pointer" :class="{active3: currentView == 'risques'}" @click="spaFilter('a')">Autres risques</button>
    </div>
      <div class="type-wrapping">
        <div class="type-title" v-bind:class="{ isActive: currentView == 'holding-table' }" @click="swapType('holding-table')">Liste des Holdings</div>
        <div class="type-title" v-bind:class="{ isActive: currentView == 'entreprise-table' }" @click="swapType('entreprise-table')">Liste des Entreprises</div>
      </div>
      <div class="wrapping-search">
        <el-button class="button inner-button"  @click="erFilter('e')">En cours</el-button>
        <el-button class="button inner-button" @click="erFilter('r')">Résiliés</el-button>
      </div>
      <button @click="click">LOG</button>
    <component :is="currentView" keep-alive :holdings="holdings" :entreprises="entreprises"></component>

  </div>
</template>
<script>
// import Prevoyance from "./_subs/Prevoyance.vue"
// import Sante from "./_subs/Sante.vue"
// import Risques from "./_subs/Risques.vue"

import EntTable from "./tables/EntTable.vue"
import AssTable from "./tables/AssTable.vue"
import ContTable from "./tables/ContTable.vue"
import CotTable from "./tables/CotTable.vue"
import HolTable from "./tables/HolTable.vue"
import PresTable from "./tables/PresTable.vue"

export default {
  name: 'Portefeuille',
  data () {
      return {
        currentView: 'holding-table',
        holdingsAll: [],
        entreprisesAll: [],
        spa: 's',
        eR: 'e',
      }
  },
  props: {
  },
  components: {
    'entreprise-table' : EntTable,
    'assure-table' : AssTable,
    'contrat-table' : ContTable,
    'cotisation-table' : CotTable,
    'holding-table' : HolTable,
    'prestation-table' : PresTable,
  },
  methods: {
    click () {
      console.log(this.entreprisesAll, 'this.entreprises')
    },
    swapType(param) {
      this.currentView = param

    // this.bottomPop= false
    // this.switchFirstBread(param);
    },
    erFilter(param) {
      return this.eR = param
    },
    spaFilter (param) {
      return this.spa = param
    },
    initEntreprise () {
      this.holdingsAll.filter(d => {
        let eAdd = {noh: d.noH}
         return d.entreprises.filter(e => {
           var obj = Object.assign({}, eAdd,e);
          this.entreprisesAll.push(obj)
        })
      })
    }
  },
  computed: {
    entreprises () {
      let spaEr = this.spa + this.eR;
         return this.entreprisesAll.filter(e => {
          e.iCc = e.iC[spaEr]
          e.iAa = e.iA[spaEr]
          e.iBb = e.iB[spaEr]
          e.iPrr = e.iPr[spaEr]
          e.iCoo = e.iCo[spaEr]
          return e
        })
    },
    holdings () {
      let spaEr = this.spa + this.eR;
      return this.holdingsAll.filter( h => {
        h.iEe = h.iE[spaEr]
        h.iCc = h.iC[spaEr]
        h.iAa = h.iA[spaEr]
        h.iBb = h.iB[spaEr]
        h.iPrr = h.iPr[spaEr]
        h.iCoo = h.iCo[spaEr]
        return h
      })
    },

  },
  mounted () {
    this.initEntreprise();
  },
  created () {
    this.holdingsAll = this.$store.state.holdings
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

#portefeuille {
  background-color: white;
  .header {
    display: flex;
    height: 60px;
    background-color: rgb(4, 172, 172);
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 40px;
    box-sizing: border-box;
    align-items: center;
    .header-button {
      padding: 0 20px;
      max-width: 250px;
      border-style: none;
      background-color: rgba(255, 255, 255, 0);
      color: white;
      font-weight: 550;
      border-radius: 7px;
      margin-right: 30px;
      height: 30px;
    }
  }
}
.active {
  background: rgba(4, 172, 172, 0.8)!important;
  outline: none;
}
.active2 {
  background: rgba(119, 78, 196, 0.8)!important;
  outline: none;
}
.active3 {
  background: rgba(53, 170, 112, 0.8)!important;
  outline: none;
}
.type-wrapping {
  display: flex;
  flex-direction: row;
  padding-left: 10px;
}
.type-title {
  padding: 30px;
  font-size: 18px;
  color: rgb(185, 185, 185);
}
.isActive {
  color: rgb(104, 103, 103);
  cursor: default
}
.wrapping-search {
  padding: 0px 40px 10px 40px;
}
.inner-button {
  padding: 0 10px;
}
</style>
