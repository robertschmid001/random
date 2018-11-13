<template>
  <div id="portefeuille">
    <div class="header" :class="[{active: spa == 's'},{active2: spa == 'p'},{active3: spa == 'a'}]">
      <button class="header-button pointer" :class="{ active: spa == 's' }"  @click="spaFilter('s')">Santé</button>
      <button class="header-button pointer" :class="{ active2: spa == 'p' }" @click="spaFilter('p')">Prévoyance</button>
      <button class="header-button pointer" :class="{ active3: spa == 'a' }" @click="spaFilter('a')">Autres risques</button>
    </div>
      <div class="type-wrapping">
        <div class="type-title" v-bind:class="{ isActive: currentView == 'holding-table' }" @click="swapType('holding-table')">Liste des Holdings</div>
        <div class="type-title" v-bind:class="{ isActive: currentView == 'globEnt-table' }" @click="swapType('globEnt-table')">Liste des Entreprises</div>
      </div>

      <div class="breadcrumbs">
        <ul>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: $route.fullPath }" ><span @click="turnOffTable($route.name)" class="eachBread">{{$route.name}}</span></el-breadcrumb-item>
            <el-breadcrumb-item v-for="(crumbs, index) in breadArray" :key="index"><span @click="turnOffTable(crumbs.trail, index)"  class="eachBread">{{crumbs.name}}</span></el-breadcrumb-item>
          </el-breadcrumb>
        </ul>
      </div>
      
      <div class="wrapping-search">
        <button class="button inner-button pointer" v-bind:class="{ fisActive: eR == 'e' }" @click="erFilter('e')">En cours</button>
        <button class="button inner-button pointer" v-bind:class="{ fisActive: eR == 'r' }" @click="erFilter('r')">Résiliés</button>
      </div>
      <div class="wrapping-search">
        <button class="button inner-button pointer" @click="show('holding-table')">holding-table</button>
        <button class="button inner-button pointer" @click="show('entreprise-table')">entreprise-table</button>
        <button class="button inner-button pointer" @click="show('contrat-table')">contrat-table</button>
      </div>
      <!-- <button @click="holdEntFilter">LOG</button> -->
      <keep-alive><component :is="currentView" :holdings="holdings" :contrats="holdEntContrats" :entreprises="entreprises" :holdEntreprise="holdEntreprise" @holdEntRow="holdEntFilter" @holdEntContRow="holdEntContFilter"></component></keep-alive>
  </div>
</template>
<script>

import EntTable from "./tables/EntTable.vue"
import AssTable from "./tables/AssTable.vue"
import ContTable from "./tables/ContTable.vue"
import CotTable from "./tables/CotTable.vue"
import HolTable from "./tables/HolTable.vue"
import PresTable from "./tables/PresTable.vue"
import GlobEntTable from "./tables/GlobEntTable.vue"

export default {
  name: 'Portefeuille',
  data () {
      return {
        currentView: 'holding-table',
        holdingsAll: [],
        entreprisesAll: [],
        spa: 's',
        eR: 'e',
        holdEnt: [],
        holdEntCon: [],
        search: '',
        color: 'red',
      }
  },

  components: {
    'entreprise-table' : EntTable,
    'globEnt-table' : GlobEntTable,
    'assure-table' : AssTable,
    'contrat-table' : ContTable,
    'cotisation-table' : CotTable,
    'holding-table' : HolTable,
    'prestation-table' : PresTable,
  },
  methods: {
    show (param) {
      this.currentView = param
    },

    holdEntContFilter () {
      this.holdEntCon = this.$store.state.holdEntCont
      this.currentView = 'contrat-table'
    },
    holdEntFilter () {
      this.holdEnt = this.$store.state.holdEnt
      console.log(this.holdEnt, 'holdent')
      this.currentView = 'entreprise-table'
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
        let eAdd = {noH: d.noH}
        return d.entreprises.filter(e => {
          e.noH = d.noH
          this.entreprisesAll.push(e)
        })
      })
    },
    modifyData (data, filter) {

        // data.iCc = data.iC[filter]
        // data.iAa = data.iA[filter]
        // data.iBb = data.iB[filter]
        // data.iPrr = data.iPr[filter]
        // data.iCoo = data.iCo[filter]

        data.iCc = 2
        data.iAa = 2
        data.iBb = 2
        data.iPrr = 2
        data.iCoo = 2
    }
  },
  computed: {
    holdEntContrats () {
      let spaEr = this.spa + this.eR;
        return this.holdEntCon.filter(e => {
        if (e.t === spaEr) {
          return e
        } else return
      })
    }
    ,
    holdEntreprise () {
      let spaEr = this.spa + this.eR;
      return this.holdEnt.filter(e => {
        this.modifyData(e, 2);

        // e.iCc = e.iC[spaEr]
        // e.iAa = e.iA[spaEr]
        // e.iBb = e.iB[spaEr]
        // e.iPrr = e.iPr[spaEr]
        // e.iCoo = e.iCo[spaEr]

        // if (e.iC[spaEr] > 0) {
          if (e.iCc > 0) {
          return e
        } else return
      })
    },
    entreprises () {
      let spaEr = this.spa + this.eR;
      return this.entreprisesAll.filter(e => {

        e.iCc = 2
        e.iAa = 2
        e.iBb = 2
        e.iPrr = 2
        e.iCoo = 2

        // e.iCc = e.iC[spaEr]
        // e.iAa = e.iA[spaEr]
        // e.iBb = e.iB[spaEr]
        // e.iPrr = e.iPr[spaEr]
        // e.iCoo = e.iCo[spaEr]

        return e
      })
    },
    holdings () {
      let spaEr = this.spa + this.eR;
      return this.holdingsAll.filter( h => {

        h.iEe = 1
        h.iCc = 1
        h.iAa = 1
        h.iBb = 1
        h.iPrr = 1
        h.iCoo = 1

        // h.iEe = h.iE[spaEr]
        // h.iCc = h.iC[spaEr]
        // h.iAa = h.iA[spaEr]
        // h.iBb = h.iB[spaEr]
        // h.iPrr = h.iPr[spaEr]
        // h.iCoo = h.iCo[spaEr]

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
      height: 100%;
    }
  }
}
.active {
  background: rgba(13, 151, 151, 0.582)!important;
  outline: none;
}
.active2 {
  background: rgba(111, 73, 182, 0.397)!important;
  outline: none;
}
.active3 {
  background: rgba(99, 157, 196, 0.651)!important;
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
.fisActive {
  background-color: white;
  cursor: default
}
.isActive {
  color: rgb(104, 103, 103);
  cursor: default
}
.wrapping-search {
  padding: 0px 40px 0px 40px;
}
.inner-button {
  padding: 0 10px;
  margin-right: 10px;
  font-weight: 700;
}
</style>
