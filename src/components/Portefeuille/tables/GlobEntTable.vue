<template>
  <div id="glob-table" >
    <div class="table-wrapping">
      <el-table ref="multipleTable" :max-height="700" size="medium" show-pagination border :data="dataPagination" style="width: 100%; font-size: 10px; overflow: auto;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="e-border table-style">
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column property="noH" prop="noH" sortable label="HOLDING" min-width="220"><template slot-scope="scope" ><div class="data-wrapper md-txt" >{{scope.row.noH}} <br> {{scope.row.nuH}} </div></template></el-table-column>
        <el-table-column property="noC" prop="noC" sortable label="ENTREPRISES" min-width="150"><template slot-scope="scope"><div class="data-wrapper md-txt entHover pointer" @click="openDetailsEnt(scope.row)">{{scope.row.noC}} <br> {{scope.row.nuC}}</div></template></el-table-column>
        <el-table-column property="contrats" prop="iCc" sortable label="NOMBRE DE CONTRATS" show-overflow-tooltip width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt pointer entHover" @click="contratsRowData(scope.row)">{{scope.row.iCc}}</div></template></el-table-column>
        <el-table-column property="beneficiaire" prop="iAa" sortable label="NOMBRE D'ASSURES ET NOMBRE DE BENEFICIAIRES"  width="190"> <template slot-scope="scope" ><div class="data-wrapper pointer md-txt entHover" @click="assRowData(scope.row)">{{scope.row.iAa}} / {{scope.row.iBb}}</div></template></el-table-column>
          <el-table-column property="cotisations" label="COTISATIONS ENCAISSEES" width="115">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span>{{new Date().getFullYear()}}: <font-awesome-icon icon="square" class="cGreen"/><br>{{new Date().getFullYear()-1}}: <font-awesome-icon icon="square" class="cRed"/></span>
                <div slot="reference" class="name-wrappe"><div class="data-wrapper pointer md-txt align-right"  @click="cotRowData(scope.row)"><div class="cGreen fontWeight">{{scope.row.iCoo[0]}}</div><div class="cRed fontWeight">{{scope.row.iCoo[1]}}</div></div></div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column property="prestations" label="PRESTATIONS REGLEES" width="120">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span>{{new Date().getFullYear()}}: <font-awesome-icon icon="square" class="cGreen"/><br>{{new Date().getFullYear()-1}}: <font-awesome-icon icon="square" class="cRed"/></span>
                <div slot="reference" class="name-wrappe"><div class="data-wrapper md-txt align-right"><div class="cGreen fontWeight">{{scope.row.iPrr[0]}}</div><div class="cRed fontWeight">{{scope.row.iPrr[1]}}</div></div></div>
              </el-popover>
            </template>
          </el-table-column>
        <el-table-column property="tauxTeletransmissions" v-if="actFilter === 's'" prop="iTt" sortable label="TAUX DE TELETRANSMISSION" show-overflow-tooltip width="180"><template slot-scope="scope"><el-progress :text-inside="true" :stroke-width="18" :percentage="formatTaux(scope.row.iTt)" color="#894cfa" ></el-progress></template></el-table-column>
        <el-table-column property="documents" label="DOCUMENTS" width="90" style="text-align: center;">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right" class="align-center">
              <div class="align-center">
                <ul>
                  <li v-for="(doc, index) in filterDocsEnt(scope.row)" :key="index"><a :href="'/getDoc/' + doc.id" target="_blank" class="align-center"><font-awesome-icon icon="file-alt" class="icons align-center"/>{{doc.fn}}</a></li>
                </ul>
              </div>
              <div slot="reference" class="name-wrappe"><font-awesome-icon icon="folder-open" class="size-export pointer holHover"/></div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="typologie" v-if="actFilter === 's'" label="TYPOLOGIE DES APPELS TELEPHONIQUE" width="230" style="text-align: center;"><template slot-scope="scope"><div class="align-center" title="Typologie des appels" @click="getTypo(scope.row.nuC)"><font-awesome-icon icon="phone-square" class="size-export pointer entHover" /></div></template></el-table-column>
        <el-table-column type="selection" width="42"></el-table-column>
      </el-table>
      <el-pagination v-if="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="100" layout="total, prev, pager, next" :total="itemsCount">
      </el-pagination>
      <typo-chart v-if="typoChart" class="typoChart" @close="closeTypo" :name="this.name" :typoChartData="this.typoData" />
      <DetailsEntreprise v-if="closeDet" :aEntDet='aEntDet' class="details" @close="closeDetails"/>
      <select-box  v-if="multipleSelect.length > 0" :selection="this.multipleSelect" :current="this.name" />
    </div>
  </div>
</template>
<script>
import DetailsEnt from './../_subs/_subs/DetailsEntreprise.vue'
import SelectBox from './../SelectBox.vue'
import axios from "axios"
import TypoChart from './../_subs/charts/_subs_charts/TypoChart.vue'
import Lodash from 'lodash'

