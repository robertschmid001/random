<template>
    <div id="holding-table" >
<!-- :default-sort = "{prop: 'noH', order: 'ascending'}" -->
        <div class="table-wrapping">
            <el-table ref="multipleTable" @sort-change="getCon" border :max-height="700" :data="dataPagination" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true"  class="h-border" :default-sort = "{prop: 'noH', order: 'ascending'}">
                <el-table-column width="29" :render-header="renderHeader"></el-table-column>
                <el-table-column type="selection" class='selection' width="42"></el-table-column>
                <el-table-column property="noH" label="HOLDINGS" prop="noH" sortable="custom" min-width="180"  max-width="265">
                    <template slot-scope="scope" ><div class="data-wrapper justify md-txt">{{scope.row.noH}}  <br> {{scope.row.nuH}} </div></template></el-table-column>
                <el-table-column property="Entreprises" prop="iEe" sortable="custom" label="NOMBRE D'ENTREPRISES" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt pointer holHover" @click="holdingRowData(scope.row.entreprises, 'e', scope.row)">{{scope.row.iEe}}</div></template></el-table-column>
                <el-table-column property="NOMBRE DE CONTRATS" prop="iCc" sortable="custom" label="NOMBRE DE CONTRATS" width="170"><template slot-scope="scope"><div class="data-wrapper pointer md-txt holHover" @click="holdingRowData(scope.row.entreprises, 'c', scope.row)">{{scope.row.iCc}}</div></template></el-table-column>
                <el-table-column property="beneficiaire" prop="iAa" sortable="custom" label="ASSURÉS & BÉNÉFICIAIRES" width="190"><template slot-scope="scope" ><div class="data-wrapper pointer md-txt holHover"  @click="holdingRowData(scope.row.entreprises, 'a', scope.row.noH)">{{scope.row.iAa}}/{{scope.row.iBb}}</div></template></el-table-column>
                <el-table-column property="totalCotisations" label="COTISATIONS ENCAISSÉES" width="200">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <span>{{thisYearFormat}}: <font-awesome-icon icon="square" class="cGreen fontWeight"/><br>{{lastYearFormat}}: <font-awesome-icon icon="square" class="cRed"/></span>
                        <div slot="reference" class="name-wrappe"><div class="data-wrapper pointer md-txt align-right"  @click="holdingRowData(scope.row.entreprises, 'cot')"><div class="cGreen fontWeight">{{scope.row.iCoo[0]}}</div><div class="cRed fontWeight">{{scope.row.iCoo[1]}}</div></div></div>
                    </el-popover>
                </template>
                </el-table-column>
                <el-table-column property="totalPrestations" label="PRESTATIONS RÉGLÉES" width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <span>{{thisYearFormat}}: <font-awesome-icon icon="square" class="cGreen fontWeight"/><br>{{lastYearFormat}}: <font-awesome-icon icon="square" class="cRed"/></span>
                            <div slot="reference" class="name-wrappe"><div class="data-wrapper md-txt align-right"><div class="cGreen fontWeight">{{scope.row.iPrr[0]}}</div><div class="cRed fontWeight">{{scope.row.iPrr[1]}}</div></div></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column property="totalTauxTele" v-if="actFilter === 's'" prop="iTt" sortable="custom" label="TAUX DE TÉLÉTRANSMISSION" width="200"><template slot-scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="formatTaux(scope.row.iTt)" color="#26d3d3"></el-progress></template></el-table-column>
                <el-table-column property="documents" label="DOCUMENTS" width="90" style="text-align: center;">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <div class="align-left">
                                <ul>
                                    <li v-for="(doc, index) in filterDocsholding(scope.row.nuH)" :key="index">
                                        <a :href="'/getDoc/' + doc.id" target="_blank">
                                            <font-awesome-icon icon="file-alt" class="icons"/>{{ doc.fn}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div slot="reference" class="name-wrappe align-center">
                                <font-awesome-icon icon="folder-open" class="size-export pointer holHover"/>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column property="typologie" v-if="actFilter === 's'" label="TYPOLOGIE DES APPELS TELEPHONIQUES" width="240" style="text-align: center;"><template slot-scope="scope"><div class="align-center" @click="getTypo(scope.row.nuH)" title="Typologie des appels" ><font-awesome-icon icon="phone-square" class="size-export pointer holHover" /></div></template></el-table-column>
                <el-table-column type="selection" width="42" ></el-table-column>
            </el-table>
        </div>

        <el-pagination v-if="pagination"  @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
        </el-pagination>
        <typo-chart v-if="typoChart" class="typoChart" @close="closeTypo" :name="this.name" :typoChartData="this.typoData" />
        <select-box v-if="multipleSelect.length > 0" :selection="this.multipleSelect" :current="this.name" @clear="clearSelection" />
    </div>
</template>
<script>
import SelectBox from './../SelectBox.vue'
import TypoChart from './../_subs/charts/_subs_charts/TypoChart.vue'
import _ from 'lodash';

export default {
    name: 'HolTable',
    props: ['holdings', 'actFilter', 'search'],
    data () {
        return {
            year: '',
            lastYear: '',
            filteredDocs: [],
            docs: [],
            typoData: [],
            typoChart: false,
            multipleSelect: [],
            name:'HolTable',
            pagination: false,
            currentPage: 1,
            n: 0,
            p: 99,
            amount: 0,
            abc: '',
            first: 0,
            holding: this.holdings
        }
    },
    components:{
        'select-box': SelectBox,
        'typo-chart': TypoChart
    },
    computed: {
        thisYearFormat () {
            var year = this.year
            return year
        },
        lastYearFormat () {
            var year = this.lastYear
            return year
        },
        itemsCount () {
            var count = this.amount
            return count
        },
        dataPagination () {
            var x;
            var y;

            if (!this.holding || this.holding.length === 0){
                this.pagination = false
                return [];
            }
            var data = this.holding;

            if (this.first === 0) {
                this.first = 1
                data.sort(function(a, b) {
                    x = a.noh
                    y = b.noh
                    return x > y ? 1 : x < y ? -1 : 0
                })
            }

            if(this.search.length >= 3) {
                var that = this;
                const filtered = data.filter(function (holding) {
                return holding.noH.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
                || holding.nuH.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
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
        }
    },
    created () {
        if (this.holdings.length > 99 ) this.pagination = true;
    },
    mounted () {
        this.docs = this.$store.state.tableDocs;
        this.search = '';
        this.defineYear();
    },
    methods: {
        getCon(column) {
            var x;
            var y;
            if (column.prop === 'noH') {
                if (column.order === 'ascending') {
                this.holding.sort(function (a, b) {
                    x = a.noH
                    y = b.noH
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.holding.sort(function (a, b) {
                    x = a.noH
                    y = b.noH
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'iEe') {
                if (column.order === 'ascending') {
                this.holding.sort(function (a, b) {
                    x = a.iEe
                    y = b.iEe
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.holding.sort(function (a, b) {
                    x = a.iEe
                    y = b.iEe
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'iCc') {
                if (column.order === 'ascending') {
                this.holding.sort(function (a, b) {
                    x = a.iCc
                    y = b.iCc
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.holding.sort(function (a, b) {
                    x = a.iCc
                    y = b.iCc
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'iAa') {
                if (column.order === 'ascending') {
                this.holding.sort(function (a, b) {
                    x = a.iAa
                    y = b.iAa
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.holding.sort(function (a, b) {
                    x = a.iAa
                    y = b.iAa
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'iTt') {
                if (column.order === 'ascending') {
                this.holding.sort(function (a, b) {
                    x = a.iTt
                    y = b.iTt
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.holding.sort(function (a, b) {
                    x = a.iTt
                    y = b.iTt
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
        },
        renderHeader(h){
            return h('span', {}, [
                h('span', {}),
                h('el-popover', { props: { placement: 'top-start', width: '300', trigger: 'hover', content: 'En sélectionnant une ou plusieurs lignes, vous pourrez exporter les lignes du tableau. Les graphiques sont générés seulement au niveau des « contrats » ' }}, [
                h('i', { slot: 'reference',
                        class:'el-icon-question',
                        style: 'font-size:15px;display:flex;justify-content: center;'
                        },
                        '')
                ])
            ])
        },
        clearSelection () {
            this.$refs.multipleTable.clearSelection();
        },
        defineYear () {
            this.year = new Date().getFullYear()
            this.lastYear = new Date().getFullYear()-1
        },
        filterDocsholding(data) {
            var allDocs = this.docs
            if (allDocs) {
                var filteredDocs = [];
                    _.find(allDocs, function(doc){
                        if (doc.nh === data) {
                        filteredDocs.push(doc)
                        }
                    }
                );
                return filteredDocs
            } else {
                return
            }
        },
        closeTypo () {
            this.typoChart = false;
        },
        getTypo (data) {
            this.typoData = data
            this.typoChart = true
        },
        formatTaux (data) {
            return parseInt(data)
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        clickLog() {
            // console.log(data, 'data iPrr')
        },
        // handleSizeChange(val) {
        //     console.log(`${val} items per page`);
        // },
        // handleCurrentChange(val) {
        //     console.log(`current page: ${val}`);
        // },
        holdingRowData (data, id, parent) {
            if (id === 'e') {
                this.$store.state.holdEnt = data;
                this.$emit('holdEntRow')
                // this.$router.push({ name: 'entreprise', params:{hol:data[0].noH.toLowerCase(), nuH:data[0].nuH}})
            }
            if (id === 'c') {
                var filteredData = []
                data.filter( e => {
                    if (e.contracts === false) {
                        return
                    } else
                        e.contracts.forEach( f => {
                            f.noC = e.noC
                            f.nuC = e.nuC
                            f.noH = parent.noH
                            f.nuH = parent.nuH
                            filteredData.push(f)
                        })
                })
                this.$store.state.holdEntCont = filteredData
                this.$store.state.parentBread = filteredData[0].noH.toLowerCase()
                this.$emit('holdContRow')
                this.$router.push({ name: 'contrats', params:{hol:this.$store.state.parentBread.toLowerCase(), nuH:data.nuH}})
            }
            if (id === 'a') {
                var assurefilter = this.$store.state.assure
                var filteredAssure = []
                data.filter( e => {
                    if (e.contracts === false) {
                        return
                    } else
                    e.contracts.forEach( f => {
                        _.find(assurefilter, function(assure){
                            if (assure.c.n === f.n) {
                            // if (assure.nh === e.nuH) {
                                assure.noC = e.noC
                                assure.nuC = e.nuC
                                assure.noH = e.noH
                                assure.nuH = e.nuH
                                filteredAssure.push(assure)
                            }
                        })
                    })
                })
                this.$store.state.filteredAssures = filteredAssure
                // console.log(filteredAssure, 'filteredAssure')
                this.$store.state.parentBread = filteredAssure[0].noH.toLowerCase()
                this.$emit('enterAssure')
                this.$router.push({ name: 'assures', params:{hol: this.$store.state.parentBread.toLowerCase(), nuH: data[0].nuH}})
            }
            if (id === 'cot') {
                var cotFilter = this.$store.state.cotisations
                var filteredCotisation = []
                data.filter( e => {
                    e.contracts.forEach( f => {
                        _.find(cotFilter, function(cotisation){
                            if (cotisation.h === e.nuH && cotisation.c === f.n) {
                                cotisation.noC = e.noC
                                cotisation.nuC = e.nuC
                                cotisation.noH = e.noH
                                cotisation.nuH = e.nuH
                                cotisation.l = f.l
                                cotisation.l1 = f.l1
                                cotisation.l2 = f.l2
                                filteredCotisation.push(cotisation)
                            }
                        })
                    })
                })
                this.$store.state.filteredCotisations = filteredCotisation
                this.$store.state.parentBread = filteredCotisation[0].noH
                this.$emit('enterCotisation')
                this.$router.push({ name: 'cotisations', params:{hol: this.$store.state.filteredCotisations[0].noH.toLowerCase(), nuH: this.$store.state.filteredCotisations[0].nuH.toLowerCase()} })
            }
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
                this.multipleSelect = this.holdings
                });
            } else {
                this.$refs.multipleTable.clearSelection();
                this.multipleSelect = []
            }
        },
        handleSelectionChange(val) {
            this.multipleSelect = val;
            // console.log(this.multipleSelect,' multiple selection')
        },
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/_global.scss";
#holding-table {
    // position: relative;
    box-sizing: border-box;
    padding-bottom: 41px;
}
.selection /deep/ span.el-checkbox {
    display: flex;
    justify-content: center;
}
.justify {
    text-align: justify;
    text-justify: inter-word;
}
.icon-info:hover {
    color: $holTable-color;
}
.icons {
    margin-right: 2px;
}
a {
text-decoration: none;
color: black;
}
ul {
    list-style:none;
    padding:0;
    margin:0;
}
a:hover {
color: $button-color;
}
.table-wrapping {
    height: auto;
    box-sizing: border-box;
}
.typoChart {
    position: absolute;
    top: 0;
    left: 0;
}
.h-border {
  border-top: 3px solid $holTable-color;
}
.holHover:hover {
  color: $holTable-color;
}
.holHover {
  font-weight: 550;
  color: rgb(105, 105, 105);
}
.cGreen {
    color: green;
}
.cRed {
color: rgba(0, 60, 255, 0.726);
}
.size-export {
  font-size: 20px;
}
.inactive {
    font-size: 20px;
    color: rgb(220, 220, 220);
}
.size-export:hover {
  color: $holTable-color
}
.el-pagination {
  display: flex;
  justify-content: center;
}

</style>

