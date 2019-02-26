<template>
    <div id="DemoChart">
        <h2>Répartition moyenne de la population</h2>
        <el-row class="outer-wrapper">
            <el-col :span="12">
                <el-table show-summary size="small" :data="filteredTableTy" style="width: 100%;">
                    <el-table-column :label="cotFormating1">
                        <el-table-column prop="cat" ><template slot-scope="scope" ><div class="data-wrapper md-txt">{{formatRow(scope.row.cat)}}</div></template></el-table-column>
                        <el-table-column prop="a" label="Assurés" width="80"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.a}}</div></template></el-table-column>
                        <el-table-column prop="c" label="Conjoints" width="90"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.c}}</div></template></el-table-column>
                        <el-table-column prop="e" label="Enfants" width="80"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.e}}</div></template></el-table-column>
                        <el-table-column prop="s" label="Ascendants" width="100"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.s}}</div></template></el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12" class="chart">
                <div class="hello" id="chartdiv"></div>
            </el-col>
        </el-row>
        <el-row class="outer-wrapper">
            <el-col :span="12">
                <el-table show-summary size="small" :data="filteredTableLy" style="width: 100%">
                    <el-table-column :label="cotFormating2">
                        <el-table-column prop="cat"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{formatRow(scope.row.cat)}}</div></template></el-table-column>
                        <el-table-column prop="a" label="Assurés" width="80"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.a}}</div></template></el-table-column>
                        <el-table-column prop="c" label="Conjoints" width="90"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.c}}</div></template></el-table-column>
                        <el-table-column prop="e" label="Enfants" width="80"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.e}}</div></template></el-table-column>
                        <el-table-column prop="s" label="Ascendants" width="100"><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.s}}</div></template></el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <div class="hello" id="chartdiv2"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import _ from 'lodash';

am4core.useTheme(am4themes_animated);


