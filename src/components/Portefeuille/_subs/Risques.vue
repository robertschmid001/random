<template>
  <div id="risques">
    <el-table ref="multipleTable" :data="holdings" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true">
    <el-table-column type="selection" width="42"></el-table-column>
    <el-table-column property="nom" label="NOM" sortable="true" width="100"></el-table-column>
    <el-table-column property="entreprises.length" label="ENTREPRISES" sortable="true" width="120"></el-table-column>
    <el-table-column property="contrats" label="CONTRATS" show-overflow-tooltip sortable="true" width="100"></el-table-column>
    <el-table-column property="assuresBeneficiaires" label="ASSURES / BENEFICIAIRES" show-overflow-tooltip sortable="true" width="179"></el-table-column>
    <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable="true" width="120"></el-table-column>
    <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable="true" width="120"></el-table-column>
    <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions"></el-progress></template></el-table-column>
    <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.documents" icon="download" class="size-export"/></template></el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">Toggle selection status of second and third rows</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
  </div>
</template>

<script>

export default {
  name: 'Risques',
  data () {
    return {
      holdings: [{
          nom: 'Holding 1',
          contrats: 15,
          cotisations: 485162,
          prestations:756985,
          tauxTeletransmissions:35,
          documents: 0,
          entreprises: [
            {
              name: 'entreprise 1',
              contrats:[
                { name: 'complete', type: 'A', quantity: 5 },
                { name: 'bare minimum', type: 'B', quantity: 10 }
              ],
              assurances: 4,
              beneficiaires: 8,
              cotisations: 3000,
              prestations: 5400
            },
            {
              name: 'entreprise 2',
              contrats:[
                { name: 'complete', type: 'A', quantity: 2 },
                { name: 'bare minimum', type: 'B', quantity: 6 }
              ],
              assurances: 5,
              beneficiaires: 2,
              cotisations: 5000,
              prestations: 4000
            },
            {
              name: 'entreprise 3',
              contrats:[
                { name: 'complete', type: 'A', quantity: 1 },
                { name: 'bare minimum', type: 'B', quantity: 2 }
              ],
              assurances: 4,
              beneficiaires: 2,
              cotisations: 1000,
              prestations: 2000
            }
          ],

        },{
          nom: 'Holding 2',
          contrats: 7,
          cotisations: 485162,
          prestations:756985,
          tauxTeletransmissions:74,
          documents: 0,
          entreprises: [
          { name: 'entreprise 1a',
            contrats:[
              { name: 'complete', type: 'A', quantity: 2 },
              { name: 'bare minimum', type: 'B', quantity: 5 }
            ],
            assurances: 1,
            beneficiaires: 2,
            cotisations: 123123,
            prestations: 159159
          },
          ]
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

#risques {
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
</style>