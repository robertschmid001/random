<template>
  <div id="sante">
    <div v-show="!activeAssures">
      <div class="height">
        <div v-if="tableHeader">
          <div  class="type-wrapping">
            <div class="type-title pointer" v-bind:class="{ isActive: tableType, isNotActive: !tableType }" @click="swapType(true)">Liste des Holdings</div>
            <div class="type-title pointer" v-bind:class="{ isActive: !tableType, isNotActive: tableType }" @click="swapType(false)">Liste des Entreprises</div>
          </div>
        </div>
        <div class="breadcrumbs" v-else>
          <ul>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: $route.fullPath }" ><span @click="turnOffTable($route.name)" class="eachBread">{{$route.name}}</span></el-breadcrumb-item>
              <el-breadcrumb-item v-for="(crumbs, index) in breadArray" :key="index"><span @click="turnOffTable(crumbs.trail, index)"  class="eachBread">{{crumbs.name}}</span></el-breadcrumb-item>
            </el-breadcrumb>
          </ul>
        </div>
      </div>
      <div v-if="this.tableType">
        <div class="wrapping-search">
          <el-button class="button inner-button"  @click="toggleSelection([holdings[1], holdings[2]])">En cours</el-button>
          <el-button class="button inner-button" @click="toggleSelection()">Résiliés</el-button>
        </div>
        <transition name="slide-in">
          <div class="table-wrapping" v-show="holdingTable">
            <el-table ref="multipleTable" :data="holdings" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="h-border">
              <el-table-column type="selection" width="42" ></el-table-column>
              <el-table-column property="name" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt holHover pointer" @click="showEntreprise(scope.row.entreprises, scope.row.name, 'showEntreprise')">{{scope.row.name}}</div></template></el-table-column>
              <el-table-column property="entreprises.length" label="ENTREPRISES" sortable width="117"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprises.length}}</div></template></el-table-column>
              <el-table-column property="contrats.length" label="CONTRAT" sortable width="100"><template scope="scope"><div @click="showContrats(scope.row.entreprises, 'hcont', scope.row)" class="data-wrapper pointer md-txt holHover">{{contratsLength(scope.row.entreprises, 'hcontl')}}</div></template></el-table-column>
              <el-table-column property="beneficiaire" label="NOMBRE D'ASSURES ET BENEFICIAIRES" width="230"><template scope="scope" ><div @click="showContrats(scope.row.entreprises, 'hben', scope.row)" class="data-wrapper pointer md-txt holHover">{{contratsLength(scope.row.entreprises, 'hbenl')}}</div></template></el-table-column>
              <el-table-column property="totalCotisations" label="COTISATIONS" sortable width="115">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <span>date: {{ scope.row.entreprises[0].cotisations }}</span>
                    <div slot="reference" class="name-wrapper"><div @click="showContrats(scope.row.entreprises, 'hcot',scope.row )" class="data-wrapper pointer md-txt holHover">{{scope.row.entreprises[0].cotisations}}</div></div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column property="totalPrestations" label="PRESTATIONS" sortable width="115"><template scope="scope" ><div @click="showContrats(scope.row.entreprises, 'hprest', scope.row )" class="data-wrapper pointer md-txt holHover">{{scope.row.entreprises[0].prestations}}</div></template></el-table-column>
              <el-table-column property="totalTauxTele" label="TAUX TELETRANSMISSION" sortable width="180"><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.totalTauxTele" color="#04abab"></el-progress></template></el-table-column>
              <el-table-column property="documents" label="DOCUMENTS" width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export pointer holHover"/></template></el-table-column>
              <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="160" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export pointer holHover" @click="openTypa" /></template></el-table-column>
            </el-table>
          </div>
        </transition>
        <transition name="slide-in">
            <div class="table-wrapping" v-show="entrepriseTable">
              <el-table ref="multipleTable" :data="activeEntreprise" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="e-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="holding" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt entHover pointer" >{{scope.row.holding}}</div></template></el-table-column>
                <el-table-column property="name" label="ENTREPRISES" sortable min-width="120"><template scope="scope" ><div class="data-wrapper md-txt entHover pointer" @click="openEnt(scope.row, 'openEnt')">{{scope.row.name}}</div></template></el-table-column>
                <el-table-column property="contrats" label="CONTRAT" show-overflow-tooltip sortable width="100"><template scope="scope" ><div class="data-wrapper pointer md-txt entHover" @click="showContrats(scope.row, 'econt')">{{contratsLength(scope.row,'econtl')}}</div></template></el-table-column>
                <el-table-column property="beneficiaire" label="NOMBRE D'ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="230"><template scope="scope" ><div @click="showContrats(scope.row, 'heben')" class="data-wrapper pointer md-txt entHover">{{contratsLength(scope.row, 'ebenl')}}</div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="115"><template scope="scope"><div class="md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
                <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="115"><template scope="scope"><div class="md-txt">{{scope.row.prestations}}</div></template></el-table-column>
                <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable width="180"><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions" color="#5a3cfd" ></el-progress></template></el-table-column>
                <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export entHover"/></template></el-table-column>
                <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="160" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export pointer entHover" @click="openTypa" /></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="contratsTable">
              <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="c-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
                <el-table-column property="type" label="TYPE DE CONTRAT" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
                <el-table-column property="assureur" label="ASSUREUR" sortable width="110"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.assureur}}</div></template></el-table-column>
                <el-table-column property="reseauDeSoin" label="RESEAU DE SOIN" sortable width="130"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.reseauDeSoin}}</div></template></el-table-column>
                <el-table-column property="debut" label="DATE DE DEBUT" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.debut}}</div></template></el-table-column>
                <el-table-column property="fin" label="DATE DE FIN" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fin}}</div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
                <el-table-column property="prestations" label="PRESTATIONS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.prestations}}</div></template></el-table-column>
                <el-table-column property="beneficiaire" label="ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="230"><template scope="scope" ><div  class="data-wrapper pointer md-txt contHover"> {{1}}</div></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="cotTable">
              <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="cot-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="entreprise" label="CLIENT" sortable min-width="90"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprise}}</div></template></el-table-column>
                <el-table-column property="type" label="TYPE DE CONTRAT" sortable width="140"><template scope="scope" ><div class="data-wrappe md-txtr">{{scope.row.type}}</div></template></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
                <el-table-column property="periode" label="PERIODE" sortable width="90"><template scope="scope" ><div class="data-wrapper md-txt">Periode</div></template></el-table-column>
                <el-table-column property="debut" label="DEBUT PERIODE" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.debut}}</div></template></el-table-column>
                <el-table-column property="fin" label="FIN PERIODE" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fin}}</div></template></el-table-column>
                <el-table-column property="montant" label="MONTANT ENCAISSE" sortable width="150"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.montant}}</div></template></el-table-column>
                <el-table-column property="encaissement" label="DATE DE L'ENCAISSEMENT" sortable width="180"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.montant}}</div></template></el-table-column>
                <el-table-column property="status" label="STATUT COTISATION" sortable width="150"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.status}}</div></template></el-table-column>
                <el-table-column property="dsn" label="DSN" sortable width="70"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.dsn}}</div></template></el-table-column>
                <el-table-column property="reglement" label="MODE DE REGLEMENT" sortable width="160"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.reglement}}</div></template></el-table-column>
                <el-table-column property="relance" label="REVERSEMENT COMPAGNIE" sortable width="190"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.relance}}</div></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="prestTable">
              <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="p-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="entreprise" label="CLIENT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprise}}</div></template></el-table-column>
                <el-table-column property="type" label="TYPE DE CONTRAT" sortable min-width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
                <el-table-column property="contrat" label="MONTANT DE LA DEPENSE" sortable width="180"><template scope="scope" ><div class="data-wrapper md-txt">{{1}}</div></template></el-table-column>
                <el-table-column property="montant" label="MONTANT PRESTATIONS REGLEES CPMS" sortable width="250"><template scope="scope" ><div class="data-wrapper md-txt">{{1}}</div></template></el-table-column>
              </el-table>
            </div>
          </transition>
          <transition name="slide-in">
            <div class="table-wrapping" v-show="assuresTable">
              <el-table ref="multipleTable" :data="hAssures" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="a-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="name" label="NOM PRENOM" sortable><template scope="scope" ><div class="data-wrapper md-txt assHover pointer" @click="openAssures(scope.row, 'openAssures' )">{{scope.row.name}}</div></template></el-table-column>
                <el-table-column property="birthdate" label="DATE DE NAISSANCE" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.birthdate}}</div></template></el-table-column>
                <el-table-column property="numSecu" label="N° SS" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.numSecu}}</div></template></el-table-column>
                <el-table-column property="beneficiaires" label="BENEFICIAIRES" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.beneficiaires}}</div></template></el-table-column>
                <el-table-column property="contrat" label="CONTRAT" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{1}}</div></template></el-table-column>
                <el-table-column property="regime" label="REGIME" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.regime}}</div></template></el-table-column>
                <el-table-column property="teletransmission" label="TELETRANSMISSION" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.teletransmission}}</div></template></el-table-column>
                <el-table-column property="carteDate" label="DATE D'EMISSION CARTE TP" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.carte}}</div></template></el-table-column>
                <el-table-column property="carte" label="CARTE DE TP" sortable><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.carte}}</div></template></el-table-column>
                <el-table-column property="Documents" label="DOCUMENTS" sortable><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export assHover pointer"/></template></el-table-column>
              </el-table>
            </div>
          </transition>
      </div>
      <div v-if="!this.tableType">
        <div class="wrapping-search">
          <el-button class="button inner-button"  @click="toggleSelection([holdings[1], holdings[2]])">En cours</el-button>
          <el-button class="button inner-button" @click="toggleSelection()">Résiliés</el-button>
        </div>
        <div class="table-wrapping" v-show="eTable">
          <el-table ref="multipleTable" :data="this.globEntreprises" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column property="holding" label="NOM" sortable min-width="100"></el-table-column>
            <el-table-column property="name" label="ENTREPRISES" sortable min-width="120"><template scope="scope" ><div class="data-wrapper md-txt" @click="openEnt(scope.row, 'openEnt')">{{scope.row.name}}</div></template></el-table-column>
            <!-- <el-table-column property="NumSiret" label="NumSiret" sortable min-width="140"></el-table-column> -->
            <el-table-column property="entreprises" label="CONTRAT" show-overflow-tooltip sortable  min-width="100"><template scope="scope" ><div class="data-wrapper pointer md-txt" @click="showContrats(scope.row, 'gecont')">{{contratsLength(scope.row,'econtl')}}</div></template></el-table-column>
            <el-table-column property="beneficiaire" label="NOMBRE D'ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="230"><template scope="scope" ><div @click="showContrats(scope.row, 'eben')" class="data-wrapper pointer md-txt">{{contratsLength(scope.row, 'ebenl')}}</div></template></el-table-column>
            <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="115"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
            <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="115"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.prestations}}</div></template></el-table-column>
            <el-table-column property="tauxTele" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable width="180"><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTele"></el-progress></template></el-table-column>
            <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export"/></template></el-table-column>
            <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="160" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export pointer entHover" @click="openTypa" /></template></el-table-column>
          </el-table>
        </div>
        <transition name="slide-in">
          <div class="table-wrapping" v-show="eConTable">
            <el-table ref="multipleTable" :data="this.entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
              <el-table-column type="selection" width="42"></el-table-column>
              <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
              <el-table-column property="type" label="TYPE DE CONTRAT" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
              <el-table-column property="assureur" label="ASSUREUR" sortable width="110"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.assureur}}</div></template></el-table-column>
              <el-table-column property="reseauDeSoin" label="RESEAU DE SOIN" sortable width="130"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.reseauDeSoin}}</div></template></el-table-column>
              <el-table-column property="debut" label="DATE DE DEBUT" sortable width="130"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.debut}}</div></template></el-table-column>
              <el-table-column property="fin" label="DATE DE FIN" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fin}}</div></template></el-table-column>
              <el-table-column property="cotisations" label="COTISATIONS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
              <el-table-column property="prestations" label="PRESTATIONS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.prestations}}</div></template></el-table-column>
              <el-table-column property="beneficiaire" label="ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="200"><template scope="scope" ><div  class="data-wrapper pointer md-txt contHover"> {{'Texas Ranger'}}</div></template></el-table-column>
            </el-table>
            </div>
        </transition>
        <transition name="slide-in">
          <div class="table-wrapping" v-show="eAssTable">
            <el-table ref="multipleTable" :data="this.hAssures" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
              <el-table-column type="selection" width="42"></el-table-column>
              <el-table-column property="name" label="NOM PRENOM" sortable min-width="120"><template scope="scope" ><div class="data-wrapper md-txt" @click="openAssures(scope.row, 'openAssures')">{{scope.row.name}}</div></template></el-table-column>
              <el-table-column property="birthdate" label="DATE DE NAISSANCE" sortable width="150"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.birthdate}}</div></template></el-table-column>
              <el-table-column property="numSecu" label="N° SS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.numSecu}}</div></template></el-table-column>
              <el-table-column property="beneficiaires" label="BENEFICIAIRES" sortable width="130"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.beneficiaires}}</div></template></el-table-column>
              <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{1}}</div></template></el-table-column>
              <el-table-column property="regime" label="REGIME" sortable width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.regime}}</div></template></el-table-column>
              <el-table-column property="teletransmission" label="TELETRANSMISSION" sortable width="150"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.teletransmission}}</div></template></el-table-column>
              <el-table-column property="carte" label="DATE D'EMISSION CARTE TP" sortable width="190"><template scope="scope"><div class="data-wrapper md-txt">{{scope.row.carte}}</div></template></el-table-column>
              <el-table-column property="carte" label="CARTE DE TP" sortable width="120"><template scope="scope" width="100"><div class="data-wrapper md-txt">{{'test'}}</div></template></el-table-column>
            </el-table>
          </div>
        </transition>
      </div>
