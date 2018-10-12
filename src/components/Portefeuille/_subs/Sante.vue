<template>
  <div id="sante">
    <div class="wrapping-search">
      <el-button class="button inner-button"  @click="toggleSelection([holdings[1], holdings[2]])">En cours</el-button>
      <el-button class="button inner-button" @click="toggleSelection()">Résiliés</el-button>
    </div>
    <div class="table-wrapping" v-show="holdingTable">
      <el-table ref="multipleTable" :data="holdings" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column property="name" label="NOM" sortable><template scope="scope">{{scope.row.name}}</template></el-table-column>
        <el-table-column property="entreprises.length" label="ENTREPRISES" sortable width="117"><template scope="scope" ><div @click="showEntreprise(scope.row.entreprises)" class="data-wrapper pointer">{{scope.row.entreprises.length}}</div></template></el-table-column>
        <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable width="100"><template scope="scope" ><div @click="showContrats(scope.row.entreprises)" class="data-wrapper pointer">{{contratsLength(scope.row.entreprises)}}</div></template></el-table-column>
        <el-table-column property="beneficiaire" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="160"></el-table-column>
        <el-table-column property="totalCotisations" label="COTISATIONS" show-overflow-tooltip sortable width="115"></el-table-column>
        <el-table-column property="totalPrestations" label="PRESTATIONS" show-overflow-tooltip sortable width="115"></el-table-column>
        <el-table-column property="totalTauxTele" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.totalTauxTele"></el-progress></template></el-table-column>
        <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.documents" icon="download" class="size-export"/></template></el-table-column>
      </el-table>
    </div>
    <div class="table-wrapping" v-show="entrepriseTable">
      <el-table ref="multipleTable" :data="activeEntreprise" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column property="name" label="ENTREPRISES" sortable width="120"></el-table-column>
        <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable width="100"><template scope="scope" ><div class="data-wrapper pointer">{{contratsLength(scope.row)}}</div></template></el-table-column>
        <el-table-column property="beneficiaire" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="179"></el-table-column>
        <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
        <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
        <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions"></el-progress></template></el-table-column>
        <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.documents" icon="download" class="size-export"/></template></el-table-column>
      </el-table>
    </div>
    <div class="table-wrapping" v-show="contratsTable">
      <el-table ref="multipleTable" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column property="contrat" label="CONTRAT" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.contrat}}</div></template></el-table-column>
        <el-table-column property="type" label="TYPE CONTRAT" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.type}}</div></template></el-table-column>
        <el-table-column property="assureur" label="ASSUREUR" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.assureur}}</div></template></el-table-column>
        <el-table-column property="reseauDeSoin" label="RESEAU DE SOIN" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.reseauDeSoin}}</div></template></el-table-column>
        <el-table-column property="debut" label="DEBUT" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.debut}}</div></template></el-table-column>
        <el-table-column property="fin" label="FIN" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.fin}}</div></template></el-table-column>
        <el-table-column property="cotisations" label="COTISATIONS" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.cotisations}}</div></template></el-table-column>
        <el-table-column property="prestations" label="PRESTATIONS" sortable width="100"><template scope="scope" ><div class="data-wrapper">{{scope.row.prestations}}</div></template></el-table-column>
        <el-table-column property="tauxCotisations" label="TAUX DE COTISATIONS" sortable width="100"><template scope="scope" ><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxCotisations"></el-progress></template></el-table-column>
      </el-table>
    </div>
    <el-button @click="test"></el-button>
<!-- rgba(119, 78, 196, 0.6) -->

  </div>
</template>

<script>

export default {
  name: 'Sante',
  data () {
    return {
      holdings: this.$store.state.holdings,
      activeIndex: '',
      entreprises: '',
      activeEntreprise: [],
      multipleSelection: [],
      holdingTable: true,
      entrepriseTable: false,
      contratsTable: false,
      entreContrats: [],
      entrContrats: [],
      activeC: []
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    showEntreprise (param) {
      this.activeEntreprise = param
      this.entreContrats = this.activeEntreprise
      this.holdingTable = false
      this.entrepriseTable = true
    },
    showContrats (param) {
      this.holdingTable = false
      this.entrepriseTable = false
      this.contratsTable = true

      // this.entrContrats = param

      for (var i = 0; i < param.length; i++) {
        for (var y = 0; y < param[i].contrats.length; y++) {
        this.entrContrats.push(param[i].contrats[y])
        console.log(this.entrContrats)
        }
      }
      return this.entrContrats
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
    },
    test () {
      this.holdingTable = true
      this.entrepriseTable = false
      this.contratsTable = false
    },
    contratsLength (param) {
      var holdingContrats = [];
      for (var i = 0; i < param.length; i++) {
        for (var y = 0; y < param[i].contrats.length; y++) {
        holdingContrats.push(param[i].contrats[y])
        }
      }
      return holdingContrats.length;
    },
  },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../styles/_global.scss";

#sante {
  background-color: white;
  height: 700px;
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
  padding-left: 40px;
}
.data-wrapper {
  width: 100%;
  height: 100%;
}
</style>