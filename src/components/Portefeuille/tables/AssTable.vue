<template>
    <div id="assure-table">
        <div class="table-wrapping">
            <el-table ref="multipleTable" @sort-change="getCon" reserve-selection :max-height="700" border size="medium" :data="filteredPerson" style="width: 100%; font-size: 10px;" @select-all="selectAll" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="a-border">
                <el-table-column width="29" :render-header="renderHeader"></el-table-column>
                <el-table-column type="selection" :row-key="rowKeyFunction" reserve-selection width="42" tooltip-effect="" v-if="this.$router.currentRoute.name !== 'Recherche assuré'"></el-table-column>
                <el-table-column property="holding" prop="noH" sortable="custom" :sort-method="nohSort" label="HOLDING" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.noH }}<br>{{ scope.row.nuH}}</div></template></el-table-column>
                <el-table-column property="entreprise"  prop="noC" sortable="custom" label="ENTREPRISE" min-width="180" max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.noC }}<br>{{ scope.row.nuC}}</div></template></el-table-column>
                <el-table-column property="contrat"  prop="c.l" sortable="custom" label="CONTRAT"  width="200"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transLibelle(scope.row.c.l)}}<br>{{scope.row.c.l1 }} {{ scope.row.c.l2}}</div></template></el-table-column>
                <el-table-column property="type" prop="c.c" sortable="custom" label="TYPE DE CONTRAT"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transType(scope.row.c.c)}}</div></template></el-table-column>
                <el-table-column property="college" prop="c.o" sortable="custom" label="COLLÈGE" v-if="!deleteCol"  width="190"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCol(scope.row.c.o)}}</div></template></el-table-column>
                <el-table-column property="categorie" prop="c.a" sortable="custom" label="CATÉGORIE" v-if="!deleteCol"  width="130"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCat(scope.row.c.a)}}</div></template></el-table-column>
                <el-table-column property="name" prop="l" sortable="custom" label="NOM PRÉNOM" min-width="180"><template slot-scope="scope" ><div class="data-wrapper md-txt aHover pointer gras" @click="openAssures(scope.row)">{{scope.row.l}} {{scope.row.f}}</div></template></el-table-column>
                <el-table-column property="numSecu" prop="s" sortable="custom" label="N° SÉCURITÉ SOCIALE"  width="160"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.s}}</div></template></el-table-column>
                <!-- <el-table-column property="numadh" label="N° ADHERENT CPMS" sortable width="150"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.np}}</div></template></el-table-column> -->
                <el-table-column property="dateAffil" prop="de" sortable="custom" label="DATE D'AFFILIATION"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.de}}</div></template></el-table-column>
                <el-table-column property="dateRad" prop="ds" sortable="custom" label="DATE DE RADIATION"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.ds}}</div></template></el-table-column>
                <el-table-column property="beneficiaires" prop="bc" sortable="custom" label="ASSURÉS & BÉNÉFICIAIRES" v-if="!deleteCol"  width="200"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.bc}}</div></template></el-table-column>
                <el-table-column property="regime" prop="r" sortable="custom" label="RÉGIME" v-if="!deleteCol"  width="100"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transReg(scope.row.r)}}</div></template></el-table-column>
                <el-table-column property="teletransmission" prop="t" sortable="custom" label="ÉTAT DE LA TÉLÉTRANSMISSION"  width="210"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transTeletrans(scope.row.t)}}</div></template></el-table-column>
                <!-- <el-table-column property="carteDate" label="DATE D'EMISSION CARTE TP" sortable  width="190"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.c.t}}</div></template></el-table-column> -->
                <el-table-column property="carte" prop="tp" sortable="custom" label="CARTE TP" v-if="!deleteCol"  width="130"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{tpComp(scope.row.tp)}}</div></template></el-table-column>
                <el-table-column type="selection" width="42" v-if="this.$router.currentRoute.name !== 'Recherche assuré'"></el-table-column>
            </el-table>
            <el-pagination class="elPagi" v-if="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
            </el-pagination>
            <DetailsAssure v-if="closeDet" :activeAss='activeAss' :assInfo='assInfoComp' :contratInfo='contratInfoComp' class="ass-details" @close="closeDetails" />
        </div>
        <select-box  v-if="multipleSelect.length > 0" :selection="multipleSelecting" :current="this.name" @clear="clearSelection" />
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
            assures: this.assure,
            closeDet: false,
            contratInfo: [],
            assInfo:[],
            activeAss: [],
            name: 'AssTable',
            multipleSelect: [],
            savedSelection: [],
            pagination: false,
            currentPage: 1,
            n: 0,
            p: 99,
            amount: 0,
            filtered: [],
            first: 0
        }
    },
    watch: {
        assure: function (val) {
            this.assures = val
        }
    },
    components: {
    'DetailsAssure': DetailsAss,
    'select-box': SelectBox
    },
    computed: {
        multipleSelecting () {
            var multiple = this.multipleSelect
            return multiple
        },
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
            let x;
            let y;
            let search = this.search;
            if (!this.assures || this.assures.length === 0) {
                this.pagination = false
                return []
            }
            let data = this.assures;

            if (this.first === 0) {
                this.first = 1
                data.sort(function(a, b) {
                    x = a.noh
                    y = b.noh
                    return x > y ? 1 : x < y ? -1 : 0
                })
            }
            if(search.length >= 3){
                console.log('inside search')
                console.log(search, 'search')
                this.pagination = false
                const filtered = data.filter(function (person) {
                return person.l.toLowerCase().includes(search)
                || person.s.toLowerCase().includes(search)
                || person.f.toLowerCase().includes(search)
            })
                console.log(filtered, 'filtered')
            //     let filtered = data.filter(function (person) {
            //     return person.l.toLowerCase().indexOf(search.toLowerCase()) >= 0
            //     || person.s.toLowerCase().indexOf(search.toLowerCase()) >= 0
            //     || person.f.toLowerCase().indexOf(search.toLowerCase()) >= 0;
            // })
            if (filtered) {
                this.amount = filtered.length
                this.pagination = true
                // return filtered.slice(0,50);
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
        getCon(column) {
            var x;
            var y;
            if (column.prop === 'l') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.l
                    y = b.l
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.l
                    y = b.l
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'noH') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.noH
                    y = b.noH
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.noH
                    y = b.noH
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'noC') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.noC
                    y = b.noC
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.noC
                    y = b.noC
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'c.l') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.c.l
                    y = b.c.l
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.c.l
                    y = b.c.l
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'c.c') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.c.c
                    y = b.c.c
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.c.c
                    y = b.c.c
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'c.o') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.c.o
                    y = b.c.o
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.c.o
                    y = b.c.o
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'c.a') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x= a.c.a
                    y = b.c.a
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.c.a
                    y = b.c.a
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 's') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.s
                    y = b.s
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.s
                    y = b.s
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'de') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.de.split("/").reverse().join("")
                    y = b.de.split("/").reverse().join("")
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.de.split("/").reverse().join("")
                    y = b.de.split("/").reverse().join("")
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'ds') {
                if (column.order === 'ascending') {
                this.assures.sort(function (a, b) {
                    x = a.ds.split("/").reverse().join("")
                    y = b.ds.split("/").reverse().join("")
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.assures.sort(function (a, b) {
                    x = a.ds.split("/").reverse().join("")
                    y = b.ds.split("/").reverse().join("")
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'bc') {
                if (column.order === 'ascending') {
                    this.assures.sort(function (a, b) {
                        x = a.bc
                        y = b.bc
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.assures.sort(function (a, b) {
                        x = a.bc
                        y = b.bc
                        return x > y ? 1 : x < y ? -1 : 0
                    })
                }
            }
            if (column.prop === 'r') {
                if (column.order === 'ascending') {
                    this.assures.sort(function (a, b) {
                        x = a.r
                        y = b.r
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.assures.sort(function (a, b) {
                        x = a.r
                        y = b.r
                        return x > y ? 1 : x < y ? -1 : 0
                    })
                }
            }
            if (column.prop === 't') {
                if (column.order === 'ascending') {
                    this.assures.sort(function (a, b) {
                        x = a.t
                        y = b.t
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.assures.sort(function (a, b) {
                        x = a.t
                        y = b.t
                        return x > y ? 1 : x < y ? -1 : 0
                    })
                }
            }
            if (column.prop === 'tp') {
                if (column.order === 'ascending') {
                    this.assures.sort(function (a, b) {
                        x = a.tp
                        y = b.tp
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.assures.sort(function (a, b) {
                        x = a.tp
                        y = b.tp
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
                        style: 'font-size:15px;display:flex;justify-content:center;'
                    },
                    '')
                ])
            ])
        },
        clearSelection () {
            this.$refs.multipleTable.clearSelection();
        },
        rowKeyFunction(row) {
            return row.s
        },
        isRoutes () {
            if (this.$router.currentRoute.name !== 'Recherche assuré'){
                return true
            } else return false
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

                case "O":
                    return "Option/Surcomplémentaire"

                default:
                    return ""
            }
        },
        getAssDetails (param) {
            var info = param.s
            axios.post('https://courtier.cpms.fr/getAssureInfo/'+`${info}`)
            .then(response => {
                this.assInfo = response.data.assureInfo
                this.contratInfo = response.data.contratInfo
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
        selectAll (val) {
            if (val.length == 0) {
                return this.multipleSelect = []
            }
            return this.multipleSelect = this.assure
        },
        handleSelectionChange(val) {
            this.multipleSelect = val
        }
    },
    mounted () {
        this.search = ''
    },
    created () {
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