<!-- rgba(119, 78, 196, 0.6) -->
    </div>
    <div v-show="activeAssures">
      <transition name="slide-in">
        <component class="assuresComp" :is="currentView" :activeAss="activeAss" :detailsEnt="detailsEnt" keep-alive @close="close"></component>
      </transition>
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
      // holdings: this.$store.state.holdings,
      activeIndex: '',
      currentView: '',
      activeEntreprise: [],
      multipleSelection: [],
      entrContrats: [],
      activeC: [],
      hAssures: [],
      globEntreprises: [],
      activeAss: [],
      detailsEnt: [],
      breadArray: [],

      holdingTable: true,
      entrepriseTable: false,
      contratsTable: false,
      assuresTable: false,
      gEntTable: false,
      eTable: true,
      eConTable: false,
      eAssTable: false,
      cotTable: false,
      prestTable: false,
      tableHeader: true,
      activeAssures: false,
      detailsEntreprise: false,

      assModal: false,
      activeAssures: false,
      detailsEntreprise: false,

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

watch:{
},
  methods: {
    turnOffTable (id, index) {
      if(!id) {
        return console.log('no ID')
      }
      this.holdingTable = false;
      this.entrepriseTable = false;
      this.contratsTable = false;
      this.assuresTable = false;
      this.gEntTable = false;
      this.eTable = false;
      this.eConTable = false;
      this.eAssTable = false;
      this.cotTable = false;
      this.prestTable = false;

      if (id === 'Portefeuille' || id === 'begin') {
        this.initTables();
        this.breadArray.splice(1)
      }
       if (id === 'holding') {
        this.entrepriseTable = true;
        this.breadArray.splice(index+1)
      }
      if (id === 'hcont' || id === 'econt' ) {
        this.contratsTable = true;
        this.breadArray.splice(index+1)
      }
      if (id === 'hben' || id === 'heben') {
        this.assuresTable = true;
        this.breadArray.splice(index+1)
      }
      if (id === 'hcot') {
        this.cotTable = true;
        this.breadArray.splice(index+1)
      }
      if (id === 'hprest') {
        this.prestTable = true;
        this.breadArray.splice(index+1)
      }
      if (id === 'eben') {
        this.eAssTable = true
        this.breadArray.splice(index+1)
      }
      if (id === 'gecont') {
        this.eConTable = true
        this.breadArray.splice(index+1)
      }
    },
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
      this.currentView = ''
      this.breadArray.pop()
    },
    getEntreprises () {
      for (var i = 0; i < this.holdings.length; i++) {
        for (var y = 0; y < this.holdings[i].entreprises.length; y++) {
          this.globEntreprises.push(this.holdings[i].entreprises[y])
        }
      }
    },
    log () {
      console.log(this.multipleSelection,'selection')
    },
    breadCrumbs(param, id, parent) {
      if ( id === 'openEnt' ) { this.breadArray.push({ name: param.name, trail: 'eDetails'}) }
      if ( id === 'showEntreprise' ) { this.breadArray.push({ name: parent, trail: 'holding'}) }
      if ( id === 'econt' ) { this.breadArray.push({ name: 'Contrats', trail: 'econt' }) }
      if ( id === 'gecont' ) { this.breadArray.push({ name: 'Contrats', trail: 'gecont' }) }
      if ( id === 'hben' ) { this.breadArray.push({ name: 'Assurés', trail: 'hben' }) }
      if ( id === 'hcot' ) { this.breadArray.push({ name: 'Cotisations', trail: 'hcot' }) }
      if ( id === 'hprest' ) { this.breadArray.push({ name: 'Prestations', trail: 'hprest' }) }
      if ( id === 'hcont' ) { this.breadArray.push({ name: 'Contrats', trail: 'hcont' }) }
      if ( id === 'heben' ) { this.breadArray.push({ name: 'Assurés', trail: 'heben' }) }
      if ( id === 'eben' ) { this.breadArray.push({ name: 'Assurés', trail: 'eben' }) }
      if ( id === 'openAssures' ) { this.breadArray.push({ name: param.name, trail: 'aDetails' }) }
    },
    openEnt (param, id) {
      this.breadCrumbs(param, id);
      this.currentView = 'detailsEntreprise'
      this.activeAssures = true
      this.detailsEnt = param
      this.tableHeader = false
    },
    openAssures (param, id) {
      this.breadCrumbs(param, id);
      this.currentView = 'assures'
      this.activeAssures = true
      this.activeAss = param
    },
    closeAssures () {
      this.activeAssures = false
    },
    swapType(param) {
      this.tableType = param
      this.initTables();

      this.bottomPop= false

      this.switchFirstBread(param);
    },
    showEntreprise (param, id, name) {
      this.breadCrumbs(param, name, id);
      this.activeEntreprise = param
      this.holdingTable = false
      this.entrepriseTable= true
      this.tableHeader = false
    },
    showContrats (param, item, name) {
      this.holdingTable = false
      this.entrepriseTable=false
      this.eTable = false

      if (item == 'hcont') {
        this.breadCrumbs(param, item, name);
        this.contratsTable = true
        this.tableHeader = false
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
          this.entrContrats.push(param[i].contrats[y])
          }
        }
      }
      if (item == 'hcot') {
        this.breadCrumbs(param, item, name);
        this.cotTable = true
        this.tableHeader = false
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
          this.entrContrats.push(param[i].contrats[y])
          }
        }
      }
      if (item == 'hprest') {
        this.breadCrumbs(param, item, name);
        this.prestTable = true
        this.tableHeader = false
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
          this.entrContrats.push(param[i].contrats[y])
          }
        }
      }
      if (item == 'econt') {
        this.breadCrumbs(param, item, name);
          this.contratsTable = true
        for (var i = 0; i < param.contrats.length; i++) {
          this.entrContrats.push(param.contrats[i])
        }
      }
      if (item == 'gecont') {
        this.breadCrumbs(param, item, name);
          this.eConTable = true
          this.tableHeader = false
        for (var i = 0; i < param.contrats.length; i++) {
          this.entrContrats.push(param.contrats[i])
        }
      }
      if (item == 'hben') {
        this.breadCrumbs(param, item, name);
        this.assuresTable = true
        this.tableHeader = false
        for (var i = 0; i < param.length; i++) {
          for (var y = 0; y < param[i].contrats.length; y++) {
            for (var z = 0; z < param[i].contrats[y].assures.length; z++) {
              this.hAssures.push(param[i].contrats[y].assures[z])
            }
          }
        }
      }
      if (item == 'heben') {
        this.breadCrumbs(param, item);
        this.assuresTable = true
        for (var i = 0; i < param.contrats.length; i++) {
          for (var y = 0; y < param.contrats[i].assures.length; y++) {
            this.hAssures.push(param.contrats[i].assures[y])
          }
        }
      }
      if (item == 'eben') {
        this.breadCrumbs(param, item);
        this.eAssTable = true
        this.tableHeader = false
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
      if(this.multipleSelection.length <= 0) {
        this.bottomPop = false
      } else
        this.bottomPop = true
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
    },
    initBread() {
      if (this.breadArray) {
        this.breadArray= [{name: 'Holdings', trail:'begin'}]
      }
    },
    switchFirstBread(param) {
      if(param === true){
        this.breadArray= [{name: 'Holdings', trail:'begin'}]
      } else this.breadArray= [{name: 'Entreprises', trail:'begin'}]
    },
    initTables() {
      this.holdingTable = true;
      this.entrepriseTable = false;
      this.contratsTable = false;
      this.assuresTable = false;
      this.gEntTable = false;
      this.eTable = true;
      this.eConTable = false;
      this.eAssTable = false;
      this.cotTable = false;
      this.prestTable = false;
      this.tableHeader = true
      this.activeEntreprise= []
      this.multipleSelection= []
      this.entrContrats= []
      this.activeC= []
      this.hAssures= []
    }
  },
  created () {
    this.getEntreprises();
    this.initBread();
    this.initTables();
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/_global.scss";
.close-icon {
  position: absolute;
  z-index: 1;
  font-size: 30px;
  top: -15px;
  right: -1px;
}
.height {
  height: 80px;
}
.holHover:hover {
  color: $holTable-color;
  font-weight: 600; 
}
.entHover:hover {
  color: $entTable-color;
  font-weight: 600; 
}
.assHover:hover {
  color: $assTable-color;
  font-weight: 600; 
}
.cotHover:hover {
  color: $cotTable-color;
  font-weight: 600; 
}
.prestHover:hover {
  color: $prestTable-color;
  font-weight: 600; 
}
.contHover:hover {
  color: $contTable-color;
  font-weight: 600; 
}
.eachBread {
 cursor: pointer;
 font-weight: 400;
 color: rgb(104, 103, 103);
}
.eachBread:hover {
  color: $button-color;
}
.breadcrumbs {
  height: 100%;
  display: flex;
  align-items: center;
}
ul {
  margin: 0;
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
  border-left: 4px solid $holTable-color;
}
.e-border {
  border-left: 4px solid $entTable-color;
}
.c-border {
  border-left: 4px solid $contTable-color;
}
.cot-border {
  border-left: 4px solid $cotTable-color;
}
.p-border {
  border-left: 4px solid $prestTable-color;
}
.a-border {
  border-left: 4px solid $assTable-color;
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
}
.bottom-pop {
  box-shadow: 0px 0px 25px -9px;
  padding: 40px 50px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
  background-color: white;
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
  cursor: default
}
.header {
  height: 60px;
  background-color: $background-global;
}
.size-export {
  font-size: 20px;
}
.wrapping-search {
  padding: 0px 40px 10px 40px;
}
.inner-button {
  padding: 0 10px;
}
.table-wrapping {
}
.data-wrapper {
  width: 100%;
  height: 100%;
}
</style>

 console.log(
  [1,2,3].reduce(function(acc, val) { return acc + val; }, 0)
);