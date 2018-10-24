<template>
  <div id="sante">
    <div v-show="!activeAssures">
      <div class="type-wrapping">
        <div class="type-title" v-bind:class="{ isActive: tableType }" @click="swapType(true)">{{this.tableNameT}}</div>
        <div class="type-title" v-show="this.tableNameT='Lite des Holdins'" v-bind:class="{ isActive: !tableType }" @click="swapType(false)">Liste des Entreprises</div>
      </div>
      <div v-if="this.tableType">
        <div class="wrapping-search">
          <el-button class="button inner-button"  @click="toggleSelection([holdings[1], holdings[2]])">En cours</el-button>
          <el-button class="button inner-button" @click="toggleSelection()">Résiliés</el-button>
        </div>
        <transition name="slide-in">
          <div class="table-wrapping" v-show="holdingTable">
            <el-table ref="multipleTable" :data="holdings" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="h-border">
              <el-table-column type="selection" width="42"></el-table-column>
              <el-table-column property="name" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt" @click="showEntreprise(scope.row.entreprises, 'hold')">{{scope.row.name}}</div></template></el-table-column>
              <el-table-column property="entreprises.length" label="ENTREPRISES" sortable width="117"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprises.length}}</div></template></el-table-column>
              <el-table-column property="contrats.length" label="CONTRATS" sortable width="100"><template scope="scope"><div @click="showContrats(scope.row.entreprises, 'hcont')" class="data-wrapper pointer md-txt">{{contratsLength(scope.row.entreprises, 'hcontl')}}</div></template></el-table-column>
              <el-table-column property="beneficiaire" label="ASSURES ET BENEFICIAIRES" width="160"><template scope="scope" ><div @click="showContrats(scope.row.entreprises, 'hben')" class="data-wrapper pointer md-txt">{{contratsLength(scope.row.entreprises, 'hbenl')}}</div></template></el-table-column>
              <el-table-column property="totalCotisations" label="COTISATIONS" sortable width="115">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <span>date: {{ scope.row.entreprises[0].cotisations }}</span>
                    <div slot="reference" class="name-wrapper"><div @click="showContrats(scope.row.entreprises, 'hcot')" class="data-wrapper pointer md-txt">{{scope.row.entreprises[0].cotisations}}</div></div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column property="totalPrestations" label="PRESTATIONS" sortable width="115"><template scope="scope" ><div @click="showContrats(scope.row.entreprises, 'hprest')" class="data-wrapper pointer md-txt">{{scope.row.entreprises[0].prestations}}</div></template></el-table-column>
              <el-table-column property="totalTauxTele" label="TAUX TELETRANSMISSION" sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.totalTauxTele"></el-progress></template></el-table-column>
              <el-table-column property="documents" label="DOCUMENTS" width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export"/></template></el-table-column>
              <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export" @click="openTypa" /></template></el-table-column>
            </el-table>
          </div>
        </transition>

        <transition name="slide-in">
            <div class="table-wrapping" v-show="entrepriseTable">
              <el-table ref="multipleTable" :data="activeEntreprise" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="e-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="name" label="ENTREPRISES" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt" @click="openEnt(scope.row)">{{scope.row.name}}</div></template></el-table-column>
                <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable width="100"><template scope="scope" ><div class="data-wrapper pointer md-txt" @click="showContrats(scope.row, 'econt')">{{contratsLength(scope.row,'econtl')}}</div></template></el-table-column>
                <el-table-column property="beneficiaire" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="160"><template scope="scope" ><div @click="showContrats(scope.row, 'heben')" class="data-wrapper pointer md-txt">{{contratsLength(scope.row, 'ebenl')}}</div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="115"><template scope="scope"><div class="md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
                <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="115"><template scope="scope"><div class="md-txt">{{scope.row.prestations}}</div></template></el-table-column>
                <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions"></el-progress></template></el-table-column>
                <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export"/></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="contratsTable">
              <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="c-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
                <el-table-column property="type" label="TYPE CONTRAT" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
                <el-table-column property="assureur" label="ASSUREUR" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.assureur}}</div></template></el-table-column>
                <el-table-column property="reseauDeSoin" label="RESEAU DE SOIN" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.reseauDeSoin}}</div></template></el-table-column>
                <el-table-column property="debut" label="DEBUT" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.debut}}</div></template></el-table-column>
                <el-table-column property="fin" label="FIN" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fin}}</div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
                <el-table-column property="prestations" label="PRESTATIONS" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.prestations}}</div></template></el-table-column>
                <el-table-column property="tauxCotisations" label="TAUX DE COTISATIONS" sortable><template scope="scope" ><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxCotisations"></el-progress></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="cotTable">
              <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="cot-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="holding" label="HOLDING" sortable><template scope="scope" ><div class="data-wrapper md-txt">Holding</div></template></el-table-column>
                <el-table-column property="entreprise" label="ENTREPRISE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprise}}</div></template></el-table-column>
                <el-table-column property="type" label="TYPE CONTRAT" sortable><template scope="scope" ><div class="data-wrappe md-txtr">{{scope.row.type}}</div></template></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
                <el-table-column property="periode" label="PERIODE" sortable><template scope="scope" ><div class="data-wrapper md-txt">Periode</div></template></el-table-column>
                <el-table-column property="debut" label="DEBUT PERIODE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.debut}}</div></template></el-table-column>
                <el-table-column property="fin" label="FIN PERIODE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fin}}</div></template></el-table-column>
                <el-table-column property="montant" label="MONTANT ENCAISSE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.montant}}</div></template></el-table-column>
                <el-table-column property="status" label="STATUT COTISATION" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.status}}</div></template></el-table-column>
                <el-table-column property="dsn" label="DSN" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.dsn}}</div></template></el-table-column>
                <el-table-column property="reglement" label="MODE DE REGLEMENT" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.reglement}}</div></template></el-table-column>
                <el-table-column property="relance" label="REVERSEMENT COMPAGNIE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.relance}}</div></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="prestTable">
              <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="p-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="holding" label="HOLDING" sortable><template scope="scope" ><div class="data-wrapper md-txt">Holding</div></template></el-table-column>
                <el-table-column property="entreprise" label="ENTREPRISE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprise}}</div></template></el-table-column>
                <el-table-column property="type" label="TYPE CONTRAT" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
                <el-table-column property="montant" label="MONTANT PRESTATIONS REGLEES" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.montant}}</div></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="assuresTable">
              <el-table ref="multipleTable" :data="hAssures" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="a-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="name" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt" @click="openAssures(scope.row)">{{scope.row.name}}</div></template></el-table-column>
                <el-table-column property="birthdate" label="birthdate" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.birthdate}}</div></template></el-table-column>
                <el-table-column property="numSecu" label="numSecu" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.numSecu}}</div></template></el-table-column>
                <el-table-column property="beneficiaires" label="beneficiaires" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.beneficiaires}}</div></template></el-table-column>
                <el-table-column property="regime" label="regime" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.regime}}</div></template></el-table-column>
                <el-table-column property="teletransmission" label="teletransmission" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.teletransmission}}</div></template></el-table-column>
                <el-table-column property="carte" label="carte" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.carte}}</div></template></el-table-column>
                <el-table-column property="Documents" label="Documents" sortable><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export"/></template></el-table-column>
              </el-table>
            </div>
          </transition>
        <el-button @click="test"></el-button>
      </div>
      <div v-if="!this.tableType">
        <div class="wrapping-search">
          <el-button class="button inner-button"  @click="toggleSelection([holdings[1], holdings[2]])">En cours</el-button>
          <el-button class="button inner-button" @click="toggleSelection()">Résilis</el-button>
        </div>
        <div class="table-wrapping" v-show="eTable">
          <el-table ref="multipleTable" :data="this.globEntreprises" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column property="holding" label="HOLDING" sortable width="120"></el-table-column>
            <el-table-column property="name" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt" @click="openEnt(scope.row)">{{scope.row.name}}</div></template></el-table-column>
            <el-table-column property="NumSiret" label="NumSiret" sortable></el-table-column>
            <el-table-column property="entreprises" label="CONTRATS" show-overflow-tooltip sortable width="100"><template scope="scope" ><div class="data-wrapper pointer md-txt" @click="showContrats(scope.row, 'gecont')">{{contratsLength(scope.row,'econtl')}}</div></template></el-table-column>
            <el-table-column property="beneficiaire" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="160"><template scope="scope" ><div @click="showContrats(scope.row, 'eben')" class="data-wrapper pointer md-txt">{{contratsLength(scope.row, 'ebenl')}}</div></template></el-table-column>
            <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="115"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
            <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="115"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.prestations}}</div></template></el-table-column>
            <el-table-column property="tauxTele" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTele"></el-progress></template></el-table-column>
            <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export"/></template></el-table-column>
          </el-table>
        </div>
        <div class="table-wrapping" v-show="eConTable">
          <el-table ref="multipleTable" :data="this.entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column property="contrat" label="CONTRAT" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
            <el-table-column property="type" label="TYPE CONTRAT" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
            <el-table-column property="assureur" label="ASSUREUR" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.assureur}}</div></template></el-table-column>
            <el-table-column property="reseauDeSoin" label="RESEAU DE SOIN" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.reseauDeSoin}}</div></template></el-table-column>
            <el-table-column property="debut" label="DEBUT" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.debut}}</div></template></el-table-column>
            <el-table-column property="fin" label="FIN" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fin}}</div></template></el-table-column>
            <el-table-column property="cotisations" label="COTISATIONS" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
            <el-table-column property="prestations" label="PRESTATIONS" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.prestations}}</div></template></el-table-column>
            <el-table-column property="tauxCotisations" label="TAUX DE COTISATIONS" sortable><template scope="scope" ><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxCotisations"></el-progress></template></el-table-column>
          </el-table>
          </div>
        <div class="table-wrapping" v-show="eAssTable">
          <el-table ref="multipleTable" :data="this.hAssures" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column property="name" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt" @click="openAssures(scope.row)">{{scope.row.name}}</div></template></el-table-column>
            <el-table-column property="birthdate" label="birthdate" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.birthdate}}</div></template></el-table-column>
            <el-table-column property="numSecu" label="numSecu" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.numSecu}}</div></template></el-table-column>
            <el-table-column property="beneficiaires" label="beneficiaires" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.beneficiaires}}</div></template></el-table-column>
            <el-table-column property="regime" label="regime" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.regime}}</div></template></el-table-column>
            <el-table-column property="teletransmission" label="teletransmission" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.teletransmission}}</div></template></el-table-column>
            <el-table-column property="carte" label="carte" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.carte}}</div></template></el-table-column>
            <el-table-column property="Documents" label="Documents" sortable><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export"/></template></el-table-column>
          </el-table>
        </div>
      </div>
