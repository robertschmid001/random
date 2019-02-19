<template>
  <div id="PrestationsChart">
            <el-row class="outer-wrapper">
            <el-col :span="24">
                <div class="asia">
                    <el-table size="small" :data="tableData6" style="max-width: 800px;">
                        <el-table-column>
                            <el-table-column prop="cat" ><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.a}}</div></template></el-table-column>
                            <el-table-column prop="Ass" label="Art Dentaire" width="100"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.t1}}</div></template></el-table-column>
                            <el-table-column prop="Con" label="Hospitalisation" width="110"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.t2}}</div></template></el-table-column>
                            <el-table-column prop="Ass" label="Optique" width="80"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.t3}}</div></template></el-table-column>
                            <el-table-column prop="Con" label="Pharmacie" width="90"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.t4}}</div></template></el-table-column>
                            <el-table-column prop="Ass" label="Consultations/Visites" width="150"><template scope="scope" ><div class="data-wrapper md-txt ">{{scope.row.t5}}</div></template></el-table-column>
                            <el-table-column prop="Con" label="Soins courants" width="120"><template scope="scope" ><div class="data-wrapper md-txt">{{scope.row.t6}}</div></template></el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="24" class="chart">
                <div class="hello" id="chartdiv"></div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
// import AssTable from './Portefeuille/tables/AssTable.vue'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: 'PrestationsChart',
  data () {
    return {
        tableData6: [
            {
                a:'2017',
                t1: '44 263.90',
                t2: '20 180.37.90',
                t3: '48 969.48',
                t4: '21 298.07',
                t5: '20 254.44',
                t6: '39 588.82',
            },
            {
                a:'2018',
                t1: '88 527.80',
                t2: '80 721.48',
                t3: '97 938.96',
                t4: '53 245.18',
                t5: '121 526.64',
                t6: '79 177.64',
            }
        ]
    }
  },
  props: {
  },
  methods: {
    createChart () {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.legend = new am4charts.Legend();


        chart.data = [
        {
            country: "Art Dentaire",
            n: 44263.90,
            z: 88527.80
        },
        {
            country: "Hospitalisation",
            n: 20180.37,
            z: 80721.48
        },
        {
            country: "Optique",
            n: 48969.48,
            z: 97938.96
        },
        {
            country: "Pharmacie",
            n: 21298.07,
            z: 53245.18
        },
        {
            country: "Consultations/Visites",
            n: 20254.44,
            z: 121526.64
        },
        {
            country: "Soins courants",
            n: 39588.82,
            z: 79177.64
        },
        //   {
        //     country: "UK",
        //     visits: 1122
        //   },
        //   {
        //     country: "France",
        //     visits: 1114
        //   },
        //   {
        //     country: "India",
        //     visits: 984
        //   },
        //   {
        //     country: "Spain",
        //     visits: 711
        //   }
        ];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.dataFields.category = "country";
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
        // valueAxis.min = 0;
        // valueAxis.max = 24000;
        // valueAxis.strictMinMax = true;
        // valueAxis.renderer.minGridDistance = 30;
        // axis break

        /*
        // this is exactly the same, but with events
        axisBreak.events.on("over", () => {
        axisBreak.animate(
            [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
            1500,
            am4core.ease.sinOut
        );
        });
        axisBreak.events.on("out", () => {
        axisBreak.animate(
            [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
            1000,
            am4core.ease.quadOut
        );
        });*/

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "n";
        series.columns.template.tooltipText = "{valueY.value}";
        series.columns.template.tooltipY = 0;
        series.columns.template.strokeOpacity = 0;
        series.name = "2018";
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        // series.columns.template.adapter.add("fill", (fill, target) => {
        //   return chart.colors.getIndex(target.dataItem.index);
        // });

        var series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.categoryX = "country";
        series2.dataFields.valueY = "z";
        series2.columns.template.tooltipText = "{name}: {valueY.value}";
        series2.columns.template.tooltipY = 0;
        series2.columns.template.strokeOpacity = 0;
        series2.name = "2017";
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        // series2.columns.template.adapter.add("fill", (fill, target) => {
        //   return chart.colors.getIndex(target.dataItem.index);
        // });
        // var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
        // bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
        // bullet2.locationY = 0.5;
        // bullet2.label.fill = am4core.color("#ffffff");
        }
  },
  mounted () {
    this.createChart();
  }
}
</script>

<style lang="scss" scoped>
#PrestationsChart {
    padding-top: 30px;
}
.hello {
  font-size: 12px;
  width: 100%;
  position: relative;
  padding-bottom: 20%;
  box-sizing: border-box;
}
.asia {
    display: flex;
    justify-content: center;
}
</style>