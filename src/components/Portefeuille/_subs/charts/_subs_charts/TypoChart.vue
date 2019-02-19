<template>
  <div id="TypoChart">
        <el-row class="outer-wrapper">
            <h1>Typologie des appels téléphoniques</h1>
          <font-awesome-icon icon="times" class="close-icon pointer"  @click="close"/>
            <el-col :span="8">
              <div  v-show="this.filteredData.length > 0" class="tablewrapper">
                <el-table size="small" :data="filteredData" style="max-width: 600px;" :default-sort= "{prop: 'y', order: 'descending'}">
                        <el-table-column prop="cat" label="" ><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.m}}</div></template></el-table-column>
                        <el-table-column prop="by" :label="cotFormating2" width="80"><template scope="scope" ><div class="data-wrapper md-txt "><div class="align-left left">{{scope.row.by}}</div></div></template></el-table-column>
                        <el-table-column prop="y" :label="cotFormating1" width="90"><template scope="scope" ><div class="data-wrapper md-txt "><div class="align-left left">{{scope.row.y}}</div></div></template></el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="16" class="chart" >
                <div v-show="this.filteredData.length > 0" class="hello" id="chartdiv"></div>
                <div v-show="this.filteredData.length <= 0" class="noData"> Aucune donnée</div>
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
  name: 'TypoChart',
  props: ['typoChartData', 'name'],
  data () {
    return {
      appel: [],
      appelTrans: [],
      filteredAppel:[],
      filteredData: [],
    }
  },
  computed: {
    cotFormating1 () {
      var n = new Date().getFullYear()
      var str = n.toString()
      console.log(str, 'str 2019')
      return  str
    },
    cotFormating2 () {
      var n = new Date().getFullYear()-1
      var str = n.toString()
      console.log(str, 'str 2018')
      return  str
    },
  },
  methods: {
    chartYear () {
      var n = new Date().getFullYear()
      var str = n.toString()
      console.log(str, 'str 2019')
      return  str = this.year
    },
    chartLastYear () {
      var n = new Date().getFullYear()-1
      var str = n.toString()
      console.log(str, 'str 2018')
      return  str = this.lastYear
    },
    filterAppel () {
      this.appel.forEach(e => {
          if (e.nh === this.typoChartData && this.name === "HolTable") {
            e.mM = this.$store.state.translation.appel[e.m]
            this.filteredAppel.push(e)
          }
          if (e.ne === this.typoChartData && this.name === "EntTable" || this.name === "globEnt-table") {
            e.mM = this.$store.state.translation.appel[e.m]
            this.filteredAppel.push(e)
          }
      })
      this.sortData(this.filteredAppel);
    },
    sortData (data) {
      var filteredData = []
      var totalLy = 0
      var totalTy = 0

      var n1 = new Date().getFullYear()
      var str1 = n1.toString()

      var n2 = new Date().getFullYear()-1
      var str2 = n2.toString()

      _.each(this.$store.state.translation.appel, function (value, key) {
        var variable = { 'm': value, 'y': 0, 'by': 0 }
        _.find(data, function(item){
          if ( key === item.m && item.y === str2) {
            variable.by = variable.by +1
            totalLy = totalLy + 1
          }
          if ( key === item.m && item.y === str1) {
            variable.y = variable.y +1
            totalTy = totalTy + 1
          }
        })
        if (variable.y !== 0 || variable.by !== 0) {
          filteredData.push(variable)
        }
      });
      filteredData.forEach ( e => {
        e.totalLy = (totalLy !== 0) ? +((e.by/totalLy)*100).toFixed(2) : 0
        e.totalTy = (totalTy !== 0) ? +((e.y/totalTy)*100).toFixed(2) : 0
      })
      this.filteredData = filteredData
    },
    close () {
      this.$emit('close');
    },
    createChart () {

      var n1 = new Date().getFullYear()
      var year = n1.toString()

      var n2 = new Date().getFullYear()-1
      var lastYear = n2.toString()
      

      am4core.useTheme(am4themes_animated);

      /* Create chart instance */
      var chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 25;
      chart.legend = new am4charts.Legend();

      /* Add data */
      this.filteredData.forEach(e => {
        chart.data.push(e
          // {
          //   "m": e.m,
          //   "y": e.y,
          //   "by": e.by
          // }
        )
      })

      /* Create axes */
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "m";
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.grid.template.disabled = true;
        // categoryAxis.renderer.cellStartLocation = 0.1;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 20;
        valueAxis.renderer.grid.template.disabled = false;
        valueAxis.min = 5;
        valueAxis.max = 100;
        valueAxis.strictMax = true;
        valueAxis.renderer.labels.template.adapter.add("text", function(text) {
          return text + "%";
        });

      /* Create ranges */
      // var cellSize = 30;
      //   chart.events.on("datavalidated", function(ev) {

      //     // Get objects of interest
      //     var chart = ev.target;
      //     var categoryAxis = chart.yAxes.getIndex(0);

      //     // Calculate how we need to adjust chart height
      //     var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

      //     // get current chart height
      //     var targetHeight = chart.pixelHeight + adjustHeight;

      //     // Set it on chart's container
      //     chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      //   });


      /* Create series */

      
      var series = chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.stroke = am4core.color("#fff");
        series.columns.template.strokeWidth = 2;

        series.dataFields.valueX = "totalTy";
        series.name = year;
        series.dataFields.categoryY = "m";
        series.columns.template.height = am4core.percent(100);
        series.tooltip.pointerOrientation = "vertical";
        series.columns.template.tooltipText = "{name} {m}: {y}";

      var series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.columns.template.stroke = am4core.color("#fff");
        series2.columns.template.strokeWidth = 2;

        series2.dataFields.valueX = "totalLy";
        series2.name = lastYear;
        series2.dataFields.categoryY = "m";
        series2.columns.template.height = am4core.percent(100);
        series2.tooltip.pointerOrientation = "vertical";
        series2.columns.template.tooltipText = "{name} {m}: {by}";
        series2.columns.template.fill = am4core.color("#049797");



   var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = " {valueX.value.formatNumber('#.00')}%";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 10;
        valueLabel.label.fontSize = 9;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

    var valueLabel2 = series2.bullets.push(new am4charts.LabelBullet());
      valueLabel2.label.text = " {valueX.value.formatNumber('#.00')}%";
      valueLabel2.label.horizontalCenter = "left";
      valueLabel2.label.dx = 10;
      valueLabel2.label.fontSize = 9;
      valueLabel2.label.hideOversized = false;
      valueLabel2.label.truncate = false;

   
    }
  },
  created () {
    this.appel= this.$store.state.appel;
    this.filterAppel();
  },
  mounted () {
    this.createChart();
  }
}
</script>

<style lang="scss" scoped>
#TypoChart {
  background:rgba(0,0,0,0.5);
  padding-left: 70px;
  padding-right: 6px;
  padding-top: 10px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  height: 100%;
}
h1 {
  justify-content: center;
  display: flex;
  margin-bottom: 40px;
}
.noData {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: grey;
}
.close-icon {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    z-index: 5;
}
.outer-wrapper {
  background-color: white;
  width: 100%;
  box-shadow: 0px 0px 25px -10px;
  padding: 50px 20px;
  box-sizing: border-box;
  margin-bottom: 50px;
}
.chart {
  height: auto;
  // width: 100%;
  // padding: 0 20px;
}
.hello {
  font-size: 12px;
  width: 100%;
  padding-bottom: 20%;
  box-sizing: border-box;
}
.tablewrapper {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.el-table /deep/ .cell {
  line-height: 12px;
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
</style>