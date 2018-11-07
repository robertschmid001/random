<template>
    <div id="entreprise-table" >
            <div class="table-wrapping">
              <el-table ref="multipleTable" :data="activeEntreprise" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="e-border">
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="holding" label="NOM" sortable><template scope="scope" ><div class="data-wrapper md-txt entHover pointer" >{{scope.row.holding}}</div></template></el-table-column>
                <el-table-column property="name" label="ENTREPRISES" sortable min-width="120"><template scope="scope" ><div class="data-wrapper md-txt entHover pointer" >{{scope.row.name}}</div></template></el-table-column>
                <el-table-column property="contrats" label="CONTRAT" show-overflow-tooltip sortable width="100"><template scope="scope" ><div class="data-wrapper pointer md-txt entHover" ></div></template></el-table-column>
                <el-table-column property="beneficiaire" label="NOMBRE D'ASSURES ET BENEFICIAIRES" show-overflow-tooltip width="230"><template scope="scope" ><div class="data-wrapper pointer md-txt entHover"></div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS" show-overflow-tooltip sortable width="115"><template scope="scope"><div class="md-txt">{{scope.row.cotisations}}</div></template></el-table-column>
                <el-table-column property="prestations" label="PRESTATIONS" show-overflow-tooltip sortable width="115"><template scope="scope"><div class="md-txt">{{scope.row.prestations}}</div></template></el-table-column>
                <el-table-column property="tauxTeletransmissions" label="TAUX TELETRANSMISSION" show-overflow-tooltip sortable width="180"><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.tauxTeletransmissions" color="#5a3cfd" ></el-progress></template></el-table-column>
                <el-table-column property="documents" label="DOCUMENTS" show-overflow-tooltip width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export entHover"/></template></el-table-column>
                <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="160" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export pointer entHover" @click="openTypa" /></template></el-table-column>
              </el-table>
            </div>
    </div>
</template>
<script>
export default {
 name: 'EntTable',
}
</script>
<style>




</style>