export default {
  name: 'globEnt-table',
  props:{
    entreprises: {
    type: Array,
    default: []
    },
    actFilter: {
      type: String
    },
    search: {
      type: String
    }
  },
  data () {
    return {
      docs: [],
      typoData:[],
      typoChart: false,
      closeDet: false,
      aEntDet: [],
      multipleSelect: [],
      name: 'globEnt-table',
      hello: true,
      pagination: false,
      currentPage: 1,
      n: 0,
      p: 99,
      amount: 0,
    }
  },
  components: {
   'DetailsEntreprise': DetailsEnt,
   'select-box': SelectBox,
   'typo-chart': TypoChart
  },
  computed: {
    itemsCount () {
      var count = this.amount
      return count
    },
    dataPagination () {
      var self = this;
      if (!this.entreprises || this.entreprises.length === 0) return [];
      var data = this.entreprises;

      if(this.search.length >= 3){
        this.pagination = false
        const filtered = data.filter(function (entreprise) {
        return entreprise.noC.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        || entreprise.nuC.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
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
      // console.log(`current page: ${val}`);
    },
    cotRowData (data) {
      var cotFilter = this.$store.state.cotisations
      var filteredCotisation = []
        // _.find(cotFilter, function(cotisation){
        //     if (cotisation.e === data.nuC) {
        //       cotisation.noC = data.noC
        //       cotisation.nuC = data.nuC
        //       cotisation.noH = data.noH
        //       cotisation.nuH = data.nuH
        //       filteredCotisation.push(cotisation)
        //     }
        // })
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
      this.$store.state.filteredCotisations = filteredCotisation
      this.$store.state.parentBread = filteredCotisation[0].noC.toLowerCase()
      this.$emit('enterCotisation')
      this.$router.push({ name: 'cotisations', params:{hol: this.$store.state.filteredCotisations[0].noH.toLowerCase(), nuH: this.$store.state.filteredCotisations[0].nuH, ent: this.$store.state.filteredCotisations[0].noC.toLowerCase(), nuC: this.$store.state.filteredCotisations[0].nuC} })
    },
    getEntDetails (param) {
      var info = param.nuC
      axios.post('https://courtier.cpms.fr/getEntrepriseInfo/'+`${info}`)
      .then(response => {
        this.aEntDet = response.data
      })
    },
    assRowData(data) {
      var assurefilter = this.$store.state.assure
      var filteredAssure = []
      data.contracts.filter( e => {
          if (e === false) {
              return
          } else
            _.find(assurefilter, function(assure){
              if (assure.c.n === e.n) {
              assure.noC = data.noC
              assure.nuC = data.nuC
              assure.noH = data.noH
              assure.nuH = data.nuH
              filteredAssure.push(assure)
              }
            }
        )
      })
      this.$store.state.filteredAssures = filteredAssure
      this.$store.state.parentBread = filteredAssure[0].noC.toLowerCase()
      this.$emit('enterAssure')
      this.$router.push({ name: 'assures', params:{hol: data.noH.toLowerCase(), nuH: data.nuH, ent: data.noC.toLowerCase(), nuC: data.nuC}})
    },
    cotFormating1 (data) {
      return data +' '+':'+' '+ new Date().getFullYear()
    },
    cotFormating2 (data) {
      var year = new Date().getFullYear()-1
      return data +' '+':'+' '+ year
    },
    openDetailsEnt (data) {
      this.getEntDetails(data);
      this.closeDet = true;
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
      this.$router.push({ name: 'contrats', params:{hol:this.$store.state.parentBread, nuH:filteredData[0].nuH, ent:filteredData[0].noC.toLowerCase(), nuC:filteredData[0].nuC}})
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
    },
    closeDetails () {
      this.closeDet = false;
    }
  },
  created () {
    if (this.entreprises.length > 99) return this.pagination = true;
  },
  mounted() {
    this.docs = this.$store.state.tableDocs
    this.search = ''
  },
}
</script>
<style lang="scss" scoped>
@import "../../../styles/_global.scss";

#glob-table {
  // position: relative;
  box-sizing: border-box;
  max-height: auto;
  padding-bottom: 41px;
  overflow: hidden;
}
.typoChart {
    position: absolute;
    top: 0;
    left: 0;
}
.el-pagination {
  display: flex;
  justify-content: center;
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
.details {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  top: 0;
  height: 100%;
}
.entHover {
  font-weight: 550;
  color: rgb(105, 105, 105);
}
.entHover:hover {
  color: $entTable-color;
}
.e-border {
  box-sizing: content-box;
  border-top: 3px solid $entTable-color;
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
</style>

// .filter(data => !search || data.noC.toLowerCase().includes(search.toLowerCase())) entreprises.slice(0,100)