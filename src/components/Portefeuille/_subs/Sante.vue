<template>
  <div id="sante">
    <div class="wrapping-search">
      <el-button class="button inner-button"  @click="toggleSelection([holdings[1], holdings[2]])">En cours</el-button>
      <el-button class="button inner-button" @click="toggleSelection()">Résiliés</el-button>
    </div>
    <!-- <template scope="scope"></template> -->
    <div class="table-wrapping" v-show="holdingTable">
      <el-table ref="multipleTable" :data="holdings" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column property="name" label="NOM" sortable width="100"><template scope="scope" >{{scope.row.name}}</template></el-table-column>
        <el-table-column property="entreprises.length" label="ENTREPRISES" sortable width="120"><template scope="scope" ><div @click="showEntreprise(scope.row.entreprises)" class="data-wrapper">{{scope.row.entreprises.length}}</div></template></el-table-column>
        <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable width="100"></el-table-column>
        <el-table-column property="beneficiaire" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="179"></el-table-column>
        <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
        <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
        <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions"></el-progress></template></el-table-column>
        <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.documents" icon="download" class="size-export"/></template></el-table-column>
      </el-table>
    </div>
    <div class="table-wrapping" v-show="entrepriseTable">
      <el-table ref="multipleTable" :data="entreprises" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column property="name" label="NOM" sortable width="100"></el-table-column>
        <el-table-column property="entreprises" label="ENTREPRISES" sortable width="120"></el-table-column>
        <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable width="100"></el-table-column>
        <el-table-column property="beneficiaire" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="179"></el-table-column>
        <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
        <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
        <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions"></el-progress></template></el-table-column>
        <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.documents" icon="download" class="size-export"/></template></el-table-column>
      </el-table>
    </div>
    <el-button @click="test"></el-button>


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
      multipleSelection: [],
      holdingTable: true,
      entrepriseTable: false,
    }
  },
  props: {
  },
  methods: {
    showEntreprise (param) {
      console.log(param, 'hello')
      this.entreprises = param
      this.holdingTable = false
      this.entrepriseTable = true
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
      console.log(this.holdings)
      console.log(this.holdings[1].entreprises)
      this.holdingTable = true
      this.entrepriseTable = false
    }
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