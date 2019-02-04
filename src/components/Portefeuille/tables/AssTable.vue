<template>
    <div id="assure-table">
        <div class="table-wrapping">
            <el-button @click="LOG">LOG</el-button>
            <el-table ref="multipleTable" :max-height="700" border size="medium" :data="filteredPerson" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="a-border">
                <el-table-column width="33" >
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="En sélectionnant une ou plusieurs lignes, vous pourrez exporter les lignes du tableau. Les graphiques sont générés seulement au niveau des « contrats »" placement="top-start">
                            <i class="el-icon-info icon-info pointer"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="42" v-if="this.$router.currentRoute.name !== 'Recherche assuré'"></el-table-column>
                <el-table-column property="holding" prop="noH" sortable label="HOLDING" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.noH }}<br>{{ scope.row.nuH}}</div></template></el-table-column>
                <el-table-column property="entreprise"  prop="noC" sortable label="ENTREPRISE" min-width="180" max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.noC }}<br>{{ scope.row.nuC}}</div></template></el-table-column>
                <el-table-column property="contrat"  prop="c.l" sortable label="CONTRAT"  width="200"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transLibelle(scope.row.c.l)}}<br>{{scope.row.l1 }} {{ scope.row.l2}}</div></template></el-table-column>
                <el-table-column property="type" prop="c.c" sortable label="TYPE DE CONTRAT"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transType(scope.row.c.c)}}</div></template></el-table-column>
                <el-table-column property="college" prop="c.o" sortable label="COLLEGE" v-if="!deleteCol"  width="190"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCol(scope.row.c.o)}}</div></template></el-table-column>
                <el-table-column property="categorie" prop="c.a" sortable label="CATEGORIE" v-if="!deleteCol"  width="130"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCat(scope.row.c.a)}}</div></template></el-table-column>
                <el-table-column property="name" prop="l" sortable label="NOM PRENOM" min-width="180"><template slot-scope="scope" ><div class="data-wrapper md-txt aHover pointer gras" @click="openAssures(scope.row)">{{scope.row.l}} {{scope.row.f}}</div></template></el-table-column>
                <el-table-column property="numSecu" prop="s" sortable label="N° SECURITE SOCIALE"  width="160"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.s}}</div></template></el-table-column>
                <!-- <el-table-column property="numadh" label="N° ADHERENT CPMS" sortable width="150"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.np}}</div></template></el-table-column> -->
                <el-table-column property="dateAffil" prop="de" sortable label="DATE D'AFFILIATION"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.de}}</div></template></el-table-column>
                <el-table-column property="dateRad" prop="ds" sortable label="DATE DE RADIATION"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.ds}}</div></template></el-table-column>
                <el-table-column property="beneficiaires" prop="bc" sortable label="NOMBRE DE BENEFICIAIRES" v-if="!deleteCol"  width="200"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.bc}}</div></template></el-table-column>
                <el-table-column property="regime" prop="r" sortable label="REGIME" v-if="!deleteCol"  width="100"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transReg(scope.row.r)}}</div></template></el-table-column>
                <el-table-column property="teletransmission" prop="t" sortable label="ETAT DE LA TELETRANSMISSION"  width="210"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transTeletrans(scope.row.t)}}</div></template></el-table-column>
                <!-- <el-table-column property="carteDate" label="DATE D'EMISSION CARTE TP" sortable  width="190"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.c.t}}</div></template></el-table-column> -->
                <el-table-column property="carte" prop="tp" sortable label="CARTE TP" v-if="!deleteCol"  width="130"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{tpComp(scope.row.tp)}}</div></template></el-table-column>
                <el-table-column type="selection" width="42"></el-table-column>
            </el-table>
            <el-pagination class="elPagi" v-if="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
            </el-pagination>
            <DetailsAssure v-if="closeDet" :activeAss='activeAss' :assInfo='assInfoComp' :contratInfo='contratInfoComp' class="ass-details" @close="closeDetails" />
        </div>
        <select-box  v-if="multipleSelect.length > 0" :selection="this.multipleSelect" :current="this.name" />
    </div>
</template>
<script>
import DetailsAss from './../_subs/_subs/Assures.vue'
import axios from "axios"
import SelectBox from './../SelectBox.vue'

