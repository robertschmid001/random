<template>
    <div id="entreprise-table" >
      <div class="table-wrapping">
        <el-table ref="multipleTable" @sort-change="getCon" border :max-height="700" size="medium" :data="dataPagination" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="e-border" :default-sort = "{prop: 'noC', order: 'ascending'}">
          <el-table-column width="29" :render-header="renderHeader"></el-table-column>
          <el-table-column type="selection" width="42"></el-table-column>
          <el-table-column property="noH" prop="noH" sortable="custom" label="HOLDING" min-width="180"  max-width="265"><template slot-scope="scope"><div class="data-wrapper md-txt" > {{scope.row.noH }} <br> {{scope.row.nuH }}  </div></template></el-table-column>
          <el-table-column property="noC" prop="noC" sortable="custom" label="ENTREPRISES" min-width="180"  max-width="265"><template slot-scope="scope" ><div class="data-wrapper md-txt entHover pointer" @click="openDetailsEnt(scope.row)" >{{scope.row.noC}} <br> {{scope.row.nuC}} </div></template></el-table-column>
          <el-table-column property="contrats" prop="iCc" sortable="custom" label="NOMBRE DE CONTRATS"  width="170"><template slot-scope="scope" ><div class="data-wrapper pointer md-txt entHover" @click="contratsRowData(scope.row)">{{scope.row.iCc}}</div></template></el-table-column>
          <el-table-column property="beneficiaire" prop="iAa" sortable="custom" label="ASSURÉS & BÉNÉFICIAIRES" width="190"><template slot-scope="scope" ><div class="data-wrapper pointer md-txt entHover" @click="assRowData(scope.row)" >{{scope.row.iAa}} / {{scope.row.iBb}} </div></template></el-table-column>

          <el-table-column property="cotisations" label="COTISATIONS ENCAISSÉES"  width="115">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span>{{thisYearFormat}}: <font-awesome-icon icon="square" class="cGreen"/><br>{{lastYearFormat}}: <font-awesome-icon icon="square" class="cRed"/></span>
                <div slot="reference" class="name-wrappe"><div class="data-wrapper pointer md-txt align-right"  @click="cotRowData(scope.row)"><div class="cGreen fontWeight">{{scope.row.iCoo[0]}}</div><div class="cRed fontWeight">{{scope.row.iCoo[1]}}</div></div></div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column property="prestations" label="PRESTATIONS RÉGLÉES"  width="120">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span>{{thisYearFormat}}: <font-awesome-icon icon="square" class="cGreen"/><br>{{lastYearFormat}}: <font-awesome-icon icon="square" class="cRed"/></span>
                <div slot="reference" class="name-wrappe"><div class="data-wrapper md-txt align-right"><div class="cGreen fontWeight">{{scope.row.iPrr[0]}}</div><div class="cRed fontWeight">{{scope.row.iPrr[1]}}</div></div></div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column property="tauxTeletransmissions" v-if="actFilter === 's'" prop="iTt" sortable="custom" label="TAUX DE TÉLÉTRANSMISSION"  width="200"><template slot-scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="formatTaux(scope.row.iTt)" color="#894cfa" ></el-progress></template></el-table-column>
          <el-table-column property="documents" label="DOCUMENTS" width="90" style="text-align: center;">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right" class="align-center">
                <div class="align-center">
                    <ul>
                        <li v-for="(doc, index) in filterDocsEnt(scope.row)" :key="index"><a :href="'/getDoc/' + doc.id" target="_blank" class="align-center" ><font-awesome-icon icon="file-alt" class="icons align-center"/>{{doc.fn}}</a></li>
                    </ul>
                </div>
                <div slot="reference" class="name-wrappe"><font-awesome-icon icon="folder-open" class="size-export pointer holHover"/></div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="typologie" v-if="actFilter === 's'" label="TYPOLOGIE DES APPELS TÉLÉPHONIQUES" width="230" style="text-align: center;"><template slot-scope="scope"><div class="align-center" title="Typologie des appels" @click="getTypo(scope.row.nuC)"><font-awesome-icon icon="phone-square" class="size-export pointer entHover" /></div></template></el-table-column>
          <el-table-column type="selection" width="42"></el-table-column>
        </el-table>
        <el-pagination v-if="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
        </el-pagination>
        <typo-chart v-if="typoChart" class="typoChart" @close="closeTypo" :name="this.name" :typoChartData="this.typoData" />
        <DetailsEntreprise v-if="closeDet" :aEntDet='aEntDet' class="details" @close="closeDetails" />
        <select-box  v-if="multipleSelect.length > 0" :selection="this.multipleSelect" :current="this.name" @clear="clearSelection" />
      </div>
    </div>
