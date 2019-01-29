<template>
  <div id="AgeChart">
    <h2>Pyramide des âges</h2>
        <el-row class="outer-wrapper">
            <el-col :span="24">
              <div class="tablewrapper">
                <el-table size="small" show-summary :data="formatTable1" style="max-width: 600px;">
                    <el-table-column :label="cotFormating1">
                        <el-table-column prop="age" label="Tranches d'âge" ><template scope="scope" ><div class="data-wrapper">{{scope.row.age}}</div></template></el-table-column>
                        <el-table-column prop="femme" label="Femmes" ><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.femme}}</div></template></el-table-column>
                        <el-table-column prop="homme" label="Hommes"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.homme}}</div></template></el-table-column>
                    </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="24" class="chart">
                <div class="hello" id="chartdiv3"></div>
            </el-col>
        </el-row>
        <el-row class="outer-wrapper">
            <el-col :span="24">
              <div class="tablewrapper">
                <el-table size="small" show-summary :data="formatTable2" style="max-width: 600px;">
                    <el-table-column :label="cotFormating2">
                        <el-table-column prop="age" label="Tranches d'âge" ><template scope="scope" ><div class="data-wrapper">{{scope.row.age}}</div></template></el-table-column>
                        <el-table-column prop="femme" label="Femmes" ><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.femme}}</div></template></el-table-column>
                        <el-table-column prop="homme" label="Hommes"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.homme}}</div></template></el-table-column>
                    </el-table-column>
                </el-table>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="hello" id="chartdiv4"></div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";


