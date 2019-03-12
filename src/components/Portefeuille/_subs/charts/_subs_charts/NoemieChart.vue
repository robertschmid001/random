<template>
  <div id="NoemieChart">
        <h2>Télétransmission</h2>
        <el-row class="outer-wrapper">
            <el-col :span="8">
              <div class="tablewrapper">
                <el-table size="small" :data="table" style="max-width: 600px;" :default-sort = "{prop: 'ty', order: 'descending'}" >
                        <el-table-column prop="cat" ><template slot-scope="scope" ><div class="data-wrapper md-txt">{{scope.row.cat}}</div></template></el-table-column>
                        <el-table-column prop="ly" :label="cotFormating2" width="60"><template slot-scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.ly}}</div></template></el-table-column>
                        <!-- <el-table-column prop="totalLy" :label="cotFormating2 + '(%)' " width="70"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.totalLy}}%</div></template></el-table-column> -->
                        <el-table-column prop="ty" :label="cotFormating1" width="60"><template slot-scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.ty}}</div></template></el-table-column>
                        <!-- <el-table-column prop="totalTy" :label="cotFormating1 + '(%)'" width="70"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.totalTy}}%</div></template></el-table-column> -->
                </el-table>
              </div>
            </el-col>
            <el-col :span="16" class="chart">
                <div class="hello" id="chartdiv"></div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import _ from 'lodash';

export default {
  name: 'NoemieChart',
  data () {
    return {
      filteredAss: [],
      table: [],
    }
  },
  computed: {
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
  methods: {
    filterContracts (data) {
      var listAssure = []
      var allAss = this.$store.state.assure
      data.forEach(e => {
        _.find(allAss, function(assure){
          if (assure.nc === e.n) {
            listAssure.push(assure)
          }
        })
      })
      this.sortData(listAssure);
    },
    sortData (data) {
      this.table = []
      var table = []
      var totalLy = 0
      var totalTy = 0
      
      _.each(this.$store.state.translation.connecte, function (value, key) {
        var variable = { 'cat': value, 'ly': 0, 'ty': 0 }
        _.find(data, function(item){
          if ( key === item.t) {
            if (item.ly.a !== "0.00" && item.ly.a !== null) {
              variable.ly = variable.ly + 1
              totalLy = totalLy + 1
            }
            if (item.ty.a !== "0.00" && item.ty.a !== null) {
              variable.ty = variable.ty + 1
              totalTy = totalTy + 1
            }
          }
        })
        if (variable.ly !== 0 || variable.ty !== 0 ) {
          table.push(variable)
        }
      });
      table.forEach ( e => {
        e.totalLy = (totalLy !== 0) ? +((e.ly/totalLy)*100).toFixed(2) : 0
        e.totalTy = (totalTy !== 0) ? +((e.ty/totalTy)*100).toFixed(2) : 0
      })
      table.sort(function (a, b) {
        var x = a.ty
        var y = b.ty
        return x > y ? 1 : x < y ? -1 : 0
      })
      this.table = table
      this.createChart();
    },
    createChart () {

      var n1 = new Date().getFullYear()
      var year = n1.toString()

      var n2 = new Date().getFullYear()-1
      var lastYear = n2.toString()

      /* Create chart instance */
      var chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 25;
      chart.legend = new am4charts.Legend();
      /* Add data */
      if (this.table.length === 0) {
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

        this.table.forEach(e => {
          chart.data.push(e)
        })

        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "cat";
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.grid.template.disabled = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.renderer.minGridDistance = 10;
        valueAxis.renderer.grid.template.disabled = false;
        // valueAxis.renderer.labels.template.disabled = true;
        // valueAxis.min = 0;
        // valueAxis.max = 100;
        // valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.adapter.add("text", function(text) {
          return "";
        });

        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.align = "right";
        chart.exporting.menu.verticalAlign = "top";

        chart.exporting.menu.items = [
            {
                "label": "Télécharger",
                "menu": [
                { "type": "png", "label": "PNG" },
                { "type": "jpg", "label": "JPG" },
                { "label": "Print", "type": "print" }
                ]
            }
        ];

        /* Create series */
        var series2 = chart.series.push(new am4charts.ColumnSeries());
          series2.dataFields.valueY = "totalTy";
          series2.name = year;
          series2.dataFields.categoryX = "cat";
          series2.columns.template.strokeWidth = 1;
          series2.columns.template.strokeOpacity = 0.5;
          series2.columns.template.width = am4core.percent(100);
          series2.tooltip.pointerOrientation = "vertical";
          series2.columns.template.tooltipText = "{name} {cat}: {ty}";

        var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "totalLy";
          series.name = lastYear;
          series.dataFields.categoryX = "cat";
          series.columns.template.strokeWidth = 1;
          series.columns.template.strokeOpacity = 0.5;
          series.columns.template.width = am4core.percent(100);
          series.tooltip.pointerOrientation = "vertical";
          series.columns.template.tooltipText = "{name} {cat}: {ly}";



        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = " {valueY.value.formatNumber('#.00')}%";
        valueLabel.label.horizontalCenter = "left";
        //left
        valueLabel.label.dx = -15 ;
        valueLabel.label.dy = -5 ;
        valueLabel.label.fontSize = 12;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

        var valueLabel2 = series2.bullets.push(new am4charts.LabelBullet());
        valueLabel2.label.text = " {valueY.value.formatNumber('#.00')}%";
        valueLabel2.label.horizontalCenter = "left";
        valueLabel2.label.dx = -15;
        valueLabel2.label.dy = -5 ;
        valueLabel2.label.fontSize = 12;
        valueLabel2.label.hideOversized = false;
        valueLabel2.label.truncate = false;
      }
    }
  },
  mounted () {
    this.filterContracts(this.$store.state.selectedItems)
    this.createChart();
  }
}
</script>

