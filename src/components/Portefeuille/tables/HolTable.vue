<template>
    <div id="holding-table" >
        <div class="table-wrapping">
            <el-table ref="multipleTable" :data="holdings" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" :default-sort = "{prop: 'nom', order: 'ascending'}" class="h-border">
                <el-table-column type="selection" width="42" ></el-table-column>
                <el-table-column property="noH" label="NOM" sortable min-width="150"><template scope="scope" ><div class="data-wrapper md-txt holHover pointer">{{scope.row.noH}}</div></template></el-table-column>
                <el-table-column property="entreprises.length" label="ENTREPRISES" sortable width="117"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.eC}}</div></template></el-table-column>
                <el-table-column property="contrats.length" label="CONTRAT" sortable width="100"><template scope="scope"><div class="data-wrapper pointer md-txt holHover"></div></template></el-table-column>
                <el-table-column property="beneficiaire" label="NOMBRE D'ASSURES ET BENEFICIAIRES" width="230"><template scope="scope" ><div class="data-wrapper pointer md-txt holHover">{{scope.row.bC}}/{{scope.row.aC}}</div></template></el-table-column>
                <el-table-column property="totalCotisations" label="COTISATIONS" sortable width="115">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <span>date: waiting info</span>
                    <div slot="reference" class="name-wrapper"><div class="data-wrapper pointer md-txt holHover">{{scope.row.c}}</div></div>
                    </el-popover>
                </template>
                </el-table-column>
                <el-table-column property="totalPrestations" label="PRESTATIONS" sortable width="115"><template scope="scope" >{{scope.row.p}}<div class="data-wrapper pointer md-txt holHover"></div></template></el-table-column>
                <el-table-column property="totalTauxTele" label="TAUX TELETRANSMISSION" sortable width="180"><template scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.totalTauxTele" color="#04abab"></el-progress></template></el-table-column>
                <el-table-column property="documents" label="DOCUMENTS" width="85" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.Documents" icon="download" class="size-export pointer holHover"/></template></el-table-column>
                <el-table-column property="typologie" label="TYPOLOGIE DES APPELS" width="160" style="text-align: center;"><template scope="scope"><font-awesome-icon v-if="scope.row.typologie" icon="chart-pie" class="size-export pointer holHover" @click="openTypa" /></template></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HolTable',
    data () {
        return {

        }
    },
    props: ['holdings'],
}
</script>
<style>

#holding-table {
    height: fill;
}



</style>

