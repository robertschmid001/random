<template>
    <div id="contrat-table" >
        <div class="table-wrapping">
            <el-table ref="multipleTable" @sort-change="getCon" border :max-height="700" size="medium" :data="dataPagination" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="c-border">
                <el-table-column width="29" :render-header="renderHeader"></el-table-column>
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="noH" prop="noH" sortable="custom" label="HOLDING"  min-width="180"  max-width="265"><template slot-scope="scope"><div class="data-wrapper md-txt" > {{scope.row.noH }} <br> {{scope.row.nuH}}  </div></template></el-table-column>
                <el-table-column property="noC" prop="noC" sortable="custom" label="ENTREPRISES" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt entHover">{{scope.row.noC}} <br> {{scope.row.nuC}} </div></template></el-table-column>
                <el-table-column property="contrat" prop="l" sortable="custom" label="CONTRAT"  min-width="150"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transLibelle(scope.row.l)}} <br> {{scope.row.l1 }} {{ scope.row.l2}}  </div></template></el-table-column>
                <el-table-column property="type" prop="tc" sortable="custom" label="TYPE DE CONTRAT"  width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transType(scope.row.tc)}}</div></template></el-table-column>
                <el-table-column property="college" prop="o" sortable="custom" label="COLLÈGE"  width="110"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCol(scope.row.o)}}</div></template></el-table-column>
                <el-table-column property="categorie" prop="a" sortable="custom" label="CATÉGORIE"  width="110"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCat(scope.row.a)}}</div></template></el-table-column>
                <el-table-column property="assureur" prop="s" sortable="custom" label="ASSUREUR"  width="110"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transAss(scope.row.s)}}</div></template></el-table-column>
                <el-table-column property="reseauDeSoin" prop="r" sortable="custom" label="RÉSEAU DE SOIN"  width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transRes(scope.row.r)}}</div></template></el-table-column>
                <el-table-column property="debut" prop="debut" sortable="custom" label="DATE DE DÉBUT"  width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.dep}}</div></template></el-table-column>
                <el-table-column property="fin" prop="fin" sortable="custom" label="DATE DE FIN"  width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.dsp}}</div></template></el-table-column>
                <el-table-column property="beneficiaire" prop="iA" sortable="custom" label="ASSURÉS & BÉNÉFICIAIRES" show-overflow-tooltip width="150"><template slot-scope="scope" ><div  class="data-wrapper pointer md-txt contHover" @click="assRowData(scope.row)">{{countAResilie(scope.row)}} / {{countBResilie(scope.row)}}</div></template></el-table-column>
                <el-table-column property="cotisations" label="COTISATIONS ENCAISSÉES"  width="115">
                <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" class="pop">
                    <span>{{thisYearFormat}}: <font-awesome-icon icon="square" class="cGreen"/><br>{{lastYearFormat}}: <font-awesome-icon icon="square" class="cRed"/></span>
                    <div slot="reference" class="name-wrappe"><div class="data-wrapper pointer md-txt align-right"  @click="cotRowData(scope.row)"><div class="cGreen">{{scope.row.c[0]}}</div><div class="cRed">{{scope.row.c[1]}}</div></div></div>
                </el-popover>
                </template>
                 </el-table-column>
                 <el-table-column property="prestations" label="PRESTATIONS RÉGLÉES"  width="120">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <span>{{thisYearFormat}}: <font-awesome-icon icon="square" class="cGreen"/><br>{{lastYearFormat}}: <font-awesome-icon icon="square" class="cRed"/></span>
                            <div slot="reference" class="name-wrappe"><div class="data-wrapper md-txt align-right"><div class="cGreen">{{scope.row.p[0]}}</div><div class="cRed">{{scope.row.p[1]}}</div></div></div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="42"></el-table-column>
            </el-table>
        </div>
        <el-pagination v-if="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
        </el-pagination>
        <select-box :actFilter="acFilter"  v-if="multipleSelect.length > 0" :selection="this.multipleSelect" :current="this.name" @clickChart="openChart" @clear="clearSelection"/>
    </div>