<style lang="scss" scoped>
h2 {
    text-align: center;
}
.hello {
  font-size: 12px;
  width: 100%;
  position: relative;
  padding-bottom: 200px;
  box-sizing: border-box;
}
.tablewrapper {
  padding: 20px;
    display: flex;
    justify-content: center;
}
.left {
  width: 50%;
}
.right {
  width: 50%;
}
.data-wrapper {
  display: flex;
}
// <template>
//   <div id="NoemieChart">
//         <h2>Télétransmission</h2>
//         <el-row class="outer-wrapper">
//             <el-col :span="8">
//               <div class="tablewrapper">
//                 <el-table size="small" :data="table" style="max-width: 600px;" :default-sort = "{prop: 'ty', order: 'descending'}" >
//                         <el-table-column prop="cat" ><template scope="scope" ><div class="data-wrapper md-txt">{{formatCat(scope.row.cat)}}</div></template></el-table-column>
//                         <el-table-column prop="ly" :label="cotFormating2" width="60"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.ly}}</div></template></el-table-column>
//                         <!-- <el-table-column prop="totalLy" :label="cotFormating2 + '(%)' " width="70"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.totalLy}}%</div></template></el-table-column> -->
//                         <el-table-column prop="ty" :label="cotFormating1" width="60"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.ty}}</div></template></el-table-column>
//                         <!-- <el-table-column prop="totalTy" :label="cotFormating1 + '(%)'" width="70"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.totalTy}}%</div></template></el-table-column> -->
//                 </el-table>
//               </div>
//             </el-col>
//             <el-col :span="16" class="chart">
//                 <div class="hello" id="chartdiv"></div>
//             </el-col>
//         </el-row>
//   </div>
// </template>

// <script>
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";

// export default {
//   name: 'NoemieChart',
//   data () {
//     return {
//       filteredAss: [],
//       table: [],
//     }
//   },
//   computed: {
//     cotFormating1 () {
//       var n = new Date().getFullYear()
//       var str = n.toString()
//       return  str
//     },
//     cotFormating2 () {
//         var n = new Date().getFullYear()-1
//         var str = n.toString()
//         return  str
//     },
//   },
//   methods: {
//     formatCat (data) {
//       if ( data === '') {
//         return 'Actif'
//       } else {
//         return data
//       }
//     },
//     filterContracts (data) {
//       var listAssure = []
//       var allAss = this.$store.state.assure
//       data.forEach(e => {
//         _.find(allAss, function(assure){
//           if (assure.nc === e.n) {
//             listAssure.push(assure)
//           }
//         })
//       })
//       this.sortData(listAssure);
//     },
//     sortData (data) {
//       this.table = []
//       var table = []
//       var totalLy = 0
//       var totalTy = 0
      