<!-- rgba(119, 78, 196, 0.6) -->
    </div>
    <div v-show="activeAssures">
      <component class="assuresComp" :is="currentView" :activeAss="activeAss" :detailsEnt="detailsEnt" keep-alive @close="close"></component>
    </div>
    <div v-show="bottomPop" class="bottom-pop-wrap">
       <div class="bottom-pop">
          <button class="button buttonDeco">Voir la selection ({{this.multipleSelection.length}})</button>
          <button class="button buttonDeco" @click="createGraph">Créer Graphique</button>
          <button class="button buttonDeco">Exporter</button>
       </div>
    </div>
    <div v-show="graphPop" class="graph-pop-wrap">
       <div class="graph-pop">
         <font-awesome-icon icon="times" class="close-icon"  @click="closeGraph"/>
            <img src="./../../../assets/image006.png" alt="">
       </div>
    </div>
    <div v-show="graphTypo" class="graph-pop-wrap">
       <div class="graph-pop">
         <font-awesome-icon icon="times" class="close-icon"  @click="closeGraph"/>
            <img src="./../../../assets/unnamed.png" alt="">
       </div>
    </div>
  </div>
</template>
<script>
import Assures from './_subs/Assures.vue'
import DetailsEntreprise from './_subs/DetailsEntreprise.vue'

