<template>
  <div id="portefeuille">
    <div class="header" :class="[{active: spa == 's'},{active2: spa == 'p'},{active3: spa == 'a'}]">
      <button class="header-button pointer" :class="{ active: spa == 's' }"  @click="spaFilter('s')">Santé</button>
      <button class="header-button pointer" :class="{ active2: spa == 'p' }" @click="spaFilter('p')">Prévoyance</button>
      <button class="header-button pointer" :class="{ active3: spa == 'a' }" @click="spaFilter('a')">Autres risques</button>
    </div>
    <div class="type-wrapping" v-if="matchingRoute">
      <div class="type-title pointer" v-bind:class="{ isActive: currentView == 'holding-table' }" @click="swapType('holding-table')">Liste des Holdings</div>
      <div class="type-title pointer" v-bind:class="{ isActive: currentView == 'globEnt-table' }" @click="swapType('globEnt-table')">Liste des Entreprises</div>
    </div>
    <div class="breadcrumbs" v-else>
      <ul>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/portefeuille' }" ><span @click="tableSwitch($route.name)" class="eachBread">{{'MON PORTEFEUILLE CLIENT'}}</span></el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.params.hol"><span class="eachBread" @click="changeTable('hol')" >{{this.$route.params.hol.toUpperCase()}}</span></el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.params.ent"><span class="eachBread" @click="changeTable('ent')">{{this.$route.params.ent.toUpperCase()}}</span></el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$route.params.cont"><span class="eachBread" @click="changeTable('cont')">{{this.$route.params.cont.toUpperCase()}}</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="eachBread">{{this.$route.name.toUpperCase()}}</span></el-breadcrumb-item>
        </el-breadcrumb>
      </ul>
    </div>
    <!-- <el-button @click="LOG">LOGGING</el-button> -->
    <div class="wrapping-search" v-show="this.currentView != 'chart-hub'" >
      <button class="button inner-button btnER" v-bind:class="{ fisActive: eR == 'r' }" @click="erFilter('e')">En cours</button>
      <button class="button inner-button btnER" v-bind:class="{ fisActive: eR == 'e' }" @click="erFilter('r')">Résiliés</button>
      <div class='input-search'>
        <input type="text" class="base-input search" v-model.trim.lazy="preSearch" placeholder="Rechercher">
        <div class="porte-icon pointer" @click="confirmSearch">
          <i class="el-icon-search"></i>
        </div>
      </div>
    </div>
    <transition name="fade">
      <router-view v-loading="loading" :search="prepSearch" :actResilie="isResilie" :actFilter="activeFilter" :cotisation="cotisations" :holdings="holdings" :contrats="holdEntContrats" :entreprises="entreprises" :assure="globalAssure" :holdEntreprise="holdEntreprise" @holdEntRow="holdEntFilter" @holdContRow="holdEntContFilter" @enterAssure="assureFilter" @enterCotisation="cotisationFilter" ></router-view>
    </transition>
    <!-- <button class="buttonlog" @click="log" >.</button> -->
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
import ChartHub from "./_subs/charts/ChartHub.vue"

// import { mapGetters } from 'vuex'