</template>
<script>
import DetailsEnt from './../_subs/_subs/DetailsEntreprise.vue'
import SelectBox from './../SelectBox.vue'
import axios from "axios"
import TypoChart from './../_subs/charts/_subs_charts/TypoChart.vue'
import _ from 'lodash';

export default {
  name: 'EntTable',
  props: ['holdEntreprise','actFilter', 'search'],
  data () {
    return {
      docs: [],
      typoData:[],
      typoChart: false,
      closeDet: false,
      aEntDet: [],
      multipleSelect: [],
      name: 'EntTable',
      pagination: false,
      currentPage: 1,
      n: 0,
      p: 99,
      amount:0,
      year: '',
      lastYear: '',
      first: 0,
      entreprises: this.holdEntreprise
    }
  },
  watch: {
    holdEntreprise: function (val) {
      this.entreprises = val
    }
  },
  components: {
    'DetailsEntreprise': DetailsEnt,
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
      var data = []
      var x;
      var y;

      if (!this.entreprises || this.entreprises.length === 0){
        data = this.$store.state.holdEnt
        this.pagination = false
      } else {
        data = this.entreprises
      }

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
          const filtered = data.filter(function (entreprise) {
          return entreprise.noC.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
          || entreprise.nuC.toLowerCase().indexOf(that.search.toLowerCase()) >= 0
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
        // getEnt () {
        //     console.log('getEnt')
        //     console.log(this.entreprises, 'entreprises')
        //     if (this.entreprises.length === 0) {
        //       console.log('in')
        //       console.log(this.$store.state.holdings, 'this.$store.state.holdings')
        //       const filtered = this.$store.state.holdings.filter(d => {
        //         d.entreprises.forEach(e => {
        //           console.log('in ent', d.nuH , this.$route.params.nuH  )
        //           if (d.nuH === this.$route.params.nuH ) {
        //             console.log('nuh = nuh')
        //             return e
        //           }
        //         })
        //       })
        //       console.log(this.entreprises,'this.entreprises')
        //       console.log(filtered,'filtered')
        //       return this.entreprises = filtered
        //     } else return
        // },
    fetchData () {
        // this.error = this.post = null
        // this.loading = true
        // this.getEnt();
        console.log(this.holdEntreprise, 'holdEntreprise')
        console.log(this.$route.params, 'this.$route.params')
        console.log(this.$route, 'this.$route')
    },
    getCon(column) {
        var x;
        var y;
        if (column.prop === 'noH') {
            if (column.order === 'ascending') {
            this.entreprises.sort(function (a, b) {
                x = a.noH
                y = b.noH
                return x < y ? 1 : x > y ? -1 : 0
            })
            } else {
            this.entreprises.sort(function (a, b) {
                x = a.noH
                y = b.noH
                return x > y ? 1 : x < y ? -1 : 0
            })
            }
        }
        if (column.prop === 'noC') {
            if (column.order === 'ascending') {
            this.entreprises.sort(function (a, b) {
                x = a.noC
                y = b.noC
                return x < y ? 1 : x > y ? -1 : 0
            })
            } else {
            this.entreprises.sort(function (a, b) {
                x = a.noC
                y = b.noC
                return x > y ? 1 : x < y ? -1 : 0
            })
            }
        }
        if (column.prop === 'iCc') {
            if (column.order === 'ascending') {
            this.entreprises.sort(function (a, b) {
                x = a.iCc
                y = b.iCc
                return x < y ? 1 : x > y ? -1 : 0
            })
            } else {
            this.entreprises.sort(function (a, b) {
                x = a.iCc
                y = b.iCc
                return x > y ? 1 : x < y ? -1 : 0
            })
            }
        }
        if (column.prop === 'iAa') {
            if (column.order === 'ascending') {
            this.entreprises.sort(function (a, b) {
                x = a.iAa
                y = b.iAa
                return x < y ? 1 : x > y ? -1 : 0
            })
            } else {
            this.entreprises.sort(function (a, b) {
                x = a.iAa
                y = b.iAa
                return x > y ? 1 : x < y ? -1 : 0
            })
            }
        }
        if (column.prop === 'iTt') {
            if (column.order === 'ascending') {
            this.entreprises.sort(function (a, b) {
                x = a.iTt
                y = b.iTt
                return x < y ? 1 : x > y ? -1 : 0
            })
            } else {
            this.entreprises.sort(function (a, b) {
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
      filterDocsEnt(data) {
          var allDocs = this.docs
          var filteredDocs = [];
              _.find(allDocs, function(doc){
                if (doc.ne === data.nuC || (data.nuH === doc.nh && doc.ne == 0)) {
                  filteredDocs.push(doc)
                }
              }
          );
          return filteredDocs
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
    getEntDetails (data) {
      var info = data.nuC
      axios.post('https://courtier.cpms.fr/getEntrepriseInfo/'+`${info}`)
      .then(response => {
        this.aEntDet = response.data;
      })
    },
    assRowData(param) {
      var assurefilter = this.$store.state.assure
      var filteredAssure = []
      param.contracts.filter( e => {
        if (e === false) {
          return
        } else
          _.find(assurefilter, function(assure){
            if (assure.c.n === e.n) {
              assure.noC = param.noC
              assure.nuC = param.nuC
              assure.noH = param.noH
              assure.nuH = param.nuH
              filteredAssure.push(assure)
            }
          },
        )
      })
      this.$store.state.filteredAssures = filteredAssure
      this.$emit('enterAssure')
      // this.$router.push({ name: 'assures',params: {nuH: param.nuH, nuC: param.nuC}})
      this.$router.push({ name: 'assures', params:{hol: param.noH.toLowerCase(), nuH: param.nuH, ent: param.noC.toLowerCase(), nuC: param.nuC}})
    },
    cotFormating1 (data) {
        return data +' '+':'+' '+ new Date().getFullYear()
    },
    cotFormating2 (data) {
        var year = new Date().getFullYear()-1
        return data +' '+':'+' '+ year
    },
    closeDetails () {
      this.closeDet = false;
    },
    openDetailsEnt (data) {
      this.closeDet = true;
      this.getEntDetails(data)
    },
    contratsRowData (data) {
      var filteredData = []
      data.contracts.filter( e => {
        if (e === false) {
            return
        } else
          e.noC = data.noC
          e.nuC = data.nuC
          e.noH = data.noH
          e.nuH = data.nuH
          filteredData.push(e)
      })
      this.$store.state.holdEntCont = filteredData
      this.$store.state.parentBread = filteredData[0].noH.toLowerCase()
      this.$emit('holdContRow')
      // this.$router.push({ name: 'contrats', params:{ nuH:filteredData[0].nuH, nuC:data.nuC}})
      this.$router.push({ name: 'contrats', params:{hol:this.$store.state.parentBread, nuH:filteredData[0].nuH, ent:filteredData[0].noC.toLowerCase(), nuC:data.nuC}})
    },
    cotRowData (data) {
      var cotFilter = this.$store.state.cotisations
      var filteredCotisation = []
      // console.log(data, 'data entTable')
        data.contracts.forEach( f => {
          _.find(cotFilter, function(cotisation){
            if (cotisation.e === data.nuC && cotisation.c === f.n) {
                cotisation.noC = data.noC
                cotisation.nuC = data.nuC
                cotisation.noH = data.noH
                cotisation.nuH = data.nuH
                cotisation.l = f.l
                cotisation.l1 = f.l1
                cotisation.l2 = f.l2
                filteredCotisation.push(cotisation)
            }
          })
        })
        // _.find(cotFilter, function(cotisation){
        //     if (cotisation.e === data.nuC) {
        //       cotisation.noC = data.noC
        //       cotisation.nuC = data.nuC
        //       cotisation.noH = data.noH
        //       cotisation.nuH = data.nuH
        //       filteredCotisation.push(cotisation)
        //     }
        // })
      this.$store.state.filteredCotisations = filteredCotisation
      this.$store.state.parentBread = filteredCotisation[0].noC.toLowerCase()
      this.$emit('enterCotisation')
      // this.$router.push({ name: 'cotisations', params:{ nuH:this.$store.state.filteredCotisations[0].nuH, nuC: this.$store.state.filteredCotisations[0].nuC }})
      this.$router.push({ name: 'cotisations', params:{hol: this.$store.state.filteredCotisations[0].noH.toLowerCase(), nuH:this.$store.state.filteredCotisations[0].nuH, ent: this.$store.state.filteredCotisations[0].noC.toLowerCase(), nuC: this.$store.state.filteredCotisations[0].nuC }})
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
  mounted() {
    this.docs = this.$store.state.tableDocs
    this.search = ''
    this.defineYear();
    if (this.holdEntreprise.length === 0) {
      this.holdEntreprise = this.$store.state.holdEnt
    }
  },
  created () {
    this.fetchData();
  },
}
</script>
<style lang="scss" scoped>
@import "./../../../styles/_global.scss";

#entreprise-table {
  padding-bottom: 41px;
  // height: auto;
  // position: relative;
  box-sizing: border-box;
  max-height: 70%;
  min-height: 400px;
}
.icon-info:hover {
    color: $entTable-color;
}
.table-wrapping {
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
.entHover {
  font-weight: 550;
  color: rgb(105, 105, 105);
}
.typoChart {
    position: absolute;
    top: 0;
    left: 0;
}
.entHover:hover {
  color: $entTable-color;
}
.e-border {
  border-top: 3px solid $entTable-color;
}
.details {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  top: 0;
  height: 100%;
}
.table-wrapping {

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
.size-export:hover {
  color: $entTable-color
}
.el-pagination {
  display: flex;
  justify-content: center;
}


</style>