//       _.each(this.$store.state.translation.connecte, function (value, key) {
//         var variable = { 'cat': value, 'ly': 0, 'ty': 0 }
//         _.find(data, function(item){
//           if ( key === item.t) {
//             if (item.ly.a !== "0.00" && item.ly.a !== null) {
//               variable.ly = variable.ly + 1
//               totalLy = totalLy + 1
//             }
//             if (item.ty.a !== "0.00" && item.ty.a !== null) {
//               variable.ty = variable.ty + 1
//               totalTy = totalTy + 1
//             }
//           }
//         })
//         if (variable.ly !== 0 || variable.ty !== 0 ) {
//           table.push(variable)
//         }
//       });
//       table.forEach ( e => {
//         e.totalLy = (totalLy !== 0) ? +((e.ly/totalLy)*100).toFixed(2) : 0
//         e.totalTy = (totalTy !== 0) ? +((e.ty/totalTy)*100).toFixed(2) : 0
//       })
//       this.table = table
//       this.createChart();
//     },
//     createChart () {

//       /* Create chart instance */
//       var chart = am4core.create("chartdiv", am4charts.XYChart);
//       chart.paddingRight = 25;
//       chart.legend = new am4charts.Legend();
//       /* Add data */
//       if (this.table.length === 0) {
//         var label = chart.createChild(am4core.Label);
//           label.text = "Aucune donnée";
//           label.fontSize = 20;
//           label.align = "center";
//           label.isMeasured = false;
//           label.x = am4core.percent(50);
//           label.horizontalCenter = "middle";
//           label.y = am4core.percent(30);
//         return 
//       } else {

//         this.table.forEach(e => {
//           chart.data.push(e)
//         })

//         /* Create axes */
//         var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
//         categoryAxis.dataFields.category = "cat";
//         categoryAxis.renderer.minGridDistance = 50;
//         categoryAxis.renderer.grid.template.disabled = true;

//         var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
//         valueAxis.renderer.minGridDistance = 50;
//         valueAxis.renderer.grid.template.disabled = true;
//         valueAxis.min = 0;
//         valueAxis.max = 100;
//         valueAxis.strictMinMax = true;
//         valueAxis.renderer.labels.template.adapter.add("text", function(text) {
//           return text + "%";
//         });

//         /* Create ranges */

//         /* Create series */
//         var series = chart.series.push(new am4charts.ColumnSeries());
//         series.dataFields.valueX = "totalLy";
//         series.name = new Date().getFullYear()-1;
//         series.dataFields.categoryY = "cat";
//         series.columns.template.strokeWidth = 1;
//         series.columns.template.strokeOpacity = 0.5;
//         series.columns.template.height = am4core.percent(20);
//         series.tooltip.pointerOrientation = "vertical";
//         series.columns.template.tooltipText = "{name} {cat}: {ly}";

//         var series2 = chart.series.push(new am4charts.ColumnSeries());
//         series2.dataFields.valueX = "totalTy";
//         series2.name = new Date().getFullYear();
//         series2.dataFields.categoryY = "cat";
//         series2.columns.template.strokeWidth = 1;
//         series2.columns.template.strokeOpacity = 0.5;
//         series2.columns.template.height = am4core.percent(20);
//         series2.tooltip.pointerOrientation = "vertical";
//         series2.columns.template.tooltipText = "{name} {cat}: {ty}";

//         var valueLabel = series.bullets.push(new am4charts.LabelBullet());
//         valueLabel.label.text = " {valueX.value.formatNumber('#.00')}%";
//         valueLabel.label.horizontalCenter = "left";
//         valueLabel.label.dx = 10;
//         valueLabel.label.fontSize = 12;
//         valueLabel.label.hideOversized = false;
//         valueLabel.label.truncate = false;

//         var valueLabel = series2.bullets.push(new am4charts.LabelBullet());
//         valueLabel.label.text = " {valueX.value.formatNumber('#.00')}%";
//         valueLabel.label.horizontalCenter = "left";
//         valueLabel.label.dx = 10;
//         valueLabel.label.fontSize = 12;
//         valueLabel.label.hideOversized = false;
//         valueLabel.label.truncate = false;
//       }
//     }
//   },
//   mounted () {
//     this.filterContracts(this.$store.state.selectedItems)
//     this.createChart();
//   }
// }
// </script>
</style>
