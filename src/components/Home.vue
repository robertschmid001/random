<template>
  <div id="home">

    <div class="button-wrapper">
      <button v-bind:class="{ isActive: currentTab == 's' }" class="header-button pointer" @click="switchTab('s')">Santé</button>
      <button v-bind:class="{ isActive: currentTab == 'p' }" class="header-button pointer" @click="switchTab('p')">Prévoyance</button>
      <button v-bind:class="{ isActive: currentTab == 'a' }" class="header-button pointer" @click="switchTab('a')">Autres risques</button>
    </div>

    <el-row>
        <el-col class="box" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <div class="white height-square xtrapadding  height300">
              <h3 class="h3">Synthèse de mon Portefeuille Client</h3>
              <div class="content-text">
                Consulter les données clefs de mon portefeuille clients (holdings, entreprises, contrats, cotisations, assurés)
                et Créer un graphique sur-mesure en sélectionnant les données souhaitées de mon portefeuille.
              </div>
              <div class="voir-wrapper">
                <router-link class="router-class " to="/portefeuille">
                  <div class="voir isCLickable pointer">Voir <i class="el-icon-d-arrow-right"></i></div>
                </router-link>
              </div>
              <div v-if="this.currentTab ==='s'">
                <el-row>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol blue box-colored width-small"><div><div class="number">{{info.holdingCountSante}}</div><div class="box-text">Holding</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderent purple box-colored width-small"><div><div class="number">{{info.EntrepriseCountSante}}</div><div class="box-text">Entreprises</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol orange box-colored width-small"><div><div class="number">{{info.ContratCountSante}}</div><div class="box-text">Contrats</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol red box-colored width-small"><br><div><div class="number">{{formatAB(info.ABCountSante)}}</div><div class="box-text">Assurés<br>Bénéficiaires</div></div></div></el-col>
                  <el-col :xs="8" :sm="12" :md="12" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol green box-colored width-small"><div><div class="number">{{formatCurrency(info.prestaSante)}}</div><div class="box-text">Prestations</div></div></div></el-col>
                  <el-col :xs="8" :sm="12" :md="12" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol lgt-green box-colored width-small"><div><div class="number">{{formatCurrency(info.cotiSante)}}</div><div class="box-text">Cotisations</div></div></div></el-col>
                </el-row>
              </div>
              <div v-if="this.currentTab ==='p'">
                <el-row>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol blue box-colored width-small"><div><div class="number">{{info.holdingCountPrev}}</div><div class="box-text">Holding</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderent purple box-colored width-small"><div><div class="number">{{info.EntrepriseCountPrev}}</div><div class="box-text">Entreprises</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol orange box-colored width-small"><div><div class="number">{{info.ContratCountPrev}}</div><div class="box-text">Contrats</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol red box-colored width-small"><br><div><div class="number">{{formatAB(info.ABCountPrev)}}</div><div class="box-text">Assurés<br>Bénéficiaires</div></div></div></el-col>
                  <el-col :xs="8" :sm="12" :md="12" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol green box-colored width-small"><div><div class="number">{{formatCurrency(info.prestaPrevoyance)}}</div><div class="box-text">Prestations</div></div></div></el-col>
                  <el-col :xs="8" :sm="12" :md="12" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol lgt-green box-colored width-small"><div><div class="number">{{formatCurrency(info.cotiPrevoyance)}}</div><div class="box-text">Cotisations</div></div></div></el-col>
                </el-row>
              </div>
              <div v-if="this.currentTab ==='a'">
                <el-row>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol blue box-colored width-small"><div><div class="number">{{info.holdingCountAutre}}</div><div class="box-text">Holding</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderent purple box-colored width-small"><div><div class="number">{{info.EntrepriseCountAutre}}</div><div class="box-text">Entreprises</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol orange box-colored width-small"><div><div class="number">{{info.ContratCountAutre}}</div><div class="box-text">Contrats</div></div></div></el-col>
                  <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol red box-colored width-small"><br><div><div class="number">{{formatAB(info.ABCountAutre)}}</div><div class="box-text">Assurés<br>Bénéficiaires</div></div></div></el-col>
                  <el-col :xs="8" :sm="12" :md="12" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol green box-colored width-small"><div><div class="number">{{formatCurrency(info.prestaAutre)}}</div><div class="box-text">Prestations</div></div></div></el-col>
                  <el-col :xs="8" :sm="12" :md="12" :lg="4" :xl="4" class="box-padding"><div class="radius borderhol lgt-green box-colored width-small"><div><div class="number">{{formatCurrency(info.cotiAutre)}}</div><div class="box-text">Cotisations</div></div></div></el-col>
                </el-row>
              </div>
          </div>
        </el-col>
        <el-col class="box" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="white padding height300">
            <h3 class="activity-title">Mon activité des 6 derniers mois</h3>
            <el-row class="activity-wrapper">
              <el-col :span="24" class="line-height">
                <div @click="newEnt"><el-row class="border-bot pointer isCLickable"><el-col :span="18" class="act-cont align-left">Affaires nouvelles</el-col><el-col :span="6" class="act-num align-right">{{info.affairesNouvelles}}</el-col></el-row></div>
                <div @click="resEnt"><el-row class="border-bot pointer isCLickable"><el-col :span="18" class="act-cont align-left">Résiliations</el-col><el-col :span="6" class="act-num align-right">{{info.resilations}}</el-col></el-row></div>
                <div @click="cotEn"><el-row class="border-bot pointer isCLickable"><el-col :span="14" class="act-cont align-left">Cotisations encaissées</el-col><el-col :span="10" class="act-num align-right">{{formatCurrency(info.cotiEncaiss)}}</el-col></el-row></div>
                <div @click="impCot"><el-row v-bind:class="{ active: isImp }" class="border-bot isCLickable"><el-col :span="21" class="act-cont align-left">Cotisations impayées</el-col><el-col :span="3" class="act-num align-right">{{formatImp(info.cotiNoPay)}}</el-col></el-row></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      <el-col class="box" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <div class="white padding">
          <h3 class="activity-title h3">Bibliothèque de documents</h3>
            <div class="content-text">
              Accéder aux documents utiles à mon activité.
            </div>
            <div class="xtra-icon-pad"></div>
            <div class="voir-wrapper">
              <router-link class="router-class" to="/documents">
                <div class="voir isCLickable pointer">Voir <i class="el-icon-d-arrow-right"></i></div>
              </router-link>
            </div>
            <div><font-awesome-icon icon="file-alt" class="icon-size xtra-icon-pad"/></div>
        </div>
      </el-col>
      <el-col class="box" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <div class="white padding">
          <h3 class="activity-title h3">Outil d'extraction en « cours de réalisation »</h3>
            <div class="content-text">
              Rechercher en dashboarding les données de mon portefeuille et les exporter au format Excel.
            </div>
            <!-- <div class="voir">Voir >></div> -->
            <el-row class="ext-cont-wrap">
              <el-col :span="6">
                <font-awesome-icon icon="file-export" class="icon-size extrIcon"/>
              </el-col>
              <el-col :span="18" class="greyed">
                <el-col :span="24" class="ext-wrap">
                  <div class="cont-pad">Extraire des prestations</div><div class="arrow"><i class="el-icon-arrow-right"></i></div>
                </el-col>
                <el-col :span="24" class="ext-wrap">
                  <div  class="cont-pad">Extraire des cotisations</div><div class="arrow"><i class="el-icon-arrow-right"></i></div>
                </el-col>
                <el-col :span="24" class="ext-wrap">
                  <div  class="cont-pad">Extraire des assurés</div><div class="arrow"><i class="el-icon-arrow-right"></i></div>
                </el-col>
                <el-col :span="24" class="ext-wrap">
                  <div  class="cont-pad">Extraire des contrats</div><div class="arrow"><i class="el-icon-arrow-right"></i></div>
                </el-col>
              </el-col>
            </el-row>