export default {
  name: 'Portefeuille',
  data () {
      return {
        searcher: '',
        preSearch: '',
        holdingsAll: [],
        entreprisesAll: [],
        holdEnt: [],
        holdEntCon: [],
        filteredAssure: [],
        breadArray: [],
        breadAlt:'',
        multSelect: this.$store.state.multSelectStore,
        currentView: 'holding-table',
        spa: this.$store.state.spa,
        eR: this.$store.state.eR,
        bottomPop: true,
        loading: false
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
    'chart-hub' : ChartHub,
  },
  // watch: {
  //   // call again the method if the route changes
  //   '$route': 'fetchData',
  // },
  //holdEntRow
  methods: {
    log () {
      // console.log(this.$router, 'router')
      // console.log(this.$route, "here")
      // console.log(this.holdEnt, 'this.holdEnt')
      // console.log(this.$store.state.holdEnt, 'STORE holdEnt')
    },
    confirmSearch () {
      this.searcher = this.preSearch
      return this.searcher
    },
    changeTable (param) {
      if (param === 'hol') {return this.$router.push({ name: 'Mon Portefeuille clients', params:{hol: this.$route.params.hol, nuH: this.$route.params.nuH} })}
      if (param === 'ent') {return this.$router.push({ name: 'entreprise', params:{hol: this.holdEnt[0].noH.toLowerCase(), nuH: this.holdEnt[0].nuH.toLowerCase()} })}
      if (param === 'cont') {return this.$router.push({ name: 'contrats', params:{hol: this.$store.state.holdEntCont[0].noH.toLowerCase(), nuH: this.$store.state.holdEntCont[0].nuH, ent: this.$store.state.holdEntCont[0].noC.toLowerCase(), nuC: this.$store.state.holdEntCont[0].nuC}})}
    },
    // LOG () {

    // },
    // fetchData (to, from) {
    //   // console.log(to, from, 'do this =>')
    // },
    getSelection () {
      // console.log(this.multSelect,'multiselect')
    },
    chart (param) {
      this.currentView = param
    },
    tableSwitch (route) {
      if(route === this.currentView) {
        return
      }
      if(route === this.$route.name && route.toUpperCase() === 'MON PORTEFEUILLE CLIENTS') {
        this.currentView = 'holding-table'
        return
      }
      this.currentView = route
      return
    },

    show (param) {
      this.currentView = param
    },
    cotisationFilter () {
        this.currentView = 'cotisation-table'
    },
    assureFilter () {
      this.currentView = 'assure-table'
    },
    holdEntContFilter () {
      this.holdEntCon = this.$store.state.holdEntCont;
      this.currentView = 'contrat-table'
    },
    holdEntFilter () {
      this.holdEnt = this.$store.state.holdEnt
      this.currentView = 'entreprise-table'
      this.$router.push({ name: 'entreprise', params:{hol: this.holdEnt[0].noH.toLowerCase(), nuH: this.holdEnt[0].nuH.toLowerCase()} })
    },
    swapType (param) {
      if (param === 'globEnt-table' ) {
        this.$router.push({ name: 'Toutes les entreprises'})
      } else {
        this.$router.push({ name: 'Mon Portefeuille clients'})
      }
      this.currentView = param
      this.breadArray.splice(0)
    },
    erFilter (param) {
      return this.eR = param
    },
    spaFilter (param) {
      this.$store.state.spa = param
      return this.spa = param
    },
    initEntreprise () {
      if (this.holdingsAll) {
        this.holdingsAll.filter(d => {
          return d.entreprises.filter(e => {
            e.noH = d.noH
            e.nuH = d.nuH
            this.entreprisesAll.push(e)
          })
        })
      } else return
    },
    formatCurrency (param) {
      if( param[0] != null && param[1] != null ) {
        if(param[0].match(/\u20AC/g)) return
          param[0] = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(param[0])
          param[1] = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(param[1])
      } else {
          for (var y = 0; y < param.length; y++) {
            if (!param[y]) { param[y] = 0 }
              param[y] = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(param[y])
            }
      }
          // if (param[0].match(/\u20AC/g)){return}
          // for (var y = 0; y < param.length; y++) {
          //   if (!param[y]) { param[y] = 0 }
          //     param[y] = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(param[y])
          // }
    },
    setData () {
      this.$store.state.fullscreenLoading = true;
      this.getInfoAccueil();
      this.getTranslation();
      this.getCabinets();
      this.getCotisation();
      this.getAssure();
      this.getAppel();
      this.getDocs();
      this.getCourtierDocs();
      setTimeout(() => {
        this.holdingsAll = this.$store.state.holdings
        this.initEntreprise();
        this.$store.state.fullscreenLoading = false;
      }, 2000);
    }
  },
  computed: {
    prepSearch () {
      var search = this.preSearch
      return search
    },
    searchComp () {
      var search = this.searcher
      return search
    },
    activeFilter(){
      let activeFilt = this.spa
      return activeFilt
    },
    isResilie(){
      let resilie = this.eR
      return resilie
    },
    matchingRoute () {
      if(this.$route.name === "Mon Portefeuille clients" || this.$route.name === "Toutes les entreprises" ){
        return true
        } else {return false}
    },
    cotisations () {
      console.log('cotisations port:comp')
      let spaEr = this.spa + this.eR;
      var filteredCotisations = this.$store.state.filteredCotisations;
        return filteredCotisations.filter(e => {
          if (e.ct === spaEr) {
            console.log(spaEr, 'spaEr.cotisations')
            console.log(e, 'e.cotisations')
            return e
          } else return
        })
    },
    globalAssure () {
      console.log('globalAssure port:comp')
      let spaEr = this.spa + this.eR;
      var filteredAssure = this.$store.state.filteredAssures
        return filteredAssure.filter(e => {
        // if (e.c.t === spaEr) {
          if (this.eR === 'e' && e.v == 1 && e.c.t === spaEr) {
            return e
          }
          if (this.eR === 'r' && e.v == 0 && e.c.t === spaEr) {
            return e
          }
      })
    },
    holdEntContrats () {
      console.log('holdEntContrats port:comp')
      let spaEr = this.spa + this.eR;
        return this.holdEntCon.filter(e => {
        if (e.t === spaEr) {
          this.formatCurrency(e.c);
          this.formatCurrency(e.p);
          return e
        } else return
      })
    }
    ,
    holdEntreprise () {
      console.log('holdEntreprise port:comp')
      let spaEr = this.spa + this.eR;
      return this.holdEnt.filter(e => {
        e.iCc = e.iC[spaEr]
        e.iAa = e.iA[spaEr]
        e.iBb = e.iB[spaEr]
        e.iPrr = e.iPr[spaEr]
        e.iCoo = e.iCo[spaEr]
        e.iTt = e.iT[spaEr]
        if (e.iC[spaEr] > 0) {
          return e
        } else return
      })
    },
    entreprises () {
      console.log('entreprises port:comp')
      let spaEr = this.spa + this.eR;
      return this.entreprisesAll.filter(e => {
        e.iCc = e.iC[spaEr]
        e.iAa = e.iA[spaEr]
        e.iBb = e.iB[spaEr]
        e.iPrr = e.iPr[spaEr]
        e.iCoo = e.iCo[spaEr]
        e.iTt = e.iT[spaEr]
        if(e.iCc > 0){
          this.formatCurrency(e.iCoo);
          this.formatCurrency(e.iPrr);
          return e
        }
      })
    },
    holdings () {
      console.log('holdings port:comp')
      if (this.holdingsAll) {
        let spaEr = this.spa + this.eR;
        return this.holdingsAll.filter( h => {
          h.iEe = h.iE[spaEr]
          h.iCc = h.iC[spaEr]
          h.iAa = h.iA[spaEr]
          h.iBb = h.iB[spaEr]
          h.iPrr = h.iPr[spaEr]
          h.iCoo = h.iCo[spaEr]
          h.iTt = h.iT[spaEr]
          if(h.iEe > 0){
            this.formatCurrency(h.iCoo);
            this.formatCurrency(h.iPrr);
            return h
          }
        })
      }
    },
  },
  mounted () {
    this.initEntreprise();
  },
  created () {
    this.holdingsAll = this.$store.state.holdings
    if (this.$store.state.Main.length === 0 || this.$store.state.holdings.length === 0 ) return this.setData();
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";
.porte-icon {
    position: relative;
    right: 35px;
    top: 0px;
    display: flex;
    font-weight: 800;
    align-items: center;
    height: 35px;
    width: 35px;
    border-radius: 0 7px 7px 0;
    justify-content: center;
}
.porte-icon:hover {
  background-color: $button-color;
  color: white;
}
.input-search {
  position: relative;
  display: flex;
}

.fade-enter-active {
  transition: opacity .8s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.buttonlog {
  position: absolute;
  bottom: 30px;
  background-color: lightgrey;
  outline: none;
  border: none;
}


#portefeuille {
  background-color: white;
  // height: auto;
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
ul {
  margin: 0;
}
.search {
  width: 200px
}
.breadcrumbs {
  height: 81.8px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  align-items: center;
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
  background-color:  rgb(243, 240, 240);
  color: rgb(104, 103, 103);
  border: 1px solid rgb(104, 103, 103)!important;
  cursor: pointer;
}
.fisActive:hover {
  background-color: white;
}
.isActive {
  color: rgb(104, 103, 103);
}
.wrapping-search {
  padding: 10px 40px 10px 40px;
  display: flex;
}
.inner-button {
  padding: 0 10px;
  margin-right: 10px;
  font-weight: 700;
}
.eachBread {
 cursor: pointer;
 font-weight: 400;
 color: rgb(104, 103, 103);
}
.eachBread:hover {
  color: $button-color;
}
</style>
