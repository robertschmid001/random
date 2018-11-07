<template>
    <div id="cotisation-table" >
        <div class="table-wrapping">
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
    </div>
</template>
<script>
export default {
    name: 'CotTable',
}
</script>
<style>




</style>