export default {
  name: 'Sante',
  data () {
    return {
      tableType: true,
      holdings: this.$store.state.holdings,
      tableNameT: '',
      activeIndex: '',
      entreprises: '',
      currentView: '',
      activeEntreprise: [],
      multipleSelection: [],
      entrContrats: [],
      activeC: [],
      hAssures: [],
      globEntreprises: [],
      activeAss: [],
      detailsEnt: [],

      activeAssures: false,
      detailsEntreprise: false,
      holdingTable: true,
      entrepriseTable: false,
      contratsTable: false,
      assuresTable: false,
      gEntTable: false,
      eTable: true,
      eConTable: false,
      eAssTable: false,
      assModal: false,
      cotTable: false,
      prestTable: false,
      bottomPop: false,
      graphPop: false,
      graphTypo: false
    }
  },
  components: {
    'assures': Assures,
    'detailsEntreprise': DetailsEntreprise,
  },
  props: {
  },
  computed: {
  },
  methods: {
    openTypa () {
    this.graphTypo = true
    },
    closeGraph () {
      this.graphPop = false
      this.graphTypo = false
    },
    createGraph () {
      this.graphPop = true
    },
    close () {
      this.activeAssures = false
    },
    getEntreprises () {
      for (var i = 0; i < this.holdings.length; i++) {
        for (var y = 0; y < this.holdings[i].entreprises.length; y++) {
          this.globEntreprises.push(this.holdings[i].entreprises[y])
        }
      }
    },
    log () {
      console.log(this.hAssures, 'hAssure' )
    },
    openEnt (param) {
      this.currentView = 'detailsEntreprise'
      this.activeAssures = true
      this.detailsEnt = param
    },
    openAssures (param) {
      this.currentView = 'assures'
      this.activeAssures = true
      this.activeAss = param
    },
    closeAssures () {
      this.activeAssures = false
    },
    swapType(param) {
      this.tableType = param
      this.entrepriseTable= false
      this.contratsTable= false
      this.assuresTable= false
      this.eConTable= false
      this.eAssTable= false
      this.holdingTable= true
      this.eTable = true
      this.prestTable= false
      this.cotTable= false
      this.activeAssures= false
      this.bottomPop= false

      this.activeEntreprise= []
      this.multipleSelection= []
      this.entrContrats= []
      this.activeC= []
      this.hAssures= []
    },
    showEntreprise (param) {
      this.activeEntreprise = param
      this.holdingTable = false
      this.entrepriseTable = true
      return this.tableNameT = "Liste des Entreprises"
    },
    showContrats (param, item) {
      this.holdingTable = false
      this.entrepriseTable = false
      this.eTable = false

      if (item == 'hcont') {
        this.contratsTable = true
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
          this.entrContrats.push(param[i].contrats[y])
          }
        }
      }
      if (item == 'hcot') {
        this.cotTable = true
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
          this.entrContrats.push(param[i].contrats[y])
          }
        }
      }
      if (item == 'hprest') {
        this.prestTable = true
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
          this.entrContrats.push(param[i].contrats[y])
          }
        }
      }
      if (item == 'econt') {
          this.contratsTable = true
        for (var i = 0; i < param.contrats.length; i++) {
          this.entrContrats.push(param.contrats[i])
        }
      }
      if (item == 'gecont') {
          this.eConTable = true
        for (var i = 0; i < param.contrats.length; i++) {
          this.entrContrats.push(param.contrats[i])
        }
      }
      if (item == 'hben') {
        this.assuresTable = true
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
            for (var z = 0; z < param[i].contrats[y].assures.length; z++) {
              this.hAssures.push(param[i].contrats[y].assures[z])
            }
          }
        }
      }
      if (item == 'heben') {
        this.assuresTable = true
        for (var i = 0; i < param.contrats.length; i++) {
          for (var y = 0; y < param.contrats[i].assures.length; y++) {
            this.hAssures.push(param.contrats[i].assures[y])
          }
        }
      }
      if (item == 'eben') {
        this.eAssTable = true
        for (var i = 0; i < param.contrats.length; i++) {
          for (var x = 0; x < param.contrats[i].assures.length; x++) {
            this.hAssures.push(param.contrats[i].assures[x])
          }
        }
      }
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection){
        this.bottomPop = true
      } else this.bottomPop = false
    },
    test () {
      this.holdingTable = true
      this.entrepriseTable = false
      this.contratsTable = false
      this.assuresTable= false
      this.prestTable = false
      this.cotTable = false

      this.activeEntreprise= [],
      this.entrContrats= [],
      this.activeC= [],
      this.hAssures= []
    },
    contratsLength (param, item) {
        var lCont = [];
        var lAss = [];
        var lBen = [];
      if (item == 'hcontl') {
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
            lCont.push(param[i].contrats[y])
          }
        }return lCont.length;
      }
      if (item == 'econtl') {
        for (var i = 0; i < param.contrats.length; i++) {
          lCont.push(param.contrats[i])
        }return lCont.length;
      }
      if (item == 'hbenl') {
        for (var i = 0; i < param.length; i++) {
          for (var x = 0; x < param[i].contrats.length; x++) {
            for (var y = 0; y < param[i].contrats[x].assures.length; y++) {
              lAss.push(param[i].contrats[x].assures[y])
              lBen.push(param[i].contrats[x].assures[y].beneficiaires)
            }
          }
        }
        lBen = lBen.reduce(function(acc, val) { return acc + val; }, 0)
        return lAss.length + '/' + lBen
      }
      if (item === 'ebenl') {
        for (var i = 0; i < param.contrats.length; i++) {
          for (var x = 0; x < param.contrats[i].assures.length; x++) {
            lAss.push(param.contrats[i].assures[x])
            lBen.push(param.contrats[i].assures[x].beneficiaires)
          }
        }
        lBen = lBen.reduce(function(acc, val) { return acc + val; }, 0)
        return lAss.length + '/' + lBen
      }
    }
  },
  created () {
    this.getEntreprises();
    this.tableNameT = 'this'
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/_global.scss";
.close-icon {
  position: absolute;
  z-index: 1;
  font-size: 30px;
  top: 15px;
  right: 15px;
}
.assuresComp {
}
img {
  width: 100%;
  height: auto;
}
.graph-pop-wrap {
  display: flex;
  justify-content: center;
  background-color: white;
}
.h-border {
  border-top: 2px solid rgba(4, 172, 172, 0.8);
}
.e-border {
  border-top: 2px solid rgba(119, 78, 196, 0.6);
}
.c-border {
  border-top: 2px solid rgba(255, 179, 38, 0.6);
}
.cot-border {
  border-top: 2px solid gba(169, 201, 44, 1);
}
.p-border {
  border-top: 2px solid rgba(85, 192, 53, 1);
}
.a-border {
  border-top: 2px solid rgba(169, 40, 61, 1);
}

.graph-pop {
  padding-top: 60px;
  box-shadow: 0px 0px 25px -9px;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  height: auto;
}
.bottom-pop-wrap {
  display: flex;
  justify-content: center;
  background-color: white;
}
.bottom-pop {
  box-shadow: 0px 0px 25px -9px;
  padding: 40px 50px;
  position: absolute;
  bottom: 0px;
}
.buttonDeco {
  padding: 20px;
  height: 60px;
  margin-right: 20px;
  align-items: center;
}
#sante {
  background-color: white;
  height: 700px;
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
}
.header {
  height: 60px;
  background-color: $background-global;
}
.size-export {
  font-size: 20px;
}
.wrapping-search {
  padding: 10px 40px;
}
.inner-button {
  padding: 0 10px;
}
.table-wrapping {
  // padding-left: 40px;
}
.data-wrapper {
  width: 100%;
  height: 100%;
}
</style>

 console.log(
  [1,2,3].reduce(function(acc, val) { return acc + val; }, 0)
);

renderHeader (h, {column, $index}) {
  if ($index === 0) {
    return h('span', {}, [
      h('span', {}, column.label + 'aaa'),
      h('el-popover', {props: {placement: 'top-start', title: '标题', width: '200', trigger: 'hover', content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。'}}, [
      h('i', {slot: 'reference', class: 'el-icon-question', style: 'color:gray;font-size:16px;margin-left:10px;'}, '')
      ])
    ])
  } else {
     return column.label
    }
}