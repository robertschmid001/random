<template>
    <div id="Recap-page">
        <template>
            <el-table ref="multipleTable" border :max-height="700" size="medium" :data="selection" style="width: 100%; font-size: 10px;" @selection-change="handleSelectionChange" :stripe="true" :highlight-current-row="true" class="c-border">
                <el-table-column property="noH" prop="noH" label="HOLDING" sortable min-width="160"><template slot-scope="scope"><div class="data-wrapper md-txt" > {{scope.row.noH }} <br> {{scope.row.nuH }}  </div></template></el-table-column>
                <el-table-column property="noC" prop="noC" label="ENTREPRISES" sortable min-width="160"><template slot-scope="scope" ><div class="data-wrapper md-txt entHover pointer">{{scope.row.noC}} <br> {{scope.row.nuC}} </div></template></el-table-column>
                <el-table-column property="contrat" prop="l" label="CONTRAT" sortable min-width="180"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transLibelle(scope.row.l)}}</div></template></el-table-column>
                <el-table-column property="type" prop="tc" label="TYPE DE CONTRAT" sortable width="200"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transType(scope.row.tc)}}</div></template></el-table-column>
                <el-table-column property="categorie" prop="a" label="CATEGORIE" sortable width="110"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCat(scope.row.a)}}</div></template></el-table-column>
                <el-table-column property="college" prop="o" label="COLLEGE" sortable width="110"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transCol(scope.row.o)}}</div></template></el-table-column>
                <el-table-column property="assureur" prop="s" label="ASSUREUR" sortable width="110"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transAss(scope.row.s)}}</div></template></el-table-column>
                <el-table-column property="reseauDeSoin" prop="r" label="RESEAU DE SOIN" sortable width="140"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{transRes(scope.row.r)}}</div></template></el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>

export default {
    name: 'RecapPage',
    data () {
        return {
            selection: []
        }
    },
    props: {
    }, 
    components: {
    },
    computed: {
        acFilter () {
            var data = this.actFilter
            return data
        },
        getName () {
            return this.name
        },
        dataPagination () {
            if (!this.contrats || this.contrats.length === 0) return [];
            var data = this.contrats;
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
        }
    },
  created () {
      this.selection = this.$store.state.selectedItems
      console.log(this.selection, 'this.selection')
  }
}
</script>

<style lang="scss" scoped>
#Recap-page {
    padding: 30px 30px 60px 30px
}
</style>