export default {
    name: 'DemoChart',
    data() {
        return {
            selection: [],
            filteredAss: [],
            tableLy: [],
            tableTy: [],
            TChartLy: [],
            TChartTy: [],
        };
    },
    computed: {
        filteredTableTy () {
            var tables = this.tableTy
            var table = []

            _.each(this.$store.state.translation.category, function (value) {
                var variable = { 'cat': '', 'a': 0, 'c': 0, 'e': 0, 's': 0, }
                tables.forEach( e => {
                    if ( e.cat === value ){
                        variable.cat = e.cat
                        variable.a = variable.a + e.a
                        variable.c = variable.c + e.c
                        variable.e = variable.e + e.e
                        variable.s = variable.s + e.s
                    }
                })
                if ( (variable.a && variable.c && variable.e && variable) !== 0) {
                    table.push(variable)
                } else return
            });
            return table
        },
        filteredTableLy () {
            var tables = this.tableLy
            var table = []

            _.each(this.$store.state.translation.category, function (value) {
                var variable = { 'cat': '', 'a': 0, 'c': 0, 'e': 0, 's': 0 }
                tables.forEach( e => {
                    if ( e.cat === value ){
                        variable.cat = e.cat
                        variable.a = variable.a + e.a
                        variable.c = variable.c + e.c
                        variable.e = variable.e + e.e
                        variable.s = variable.s + e.s
                    }
                })
                if ( (variable.a && variable.c && variable.e && variable) !== 0) {
                    table.push(variable)
                } else return
            });
            return table
        },
        multipleSelection () {
            // this.selection = this.$store.state.selection
            this.filteredAss = [];
            this.filterAppel(this.$store.state.selectedItems)
        },

        cotFormating1 () {
            var n = new Date().getFullYear()
            var str = n.toString()
            return  str
        },
        cotFormating2 () {
            var n = new Date().getFullYear()-1
            var str = n.toString()
            return  str
        },
    },
    // watch: {
    //   multipleSelection (state) {
    //     return this.selection = state
    //     this.filterAppel(state);
    //       // console.log(state, 'state')
    //   }
    // },
    methods: {
        formatRow (data) {
            if ( data === '') {
                return 'Actif'
            } else return data
        },
        filterAppel (f) {
            this.filteredAss = []
            f.forEach(e => {
                var filteredAss = []
                e.aA = this.$store.state.translation.category[e.a]
                _.find(this.$store.state.assure, function(item){
                    if ( item.nc === e.n) {
                        item.aA = e.aA
                        filteredAss.push(item)
                    }
                })
                this.filteredAss.push(filteredAss)
            })
            this.sortDataTable(this.filteredAss);
        },
        sortDataTable(data) {
            this.tableLy = []
            this.tableTy = []
            data.filter( e => {
                var varLy = { 'cat': '', 'a': 0, 'c': 0, 'e': 0, 's': 0, }
                var varTy = { 'cat': '', 'a': 0, 'c': 0, 'e': 0, 's': 0, }
                e.forEach( f => {
                    if(f.aA !== null) varLy.cat = f.aA;
                    if(f.ly.a !== null) varLy.a += parseInt(f.ly.a);
                    if(f.ly.c !== null) varLy.c += parseInt(f.ly.c);
                    if(f.ly.e !== null) varLy.e += parseInt(f.ly.e);
                    if(f.ly.s !== null) varLy.s += parseInt(f.ly.s);

                    if(f.aA !== null) varTy.cat = f.aA;
                    if(f.ty.a !== null) varTy.a += parseInt(f.ty.a);
                    if(f.ty.c !== null) varTy.c += parseInt(f.ty.c);
                    if(f.ty.e !== null) varTy.e += parseInt(f.ty.e);
                    if(f.ty.s !== null) varTy.s += parseInt(f.ty.s);
                })
                this.tableLy.push(varLy);
                this.tableTy.push(varTy);
            })
            this.sortChartDataLy(this.tableLy);
            this.sortChartDataTy(this.tableTy);
        },
        sortChartDataLy (dataLy) {
            this.TChartLy = []
            var total = { 'a': 0, 'c': 0, 'e': 0, 's': 0, }
            dataLy.forEach( e => {
                total.a += parseInt(e.a);
                total.c += parseInt(e.c);
                total.e += parseInt(e.e);
                total.s += parseInt(e.s);
            })
            if ( (total.a && total.c && total.e && total) !== 0) {
                this.TChartLy.push(total)
            }
                this.createChart2();
        },
        sortChartDataTy (dataTy) {
            this.TChartTy = []
            var total = { 'a': 0, 'c': 0, 'e': 0, 's': 0, }
            dataTy.forEach( e => {
                total.a += parseInt(e.a);
                total.c += parseInt(e.c);
                total.e += parseInt(e.e);
                total.s += parseInt(e.s);
            })
            if ( (total.a && total.c && total.e && total) !== 0) {
                this.TChartTy.push(total)
            }
                this.createChart1();
        },

        createChart1() {
            var n1 = new Date().getFullYear()
            var year = n1.toString()

            var chart = am4core.create("chartdiv", am4charts.PieChart3D);
            // Add Data
             if (this.TChartTy.length === 0) {
                var label = chart.createChild(am4core.Label);
                label.text = "Aucune donnée";
                label.fontSize = 20;
                label.align = "center";
                label.isMeasured = false;
                label.x = am4core.percent(50);
                label.horizontalCenter = "middle";
                label.y = am4core.percent(30);
                return 
            
            } else {
                this.TChartTy.forEach(e => {
                    chart.data.push(
                    {
                        "Type": "Assurés",
                        "Qté": e.a,
                    },
                    {
                        "Type": "Enfants",
                        "Qté": e.e,
                    },
                    {
                        "Type": "Conjoints",
                        "Qté": e.c,
                    },
                    {
                        "Type": "Ascendants",
                        "Qté": e.s,
                    }
                    )
                })

                chart.fontSize = "13px"
                chart.exporting.menu = new am4core.ExportMenu();
                chart.startDuration = 0;

                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries3D());
                pieSeries.dataFields.value = "Qté";
                pieSeries.dataFields.category = "Type";
                pieSeries.ticks.template.disabled = true;
                pieSeries.angle = 30;

                var title = chart.titles.create();
                title.text = year;
                title.fontSize = 20;
                title.marginBottom = 10;
            }
        },
        createChart2() {

            var n2 = new Date().getFullYear()-1
            var lastYear = n2.toString()

            var chart = am4core.create("chartdiv2", am4charts.PieChart3D);
            // Add data
            if (this.TChartLy.length === 0) {
                var label = chart.createChild(am4core.Label);
                label.text = "Aucune donnée";
                label.fontSize = 20;
                label.align = "center";
                label.isMeasured = false;
                label.x = am4core.percent(50);
                label.horizontalCenter = "middle";
                label.y = am4core.percent(30);
                return 
            
            } else {
                this.TChartLy.forEach(e => {
                    chart.data.push(
                    {
                        "Type": "Assurés",
                        "Qté": e.a,
                    },
                    {
                        "Type": "Enfants",
                        "Qté": e.e,
                    },
                    {
                        "Type": "Conjoints",
                        "Qté": e.c,
                    },
                    {
                        "Type": "Ascendants",
                        "Qté": e.s,
                    }
                    )
                })

                chart.fontSize = "13px"
                chart.exporting.menu = new am4core.ExportMenu();
                // Add and configure Series
                var pieSeries = chart.series.push(new am4charts.PieSeries3D());
                pieSeries.dataFields.value = "Qté";
                pieSeries.dataFields.category = "Type";
                pieSeries.ticks.template.disabled = true;
                pieSeries.angle = 30;

                var title = chart.titles.create();
                title.text = lastYear;
                title.fontSize = 20;
                title.marginBottom = 10;
            }
        }
    },
    beforeDestroy() {
    },
    created() {
        this.selection = this.$store.state.selectedItems
    },
    mounted() {
        this.filterAppel(this.$store.state.selectedItems)
        this.createChart2();
        this.createChart1();
    },
}
</script>

<style lang="scss" scoped>
h2 {
    text-align: center;
}
#DemoChart {
    padding: 20px;
    background-color: white;
    box-sizing: border-box;
}
#chartdiv {
}
#chartdiv2 {
    padding-top: 20px;
}
.hello {
  width: 100%;
  position: relative;
  padding-bottom: 20%;
  box-sizing: border-box;
}
.outer-wrapper {
    padding-top: 20px;
}
.align-center {
    display: flex;
    justify-content: center;
}
</style>