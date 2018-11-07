<template>
    <div id="assure-table">
        <div class="table-wrapping">
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
    </div>
</template>
<script>
export default {
    name: 'AssTable',
}
</script>
<style>




</style>