export default {
  name: 'AgeChart',
  data () {
    return {
      selection: [],
      tableLy: [],
      tableTy: [],
      listAssure: [],
      table: [],
    }
  },
  computed: {
    formatTable1 () {
      var newTable = [];
      this.tableTy.forEach( e => {
        e.femme = e.femme * -1
        newTable.push(e)
      })
      return newTable
    },
    formatTable2 () {
      var newTable = [];
      this.tableLy.forEach( e => {
        e.femme = e.femme * -1
        newTable.push(e)
      })
      return newTable
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
    multipleSelection () {
        // var data = this.$store.state.selection
        // console.log(data, 'selection data')
        this.filterContracts(this.selection);
    }
  },
  // watch: {
  //     multipleSelection (state) {
  //       this.selection = state
  //       this.filterContracts(state);
  //       // console.log(state, 'state')
  //     }
  // },
  methods: {
    sortData (data) {
      this.tableLy = []
      var tableLy = []
      this.tableTy = []
      var tableTy = []
      _.each(this.$store.state.translation.age, function (value, key) {

        var variableLy = { 'age': value, 'homme': 0, 'femme': 0, 'total': 0 }
        var variableTy = { 'age': value, 'homme': 0, 'femme': 0, 'total': 0 }

        _.find(data, function(item){
          if (item.ly.a !== "0.00" && item.ly.a !== null) {
            if ( key === item.a && item.x === "1") {
              variableLy.homme = variableLy.homme + 1
              variableLy.total = variableLy.total + 1
            }
            if ( key === item.a && item.x === "2") {
              variableLy.femme = variableLy.femme - 1
              variableLy.total = variableLy.total + 1
            }
          }
          if (item.ty.a !== "0.00" && item.ty.a !== null) {
            if ( key === item.a && item.x === "1") {
              variableTy.homme = variableTy.homme + 1
              variableTy.total = variableTy.total + 1
            }
            if ( key === item.a && item.x === "2") {
              variableTy.femme = variableTy.femme - 1
              variableTy.total = variableTy.total + 1
            }
          }
        })
        if (variableTy.homme !== 0 || variableTy.femme !== 0 ) {
          variableTy.Thomme = (variableTy.homme/variableTy.total)*100
          variableTy.Tfemme = (variableTy.femme/variableTy.total)*100
          tableTy.push(variableTy)
        }
        if (variableLy.homme !== 0 || variableLy.femme !== 0 ) {
          variableLy.Thomme = (variableLy.homme/variableLy.total)*100
          variableLy.Tfemme = (variableLy.femme/variableLy.total)*100
          tableLy.push(variableLy)
        }
      });
      this.tableLy = tableLy
      this.tableTy = tableTy
      this.createChart2();
      this.createChart1();
    },
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
    LOG () {
      console.log(this.listAssure, 'hello')
    },
    createChart1 () {
      // Create chart instance
      var chart = am4core.create("chartdiv3", am4charts.XYChart);

      if (this.tableTy.length === 0) {
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
      this.tableTy.forEach(e => {
        chart.data.push(e)
      })

      // Use only absolute numbers
      chart.numberFormatter.numberFormat = "#.#s";
      chart.exporting.menu = new am4core.ExportMenu();
      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "age";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.minGridDistance = 10;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.extraMin = 0.1;
      valueAxis.extraMax = 0.1;
      valueAxis.renderer.minGridDistance = 10;
      valueAxis.renderer.baseGrid.strokeOpacity = 0.8;
      valueAxis.renderer.ticks.template.length = 5;
      valueAxis.renderer.ticks.template.disabled = false;
      valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
      valueAxis.renderer.labels.template.adapter.add("text", function(text) {
        return text == "Femme" || text == "Homme" ? text : text + "";
      })

      // Create series
      var male = chart.series.push(new am4charts.ColumnSeries());
      male.dataFields.valueX = "Tfemme";
      male.dataFields.categoryY = "age";
      male.clustered = false;
      male.columns.template.height = am4core.percent(95);
      male.columns.template.tooltipText = "{age}: {femme}";

      var maleLabel = male.bullets.push(new am4charts.LabelBullet());
      maleLabel.label.text = "{valueX}%";
      maleLabel.label.hideOversized = false;
      maleLabel.label.truncate = false;
      maleLabel.label.horizontalCenter = "right";
      maleLabel.label.dx = -10;

      var female = chart.series.push(new am4charts.ColumnSeries());
      female.dataFields.valueX = "Thomme";
      female.dataFields.categoryY = "age";
      female.clustered = false;
      female.columns.template.height = am4core.percent(95);
      female.columns.template.tooltipText = "Tranches d'âge {age}: {homme}";

      var femaleLabel = female.bullets.push(new am4charts.LabelBullet());
      femaleLabel.label.text = "{valueX}%";
      femaleLabel.label.hideOversized = false;
      femaleLabel.label.truncate = false;
      femaleLabel.label.horizontalCenter = "left";
      femaleLabel.label.dx = 10;

      var maleLabel = valueAxis.axisRanges.create();
      maleLabel.value = -40;
      maleLabel.endValue = 0;
      maleLabel.label.text = "Femme";
      maleLabel.label.fill = chart.colors.list[0];
      maleLabel.label.dy = 20;
      maleLabel.label.fontWeight = 600;

      var femaleLabel = valueAxis.axisRanges.create();
      femaleLabel.value = 40;
      femaleLabel.endValue = 0;
      femaleLabel.label.text = "Homme";
      femaleLabel.label.fill = chart.colors.list[1];
      femaleLabel.label.dy = 20;
      femaleLabel.label.fontWeight = 600;

      var title = chart.titles.create();
      title.text = new Date().getFullYear();
      title.fontSize = 20;
      title.marginBottom = 10;

      // var cellSize = 30;
      // chart.events.on("datavalidated", function(ev) {

      //     // Get objects of interest
      //     var chart = ev.target;
      //     var categoryAxis = chart.yAxes.getIndex(0);

      //     // Calculate how we need to adjust chart height
      //     var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

      //     // get current chart height
      //     var targetHeight = chart.pixelHeight + adjustHeight;

      //     // Set it on chart's container
      //     chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      // });

      }
    },
    createChart2 () {
      // Create chart instance
      var chart = am4core.create("chartdiv4", am4charts.XYChart);


      if (this.tableLy.length === 0) {
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
      this.tableLy.forEach(e => {
        chart.data.push(e)
      })



            // Use only absolute numbers
      chart.numberFormatter.numberFormat = "#.#s";
      chart.exporting.menu = new am4core.ExportMenu();
      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "age";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.minGridDistance = 10;
      
      // var cellSize = 30;
      // chart.events.on("datavalidated", function(ev) {

      //   // Get objects of interest
      //   var chart = ev.target;
      //   var categoryAxis = chart.yAxes.getIndex(0);

      //   // Calculate how we need to adjust chart height
      //   var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

      //   // get current chart height
      //   var targetHeight = chart.pixelHeight + adjustHeight;

      //   // Set it on chart's container
      //   chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      // });


      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.extraMin = 0.1;
      valueAxis.extraMax = 0.1;
      valueAxis.renderer.minGridDistance = 10;
      valueAxis.renderer.baseGrid.strokeOpacity = 0.8;
      valueAxis.renderer.ticks.template.length = 5;
      valueAxis.renderer.ticks.template.disabled = false;
      valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
      valueAxis.renderer.labels.template.adapter.add("text", function(text) {
        return text == "Femme" || text == "Homme" ? text : text + "";
      })


      // Create series
      var male = chart.series.push(new am4charts.ColumnSeries());
      male.dataFields.valueX = "Tfemme";
      male.dataFields.categoryY = "age";
      male.clustered = false;
      male.columns.template.height = am4core.percent(95);
      male.columns.template.tooltipText = "{age}: {femme}";

      var maleLabel = male.bullets.push(new am4charts.LabelBullet());
      maleLabel.label.text = "{valueX}%";
      maleLabel.label.hideOversized = false;
      maleLabel.label.truncate = false;
      maleLabel.label.horizontalCenter = "right";
      maleLabel.label.dx = -20;

      var female = chart.series.push(new am4charts.ColumnSeries());
      female.dataFields.valueX = "Thomme";
      female.dataFields.categoryY = "age";
      female.clustered = false;
      female.columns.template.height = am4core.percent(95);
      female.columns.template.tooltipText = "Tranches d'âge {age}: {homme}";

      var femaleLabel = female.bullets.push(new am4charts.LabelBullet());
      femaleLabel.label.text = "{valueX}%";
      femaleLabel.label.hideOversized = false;
      femaleLabel.label.truncate = false;
      femaleLabel.label.horizontalCenter = "left";
      femaleLabel.label.dx = 20;

      var maleLabel = valueAxis.axisRanges.create();
      maleLabel.value = -40;
      maleLabel.endValue = 0;
      maleLabel.label.text = "Femme";
      maleLabel.label.fill = chart.colors.list[0];
      maleLabel.label.dy = 20;
      maleLabel.label.fontWeight = 600;

      var femaleLabel = valueAxis.axisRanges.create();
      femaleLabel.value = 40;
      femaleLabel.endValue = 0;
      femaleLabel.label.text = "Homme";
      femaleLabel.label.fill = chart.colors.list[1];
      femaleLabel.label.dy = 20;
      femaleLabel.label.fontWeight = 600;

      var title = chart.titles.create();
      title.text = new Date().getFullYear()-1;
      title.fontSize = 20;
      title.marginBottom = 10;
       }
    }

  },
  created () {
    this.selection = this.$store.state.selection
  },
  mounted () {
    this.filterContracts(this.$store.state.selection);
    this.createChart2();
    this.createChart1();
  }
}
</script>

<style lang="scss" scoped>
#AgeChart {
  padding: 20px 20px 50px 20px;
  background-color: white;
  box-sizing: border-box;
}
.hello {
  font-size: 12px;
  width: 100%;
  position: relative;
  padding-bottom: 20%;
  box-sizing: border-box;
}
h2 {
  text-align: center;
}
.outer-wrapper {
  padding-top: 60px;
}
.el-table-column {
  height: 10px;
  padding: 0;
}
td {
  padding: 0;
}
.tablewrapper {
  display: flex;
  justify-content: center;
}

</style>


