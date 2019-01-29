<template>
    <div id="prestation-table" >
        <div class="table-wrapping">
            <el-table ref="multipleTable" border height="500" :data="entrContrats" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="p-border">
            <el-table-column type="selection" width="42"></el-table-column>
            <el-table-column property="entreprise" label="CLIENT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.entreprise}}</div></template></el-table-column>
            <el-table-column property="type" label="TYPE DE CONTRAT" sortable min-width="140"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.type}}</div></template></el-table-column>
            <el-table-column property="contrat" label="CONTRAT" sortable min-width="100"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.contrat}}</div></template></el-table-column>
            <el-table-column property="contrat" label="MONTANT DE LA DEPENSE" sortable width="180"><template scope="scope" ><div class="data-wrapper md-txt">{{1}}</div></template></el-table-column>
            <el-table-column property="montant" label="MONTANT PRESTATIONS REGLEES CPMS" sortable width="250"><template scope="scope" ><div class="data-wrapper md-txt">{{1}}</div></template></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
name: 'PresTable'
}
</script>
<style>




</style>