</template>
<script>
import SelectBox from './../SelectBox.vue'
import _ from 'lodash';

export default {
    name: 'ContTable',
    props: ['contrats', 'actFilter', 'search', 'actResilie'],
    data () {
        return {
            year: '',
            lastYear: '',
            newContracts: this.contrats,
            multipleSelect: [],
            name:'ContTable',
            pagination: false,
            currentPage: 1,
            n: 0,
            p: 99,
            amount: 0,
            first: 0,
            contrat: this.contrats
        }
    },
    components: {
        'select-box': SelectBox
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
        acFilter () {
            var data = this.actFilter
            return data
        },
        getName () {
            return this.name
        },
        dataPagination () {
            var x;
            var y;
            if (!this.contrat || this.contrat.length === 0){
                this.pagination = false
                return [];
            }
            var data = this.contrat;
            if (this.first === 0) {
                this.first = 1
                data.sort(function(a, b) {
                    x = a.noh
                    y = b.noh
                    return x > y ? 1 : x < y ? -1 : 0
                })
            }

            if (this.search.length >= 3) {
                var that = this;
                this.pagination = false
                const filtered = data.filter(function (contrat) {
                return contrat.noC.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
                || contrat.nuC.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
                || contrat.nuH.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
                || contrat.noH.toLowerCase().indexOf(that.search.toLowerCase()) >= 0;
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
    methods: {
       getCon(column) {
            var x;
            var y;
            if (column.prop === 'noH') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.noH
                    y = b.noH
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.noH
                    y = b.noH
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'noC') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.noC
                    y = b.noC
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.noC
                    y = b.noC
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'l') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.l
                    y = b.l
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.l
                    y = b.l
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'tc') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.tc
                    y = b.tc
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.tc
                    y = b.tc
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'o') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.o
                    y = b.o
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.o
                    y = b.o
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'a') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.a
                    y = b.a
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.a
                    y = b.a
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 's') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.s
                    y = b.s
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.s
                    y = b.s
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'r') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.r
                    y = b.r
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.r
                    y = b.r
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'debut') {
                if (column.order === 'ascending') {
                this.contrat.sort(function (a, b) {
                    x = a.dep.split("/").reverse().join("")
                    y = b.dep.split("/").reverse().join("")
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.contrat.sort(function (a, b) {
                    x = a.dep.split("/").reverse().join("")
                    y = b.dep.split("/").reverse().join("")
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
            if (column.prop === 'fin') {
                if (column.order === 'ascending') {
                    this.contrat.sort(function (a, b) {
                        x = a.dsp.split("/").reverse().join("")
                        y = b.dsp.split("/").reverse().join("")
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.contrat.sort(function (a, b) {
                        x = a.dsp.split("/").reverse().join("")
                        y = b.dsp.split("/").reverse().join("")
                        return x > y ? 1 : x < y ? -1 : 0
                    })
                }
            }
            if (column.prop === 'iA') {
                if (column.order === 'ascending') {
                    this.contrat.sort(function (a, b) {
                        x = a.iA
                        y = b.iA
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.contrat.sort(function (a, b) {
                        x = a.iA
                        y = b.iA
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
        defineYear () {
            this.year = new Date().getFullYear()
            this.lastYear = new Date().getFullYear()-1
        },
        log(){
            // console.log(this.actResilie, 'this.actResilie')
            // console.log(this.contrats, 'this.contrats')
            // console.log(n.toLocaleString(), 'toLocaleString()')
        },
        countAResilie (param) {
            if(this.actResilie === 'e') {
                // console.log(this.actResilie, 'inside count A E')
                return param.iA
            } else return param.iAr
        },
        countBResilie (param) {
            if(this.actResilie === 'e') {
                return param.iB
            } else {
                // console.log(this.actResilie, 'inside count B R')
                return param.iBr
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        transAss (data) {
            return this.$store.state.translation.assureurLibelle[data]
        },
        transLibelle (data) {
            return this.$store.state.translation.contratLibelle[data]
        },
        transRes (data) {
            return this.$store.state.translation.reseau[data]
        },
        transCol (data) {
            return this.$store.state.translation.college[data]
        },
        transCat (data) {
            return this.$store.state.translation.category[data]
        },
        transType (data) {
            switch(data)
            {
                case "01":
                    return "Base"

                case "02":
                    return "Option/Surcomplémentaire"

                case "P1":
                    return "Base"

                case "P2":
                    return "Surcomplémentaire"

                case "04":
                    return "ASSISTANCE"

                case "05":
                    return "Frais d'Obsèque"

                case "08":
                    return "Frais d'Obsèques Prévoyance"

                case "15":
                    return "Frais d'Obsèques"

                case "16":
                    return "Frais d'Obsèques surcomplémentaire"

                case "18":
                    return "Frais Association"

                default:
                    return ""
            }
        },
        openChart () {
            this.$emit('clickChart2')
            this.$store.state.selection = this.multipleSelect
        },
        assRowData(param) {
        var assurefilter = this.$store.state.assure
        var filteredAssure = []
                _.find(assurefilter, function(assure){
                    if (assure.c.n === param.n) {
                    assure.noC = param.noC
                    assure.nuC = param.nuC
                    assure.noH = param.noH
                    assure.nuH = param.nuH
                    filteredAssure.push(assure)
                    }
                }
            )
        this.$store.state.filteredAssures = filteredAssure
        this.$store.state.parentBread = param.l.toUpperCase()
        this.$emit('enterAssure')
        var libelle = this.transLibelle(this.$store.state.parentBread);
        this.$router.push({ name: 'assures', params:{hol: param.noH.toLowerCase(), nuH: param.nuH, ent: param.noC.toLowerCase(), nuC: param.nuC, cont: libelle.toLowerCase(), nC: param.n}})
        },
        cotRowData (data) {
            var cotFilter = this.$store.state.cotisations
            var filteredCotisation = []
                _.find(cotFilter, function(cotisation){
                    if (cotisation.c === data.n) {
                        cotisation.noCo = data.l
                        cotisation.noC = data.noC
                        cotisation.nuC = data.nuC
                        cotisation.noH = data.noH
                        cotisation.nuH = data.nuH
                        cotisation.l = data.l
                        cotisation.l1 = data.l1
                        cotisation.l2 = data.l2
                        filteredCotisation.push(cotisation)
                    }
                })
                // console.log(filteredCotisation, 'cotRowData conttable')
            this.$store.state.filteredCotisations = filteredCotisation
            this.$store.state.parentBread = this.$store.state.translation.contratLibelle[filteredCotisation[0].noCo].toUpperCase();
            this.$emit('enterCotisation')
            this.$router.push({ name: 'cotisations', params:{hol: filteredCotisation[0].noH.toLowerCase(),nuH: filteredCotisation[0].nuH, ent: filteredCotisation[0].noC.toLowerCase(), nuC: filteredCotisation[0].nuC, cont: this.$store.state.parentBread.toLowerCase(), nC: data.n}})
        },
        cotFormating1 (data) {
            return data +' '+':'+' '+ new Date().getFullYear()
        },
        cotFormating2 (data) {
            var year = new Date().getFullYear()-1
            return data +' '+':'+' '+ year
        },
        // log () {
        //     console.log(this.multipleSelect,'ticktock')
        // },
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
    mounted() {
        this.search = ''
        this.defineYear();
    },
    created () {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../styles/_global.scss";
#contrat-table {
    // position: relative;
    box-sizing: border-box;
    max-height: 70%;
    padding-bottom: 41px;
}
.popoverTable {
    text-align: center;
}
.icon-info:hover {
    color: $contTable-color;
}
.chartIcon {
    font-size: 3em;
}
.table-wrapping {
    height: 100%;
}

.contHover:hover {
  color: $contTable-color;
}
.c-border {
  border-top: 3px solid $contTable-color;
}
.contHover {
    font-weight: 550;
    color: rgb(105, 105, 105);
}
.cGreen {
    color: green;
}
.cRed {
    color: rgba(0, 60, 255, 0.726);
}
.el-pagination {
  display: flex;
  justify-content: center;
}

</style>