<!-- en cours de realisation
@click="routeTo('prest')"
@click="routeTo('cot')"
@click="routeTo('ass')"
@click="routeTo('cont')" -->

        </div>
      </el-col>
      <el-col class="box" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <div class="white padding">
          <h3 class="activity-title h3">Recherche d'un assuré</h3>
            <div class="content-text">
              Consulter les données de l'assuré et télécharger sa carte Tiers-payant.
            </div>
            <div class="voir-wrapper">
              <router-link class="router-class" to="/recherche">
                <div class="voir isCLickable pointer">Voir <i class="el-icon-d-arrow-right"></i></div>
              </router-link>
            </div>
            <div><font-awesome-icon icon="user-friends" class="icon-size"/></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash';

export default {
  name: 'Home',
  props: {
    msg: String
  },
  data () {
    return {
      info : this.$store.state.Main,
      isImp : false,
      currentTab : this.$store.state.spa
    }
  },
  computed: {
    getSpa () {
      var filtre = this.$store.state.spa;
      return filtre
    }
  },
  watch: {
    // call again the method if the route changes
    // '$route': 'fetchData',
    // $route (to, from) {
    //   if(to.name === 'Accueil') {
    //     console.log('to accueil')
    //   }
    // }
  },
  methods: {
    formatCurrency (param) {
        if (param != null) {
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(param)
        } else return 0.00 + ' €'
    },
    formatAB (data) {
      if (data) return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    formatCoti (data) {
      if (data === null) {
        return 0
      } else return data
    },
    switchTab (data) {
      this.$store.state.spa = data
      this.currentTab = data
    },
    // fetchData (to, from) {
    //   console.log(to, from, '<= do that ')
    // },
    routeTo (param) {
      if (param === 'prest') { this.$store.state.extrType = 'prestations'; return this.$router.push({ name: 'Extraction', params:{type: 'prestations'} }) }
      if (param === 'cot') { this.$store.state.extrType = 'cotisations'; return this.$router.push({ name: 'Extraction', params:{type: 'cotisations'} }) }
      if (param === 'cont') { this.$store.state.extrType = 'contrats'; return this.$router.push({ name: 'Extraction', params:{type: 'contrats'} }) }
      if (param === 'ass') { this.$store.state.extrType = 'assures'; return this.$router.push({ name: 'Extraction', params:{type: 'assures'} }) }
    },
    formatImp (param) {
      if (param > 0) {
        this.isImp = true
        return 'Oui'
      } else return 'Non'
    },
    impCot () {
      if (this.isImp ) {
        var cotFilter = this.$store.state.cotisations
        var filteredCotisation = []
            cotFilter.forEach(e => {
              if (e.s == '2' || e.s == '3' ) {
                  filteredCotisation.push(e)
              }
            })
        this.$store.state.filteredCotisations = filteredCotisation
        this.$router.push({ name: 'cotisations' })
      }
    },
    newEnt () {
        var filteredEnt = []
        this.$store.state.holdings.forEach(e => {
        e.entreprises.forEach(f => {
          if ( f.de !== '00/00/0000') {
            var date = moment(f.de, 'DD/MM/YYYY')
            console.log(date, 'date')
            console.log(f.de, 'f.de')
            console.log(moment(), 'moment()')
            console.log(moment().subtract(6, 'months'))
          if (moment(date) >= moment().subtract(6, 'months')) {
            filteredEnt.push(f)
          }
          }
        })
      })
      this.$store.state.holdEnt = filteredEnt
      this.$router.push({ name: 'entreprise' })
    },
    resEnt () {
        var filteredEnt = []
        this.$store.state.holdings.forEach(e => {
        e.entreprises.forEach(f => {
          if ( f.ds !== '00/00/0000') {
            var date = moment(f.ds, 'DD/MM/YYYY')
            if (moment(date) >= moment().subtract(6, 'months')) {
              filteredEnt.push(f)
            }
          }
        })
      })
      this.$store.state.eR = 'r'
      this.$store.state.holdEnt = filteredEnt
      this.$router.push({ name: 'entreprise' })
    },
    cotEn () {
      var cotFilter = this.$store.state.cotisations
      var filteredCotisation = []
          cotFilter.forEach(e => {
            var date = moment(e.de, 'DD/MM/YYYY')
            if (moment(date) >= moment().subtract(6, 'months')) {
              filteredCotisation.push(e)
            }
          })
      this.$store.state.filteredCotisations = filteredCotisation
      this.$router.push({ name: 'cotisations' })
    },
    formatCot () {
      var cotFilter = this.$store.state.cotisations
      this.$store.state.holdings.forEach(e => {
        e.entreprises.forEach(f => {
          if (f.contracts !== false) { 
            f.contracts.forEach( g => {
              _.find(cotFilter, function(cot){
                if (cot.h === e.nuH && cot.e === f.nuC && cot.c === g.n) {
                  cot.noH = e.noH
                  cot.nuH = e.nuH
                  cot.noC = f.noC
                  cot.nuC = f.nuC
                  cot.l = g.l
                  cot.l1 = g.l1
                  cot.l2 = g.l2
                }
              })
            })
          }
        })
      })
      this.$store.state.cotisations = cotFilter
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
        this.formatCot();
        this.info = this.$store.state.Main
        this.$store.state.fullscreenLoading = false;
      }, 5000);
    }
  },
  mounted () {
    // this.formatCot();
    // console.log(this.info.ABCountSante.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),'regex to string')
    // console.log(this.info.ABCountSante.toLocaleString(), '.toLocaleString()')
    this.currentTab = this.$store.state.spa;
  },
  created () {
    if (this.$store.state.Main.length === 0 || this.$store.state.holdings.length === 0 ) return this.setData();
    if (this.$store.state.Main.length > 0 || this.$store.state.holdings.length > 0 ) return this.formatCot();
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
.button-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px 10px 0 10px;
  height: 40px;
}
.active {
  cursor: pointer;
}
.cont-pad {
  padding-left: 20px;
  text-align: left;
  width: 80%;
  color: $button-color;
}
.isActive {
  background: $button-color!important;
  outline: none;
}
.header-button {
  padding: 0 20px;
  max-width: 250px;
  border-style: none;
  color: white;
  font-weight: 550;
  height: 100%;
  margin: 0 3px 0 3px;
  background: rgba(13, 151, 151, 0.582);
  border-radius: 7px;
}
.extrIcon {
  height: 100%;
  color: black;
}
.arrow {
  display: flex;
  width: 20%;
  justify-content: flex-end;
  padding-right: 10px;
  color: $button-color;
}
.ext-wrap {
  padding: 5px 0;
  display: flex;
  flex-direction: row;
}
.ext-cont-wrap{
  display: flex;
  padding-top: 20px;

}
a {
  color: black;
  text-decoration: none!important;
}
.box-padding {
  padding: 5px;
  box-sizing: border-box;
}
.height300 {
  height: auto;
}
.isCLickable {

}
.isCLickable:hover {
  // outline: 2px dashed $button-color;
    background-color: $button-color;
  color: white;
  h3 {
    color: white
  }
  div {
    color: white;
  }
  .red {
    border: 1.5px solid white;
  }
  .orange {
    border: 1.5px solid white;
  }
  .blue {
    border: 1.5px solid white;
  }
  .purple {
    border: 1.5px solid white;
  }
  .lgt-green {
    border: 1.5px solid white;
  }
  .green {
    border: 1.5px solid white;
  }
}
.icon-size {
  font-size: 65px;
  // padding-bottom: 25px;
}
.activity-title {
  padding: 20px 0;
  box-sizing: border-box;
}
.activity-wrapper {
  padding-top: 20px;
}
.xtra-icon-pad {
  padding-top: 9px;
}
h3 {
  margin:0;
}
.xtrapadding {
  padding: 20px 10px;
}
.padding {
  padding: 20px 20px;
}
.el-row-cot {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.line-height {
  line-height: 3.19em;
  font-size: 14px;
}
.border-bot {
  border-bottom: 1px solid $button-color;
  padding: 0 5px;
}
.number {
  width: 100%;
  font-size: 13px;
  padding-bottom: 3px;
  box-sizing: border-box;
}
.box-text {
  font-size: 14px;
  padding-top: 10px;
}
.voir {
  width: 50px;
  border-radius: 7px;
  padding: 6px 10px;
  font-size: 13px;
  color: $button-color;
  font-weight: 600;
}
.radius {
  border-radius: 15px;
}
.content-text {
  padding-top: 21px;
  font-size: 16px;
}
.box {
  padding: 10px;
  display: flex;
}
.voir-wrapper {
  padding: 30px 0;
  justify-content: center;
  display: flex;
}
// .width-small {
//   width: 70px;
// }
.box-colored {
  display: flex;
  height: 100px;
  padding: 20px 5px 5px 5px;
  justify-content: center;
  box-sizing: border-box;
}
.h3 {
  color: $button-color;
}
.white {
  background-color: white;
  width: 100%;
  min-height: 300px;
}
#home {
  padding-bottom: 50px;
  text-align: center;
  box-sizing: border-box;
  // padding: 0px 10px 35px 10px;
}
</style>
