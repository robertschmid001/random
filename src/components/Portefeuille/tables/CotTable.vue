<template>
    <div id="cotisation-table" >
        <div class="table-wrapping">
            <el-table ref="multipleTable" @sort-change="getCon" border :max-height="700" size="medium" :data="dataPagination" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="cot-border">
                <el-table-column width="29" :render-header="renderHeader"></el-table-column>
                <el-table-column type="selection" width="42"></el-table-column>
                <el-table-column property="holding" prop="noH" sortable label="HOLDING" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.noH }}<br>{{ scope.row.nuH}}</div></template></el-table-column>
                <el-table-column property="entreprise" prop="noC" sortable label="ENTREPRISE" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.noC}}<br>{{ scope.row.nuC}}</div></template></el-table-column>
                <el-table-column property="contrat" prop="iCc" sortable label="CONTRAT"  min-width="150"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transLibelle(scope.row.l)}} <br> {{scope.row.l1 }} {{ scope.row.l2}}  </div></template></el-table-column>
                <el-table-column property="type" prop="ts" sortable label="TYPE DE CONTRAT"  width="140"><template slot-scope="scope" ><div class="data-wrappe md-txtr">{{transType(scope.row.ts)}}</div></template></el-table-column>
                <el-table-column property="col" prop="cl" sortable label="COLLÈGE"  width="140"><template slot-scope="scope" ><div class="data-wrappe md-txtr">{{transCol(scope.row.cl)}}</div></template></el-table-column>
                <el-table-column property="cat" prop="cg" sortable label="CATÉGORIE"  width="140"><template slot-scope="scope" ><div class="data-wrappe md-txtr">{{transCat(scope.row.cg)}}</div></template></el-table-column>
                <el-table-column property="debut" prop="dp" sortable="custom" label="DÉBUT DE PÉRIODE"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.dp}}</div></template></el-table-column>
                <el-table-column property="fin" prop="fp" sortable="custom" label="FIN DE PÉRIODE"  width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.fp}}</div></template></el-table-column>
                <el-table-column property="montant" prop="me" sortable label="MONTANT ENCAISSÉ"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt align-right">{{formatCurrency(scope.row.me)}}</div></template></el-table-column>
                <el-table-column property="encaissement" prop="de" sortable="custom" label="DATE DE L'ENCAISSEMENT" width="180"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.de}}</div></template></el-table-column>
                <el-table-column property="status" prop="s" sortable label="STATUT COTISATION"  width="150"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transStatus(scope.row.s)}}</div></template></el-table-column>
                <el-table-column property="dsn" prop="d" sortable label="DSN"  width="70"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transDsn(scope.row.d)}}</div></template></el-table-column>
                <el-table-column property="reglement" prop="td" sortable label="MODE DE RÈGLEMENT"  width="160"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transMode(scope.row.td)}}</div></template></el-table-column>
                <el-table-column property="relance" prop="mr" sortable label="MONTANT REVERSE A LA COMPAGNIE"  width="240"><template slot-scope="scope" ><div class="data-wrapper md-txt align-right">{{formatCurrency(scope.row.mr)}}</div></template></el-table-column>
                <el-table-column property="relance" prop="dr" sortable label="DATE DE REVERSEMENT"  width="190"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.dr}}</div></template></el-table-column>
                <el-table-column type="selection" width="42"></el-table-column>
            </el-table>
        </div>
        <el-pagination v-if="pagination"  @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
        </el-pagination>
        <select-box v-if="multipleSelect.length > 0" :selection="this.multipleSelect" :current="this.name" @clear="clearSelection"/>
    </div>
</template>
<script>
import SelectBox from '../SelectBox.vue'

export default {
    name: 'CotTable',
    props: ['cotisation', 'search'],
    data () {
        return {
            multipleSelect: [],
            name:'CotTable',
            pagination: false,
            currentPage: 1,
            n: 0,
            p: 99,
            cotisations: this.cotisation,
            amount: 0,
            first: 0
        }
    },
    components: {
        'select-box': SelectBox
    },
    computed: {
        itemsCount () {
            var count = this.amount
            return count
        },
        dataPagination () {
            var x;
            var y;

            if (!this.cotisations || this.cotisations.length === 0){
                this.pagination = false
                return [];
            }
            var data = this.cotisation;
            if (this.first === 0) {
                this.first = 1
                data.sort(function(a, b) {
                    x = a.noh
                    y = b.noh
                    return x > y ? 1 : x < y ? -1 : 0
                })
            }

            if(this.search.length >= 3){
                var that = this;
                this.pagination = false
                const filtered = data.filter(function (cotisation) {
                return cotisation.noH.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
                || cotisation.noC.toLowerCase().indexOf(that.search.toLowerCase()) >= 0;
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
    watch: {
        '$route': 'fetchCot',
    },
    methods: {
        getCon(column) {
            var x;
            var y;
            if (column.prop === 'dp') {
                if (column.order === 'ascending') {
                this.cotisations.sort(function (a, b) {
                    x = a.dp.split("/").reverse().join("")
                    y = b.dp.split("/").reverse().join("")
                    return x < y ? 1 : x > y ? -1 : 0
                })
                } else {
                this.cotisations.sort(function (a, b) {
                    x = a.dp.split("/").reverse().join("")
                    y = b.dp.split("/").reverse().join("")
                    return x > y ? 1 : x < y ? -1 : 0
                })
                }
            }
           if (column.prop === 'fp') {
                if (column.order === 'ascending') {
                    this.cotisations.sort(function (a, b) {
                        x = a.fp.split("/").reverse().join("")
                        y = b.fp.split("/").reverse().join("")
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.cotisations.sort(function (a, b) {
                        x = a.fp.split("/").reverse().join("")
                        y = b.fp.split("/").reverse().join("")
                        return x > y ? 1 : x < y ? -1 : 0
                    })
                }
            }
           if (column.prop === 'de') {
                if (column.order === 'ascending') {
                    this.cotisations.sort(function (a, b) {
                        x = a.de.split("/").reverse().join("")
                        y = b.de.split("/").reverse().join("")
                        return x < y ? 1 : x > y ? -1 : 0
                    })
                } else {
                    this.cotisations.sort(function (a, b) {
                        x = a.de.split("/").reverse().join("")
                        y = b.de.split("/").reverse().join("")
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
        transLibelle (data) {
            return this.$store.state.translation.contratLibelle[data]
        },
        fetchCot () {
            // console.log('hallo')
        },
        formatCurrency (param) {
            if (param != null) {
               return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(param)
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        transStatus (data) {
            return this.$store.state.translation.etatCotisation[data]
        },
        transDsn (data) {
            switch(data)
            {
                case "1":
                    return "OUI"

                case "0":
                    return "NON"

                default:
                    return ""
            }
        },
        transMode (data) {
            return this.$store.state.translation.modeReglement[data]
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
        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange (val) {
            this.multipleSelect = val;
        },
    },
    mounted () {
        this.search = ''
        this.cotisations = this.cotisation
    },
    created () {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../styles/_global.scss";
#cotisation-table {
    // height: auto;
    // position: relative;
    box-sizing: border-box;
    max-height: 70%;
    padding-bottom: 41px;
}
.icon-info:hover {
    color: $holTable-color;
}
.cot-border {
  border-top: 3px solid $holTable-color;
}
.cotHover:hover {
  color: $holTable-color;
}
.cotHover {
  font-weight: 550;
  color: rgb(105, 105, 105);
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>