<template>
    <div id="glob-table" >
            <div class="table-wrapping">

              <el-table ref="multipleTable" height="500"  :data="entreprises" style="width: 100%; font-size: 10px; overflow: auto;"  :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'noC', order: 'ascending'}" class="e-border table-style">
              <!-- <div class="search">
                <input class="base-search search-style" v-model="search" size="mini" placeholder="Recherchez par nom d'entreprise"/>
              </div> -->
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="holding" label="NOM" ><template scope="scope" ><div class="data-wrapper md-txt entHover pointer" >{{scope.row.noh }}</div></template></el-table-column>
                <el-table-column property="noC" label="ENTREPRISES" sortable min-width="120"><template scope="scope" ><div class="data-wrapper md-txt entHover pointer" >{{scope.row.noC}}</div></template></el-table-column>
                <el-table-column property="contrats" label="CONTRAT" show-overflow-tooltip width="100"><template scope="scope" ><div class="data-wrapper pointer md-txt entHover">{{scope.row.iCc}}</div></template></el-table-column>
                <el-table-column property="beneficiaire" label="NOMBRE D'ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="230"> <template scope="scope" ><div class="data-wrapper pointer md-txt entHover">{{scope.row.iAa}} / {{scope.row.iBb}}</div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip width="115"><template scope="scope"><div class="md-txt">{{scope.row.iCoo}}</div></template></el-table-column>
                <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip width="115"><template scope="scope"><div class="md-txt">{{scope.row.iPrr}}</div></template></el-table-column>
                <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip width="180"><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions" color="#5a3cfd" ></el-progress></template></el-table-column>
                <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export entHover"/></template></el-table-column>
                <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="160" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export pointer entHover" @click="openTypa" /></template></el-table-column>
              </el-table>
            </div>
    </div>
</template>
<script>
export default {
    name: 'globEnt-table',
    props:['entreprises'],
  data () {
    return {
      search: ''
    }
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
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/_global.scss";

#glob-table {
  overflow-y: visible;
  height: auto;
}
.table-wrapping {
}



.entHover:hover {
  color: $entTable-color;
}
.e-border {
  border-left: 4px solid $entTable-color;
}
</style>

// .filter(data => !search || data.noC.toLowerCase().includes(search.toLowerCase())) entreprises.slice(0,100)