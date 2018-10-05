<template>
  <div id="sante">
    <div class="wrapping-search">
      <el-button class="button inner-button"  @click="toggleSelection([tableData3[1], tableData3[2]])">En cours</el-button>
      <el-button class="button inner-button" @click="toggleSelection()">Résiliés</el-button>
    </div>
    <div class="table-wrapping">
    <el-table ref="multipleTable" :data="tableData3" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}">
      <el-table-column type="selection" width="42"></el-table-column>
      <el-table-column property="nom" label="NOM" sortable width="100"></el-table-column>
      <el-table-column property="entreprises" label="ENTREPRISES" sortable width="120"></el-table-column>
      <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable width="100"></el-table-column>
      <el-table-column property="assuresBeneficiaires" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip width="179"></el-table-column>
      <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
      <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="120"></el-table-column>
      <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions"></el-progress></template></el-table-column>
      <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.documents" icon="download" class="size-export"/></template></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sante',
  data () {
    return {
      tableData3: [{
          nom: 'Holding 1',
          entreprises: 5,
          contrats: 14,
          assuresBeneficiaires: '5/5',
          cotisations: 485162,
          prestations:756985,
          tauxTeletransmissions:35,
          documents: 0,
        }, {
          nom: 'Holding 2',
          entreprises: 5,
          contrats: 7,
          assuresBeneficiaires: '5/5',
          cotisations: 153248,
          prestations: 153248,
          tauxTeletransmissions:42,
          documents: 3,
        }, {
          nom: 'Holding 3',
          entreprises: 7,
          contrats: 17,
          assuresBeneficiaires: 2/2,
          cotisations: 365214,
          prestations: 852645,
          tauxTeletransmissions: 36,
          documents: 3,
        }, {
          nom: 'Holding 4',
          entreprises: 5,
          contrats: 5,
          assuresBeneficiaires: '5/5',
          cotisations: 458965,
          prestations: 215632,
          tauxTeletransmissions: 78,
          documents: 0,
        }, {
          nom: 'Holding 5',
          entreprises: 5,
          contrats: 5,
          assuresBeneficiaires: '5/5',
          cotisations: 785498,
          prestations: 463812,
          tauxTeletransmissions: 89,
          documents: 3,
        }, {
          nom: 'Holding 6',
          entreprises: 1,
          contrats: 5,
          assuresBeneficiaires: '5/5',
          cotisations: 951357,
          prestations: 357159,
          tauxTeletransmissions: 100,
          documents: 0,
        }, {
          nom: 'Holding 7',
          entreprises: 71,
          contrats: 85,
          assuresBeneficiaires: '5/5',
          cotisations: 456265,
          prestations: 742358,
          tauxTeletransmissions: 10,
          documents: 3,
        }],
        multipleSelection: []
    }
  },
  props: {
  },
  methods: {
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
</style>