export default {
    name: 'AssTable',
    props:['assure', 'search', 'deleteCol'],
    data () {
        return {

            closeDet: false,
            contratInfo: [],
            assInfo:[],
            activeAss: [],
            name: 'AssTable',
            multipleSelect: [],
            pagination: false,
            currentPage: 1,
            n: 0,
            p: 99,
            amount: 0,
        }
    },
    components: {
    'DetailsAssure': DetailsAss,
    'select-box': SelectBox
    },
    computed: {
        itemsCount () {
            var count = this.amount
            return count
        },
        assInfoComp () {
            var data = this.assInfo
            return data
        },
        contratInfoComp () {
            var data = this.contratInfo
            return data
        },
        filteredPerson: function () {
            var self = this;
            if (!this.assure || this.assure.length === 0) {
                this.pagination = false
                return []
            };
            var data = this.assure;

            if(this.search.length >= 3){
                this.pagination = false
                const filtered = data.filter(function (person) {
                return person.l.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
                || person.s.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
                || person.f.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
            });
            if (filtered) {
                this.amount = filtered.length
                this.pagination = true
                if (this.currentPage === 1 ){
                    this.n = 0;
                    this.p = 99;
                    return filtered.slice(this.n,this.p);
                }
                if (this.currentPage > 1) {
                    this.p = 0 + 100 * this.currentPage;
                    this.n = this.p - 100;
                    return filtered.slice(this.n,this.p);
                }
            }
            } else
            this.amount = data.length
            this.pagination = true
            if (this.currentPage === 1 ){
                this.n = 0;
                this.p = 99;
                return data.slice(this.n,this.p);
            }
            if (this.currentPage > 1) {
                this.p = 0 + 100 * this.currentPage;
                this.n = this.p - 100;
                return data.slice(this.n,this.p);
            }
        },
    },
    methods: {
        isRoutes () {
            if (this.$router.currentRoute.name !== 'Recherche assuré'){
                return true
            } else return false
        },
        LOG () {
            console.log(this.assure, 'this.assure')
            //this.$router.currentRoute.name
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        tpComp (data) {
            if (data === '0') {
                return ''
            } else return 'Disponible'
        },
        transTeletrans (data) {
            return this.$store.state.translation.connecte[data]
        },
        transLibelle (data) {
            return this.$store.state.translation.contratLibelle[data]
        },
        transCat (data) {
            return this.$store.state.translation.category[data]
        },
        transCol (data) {
            return this.$store.state.translation.college[data]
        },
        transReg (data) {
            return this.$store.state.translation.regime[data]
        },
        transType (data) {
            switch(data)
            {
                case "B":
                    return "Base"
                    break;

                case "O":
                    return "Option/Surcomplémentaire"
                    break;

                default:
                    return ""
                    break;
            }
        },
        getAssDetails (param) {
            var info = param.s
            axios.post('https://courtier.cpms.fr/getAssureInfo/'+`${info}`)
            .then(response => {
                this.assInfo = response.data.assureInfo
                this.contratInfo = response.data.contratInfo
                // console.log( response.data,' response.data')
            })
        },
        closeDetails () {
            this.closeDet = false;
        },
        openAssures (data) {
            this.getAssDetails(data);
            this.activeAss = data
            this.closeDet = true
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
            this.multipleSelect = val;
        }
    },
    mounted () {
        this.search = ''
    },
    created () {
        // if (this.assure.length > 99) return this.pagination = true;
    },
}
</script>
<style lang="scss" scoped>
@import "./../../../styles/_global.scss";
#assure-table {
padding-bottom: 41px;
//   position: relative;
  box-sizing: border-box;
  max-height: 70%;
//   min-height: 600px;
}
.icon-info:hover {
    color: $assTable-color;
}
.ass-details {
  position: absolute;
  z-index: 2;
//   padding-left: 64px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 100%;
}
.elPagi {
    background-color: white;
}
.aHover {
    font-weight: 550;
    color: rgb(105, 105, 105);
}
.aHover:hover {
  color: $assTable-color;
}
.a-border {
  border-top: 3px solid $assTable-color;
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>