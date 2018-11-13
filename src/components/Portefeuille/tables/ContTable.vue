<template>
    <div id="contrat-table" >
        <!-- <button @click="log">Contracts</button> -->
        <div class="table-wrapping">
            <el-table ref="multipleTable" :data="contrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="c-border">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.l}}</div></template></el-table-column>
            <el-table-column property="type" label="TYPE DE CONTRAT" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.t}}</div></template></el-table-column>
            <el-table-column property="assureur" label="ASSUREUR" sortable width="110"><template scope="scope" ><div class="data-wrapper md-txt"></div></template></el-table-column>
            <el-table-column property="reseauDeSoin" label="RESEAU DE SOIN" sortable width="130"><template scope="scope" ><div class="data-wrapper md-txt"></div></template></el-table-column>
            <el-table-column property="debut" label="DATE DE DEBUT" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt"></div></template></el-table-column>
            <el-table-column property="fin" label="DATE DE FIN" sortable width="140"><template scope="scope" ><div class="data-wrapper md-txt"></div></template></el-table-column>
            <el-table-column property="cotisations" label="COTISATIONS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt"></div></template></el-table-column>
            <el-table-column property="prestations" label="PRESTATIONS" sortable width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.p}}</div></template></el-table-column>
            <el-table-column property="beneficiaire" label="ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="230"><template scope="scope" >{{scope.row.aC}} / {{scope.row.bC}}<div  class="data-wrapper pointer md-txt contHover"></div></template></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ContTable',
    props: ['contrats'],
    data () {
        return {

        }
    },
    methods: {
    log () {
        console.log(this.contrats,'this.contracts')
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
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/_global.scss";

.contHover:hover {
  color: $contTable-color;
}
.c-border {
  border-top: 3px solid $contTable-color;
}


</style>