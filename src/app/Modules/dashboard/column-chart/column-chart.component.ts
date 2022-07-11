import { any } from "@amcharts/amcharts4/.internal/core/utils/Array";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { DashboardService } from "../service/dashboard.service";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  data: any;
  employee = [];
  present = [];
  absent = [];


  constructor(private apiService: DashboardService) {
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "distibuted",
    //       data: [21, 22, 10, 28, 16, 21, 13, 30]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar",
    //     events: {
    //       click: function (chart, w, e) {
    //         // console.log(chart, w, e)
    //       }
    //     }
    //   },
    //   colors: [
    //     "#008FFB",
    //     "#00E396",
    //     "#FEB019",
    //     "#FF4560",
    //     "#775DD0",
    //     "#546E7A",
    //     "#26a69a",
    //     "#D10CE8"
    //   ],
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "45%",
    //       distributed: true
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   legend: {
    //     show: false
    //   },
    //   grid: {
    //     show: false
    //   },
    //   xaxis: {
    //     categories: [
    //       ["Security"],
    //       ["Gun Man"],
    //       ["Assistent"],
    //       ["OfficeBoy"],
    //       ["Drivier"],
    //     ],
    //     labels: {
    //       style: {
    //         colors: [
    //           "#008FFB",
    //           "#00E396",
    //           "#FEB019",
    //           "#FF4560",
    //           "#775DD0",
    //           "#546E7A",
    //           "#26a69a",
    //           "#D10CE8"
    //         ],
    //         fontSize: "12px"
    //       }
    //     }
    //   }
    // };
  }

  ngOnInit(): void {
    this.getDepartmentWise();

  }
  getDepartmentWise() {
    this.apiService.getAttendanceList().subscribe((res) => {
      this.data = res.responseModel
      console.log(this.data);
      this.employee = [];
      this.present = []
      this.absent = []
      this.data.forEach(element => {
        this.present.push(element.presentAverage)
        this.absent.push(element.absentEmployee)
        if (element.departmentNames != null) {
          var data = [];
          data.push(element.departmentNames);
          this.employee.push(data);
        }
      });
      this.chartOptions = {
        series: [
          {
            name: "Present",
            data: this.present
          },
          {
            name: "Absent",
            data: this.absent
          }
        ],
        chart: {
          height: 320,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#546E7A",
          "#26a69a",
          "#D10CE8"
        ],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        },
        xaxis: {
          categories: this.employee,
          labels: {
            style: {
              colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8"
              ],
              fontSize: "12px"
            }
          }
        }
      };
    })
  }
}
