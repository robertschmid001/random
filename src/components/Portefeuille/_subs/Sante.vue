<template>
  <div id="sante">
    <el-table ref="multipleTable" :data="tableData3" style="width: 100%" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column property="nom" label="NOM"  width="120" sortable="true"></el-table-column>
    <el-table-column property="entreprises" label="ENTREPRISES"  width="120" sortable="true"></el-table-column>
    <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable="true"></el-table-column>
    <el-table-column property="assuresBeneficiaires" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip sortable="true"></el-table-column>
    <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable="true"></el-table-column>
    <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable="true"></el-table-column>
    <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable="true"></el-table-column>
    <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip sortable="true"></el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">Toggle selection status of second and third rows</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
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
          cotisations: 5,
          prestations:5,
          tauxTeletransmissions:5,
          documents: 3,
        }, {
          nom: 'Holding 2',
          entreprises: 5,
          contrats: 7,
          assuresBeneficiaires: '5/5',
          cotisations: 1,
          prestations:5,
          tauxTeletransmissions:7,
          documents: 3,
        }, {
          nom: 'Holding 3',
          entreprises: 7,
          contrats: 17,
          assuresBeneficiaires: '5/5',
          cotisations: 5,
          prestations:5,
          tauxTeletransmissions:5,
          documents: 3,
        }, {
          nom: 'Holding 4',
          entreprises: 5,
          contrats: 5,
          assuresBeneficiaires: '5/5',
          cotisations: 5,
          prestations:5,
          tauxTeletransmissions:5,
          documents: 3,
        }, {
          nom: 'Holding 5',
          entreprises: 5,
          contrats: 5,
          assuresBeneficiaires: '5/5',
          cotisations: 5,
          prestations:5,
          tauxTeletransmissions:5,
          documents: 3,
        }, {
          nom: 'Holding 6',
          entreprises: 1,
          contrats: 5,
          assuresBeneficiaires: '5/5',
          cotisations: 1,
          prestations:5,
          tauxTeletransmissions:4,
          documents: 3,
        }, {
          nom: 'Holding 7',
          entreprises: 71,
          contrats: 85,
          assuresBeneficiaires: '5/5',
          cotisations: 85,
          prestations:96,
          tauxTeletransmissions:5,
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
</style>