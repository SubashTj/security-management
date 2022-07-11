import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";
import { DashboardService } from "../service/dashboard.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  data: any;
  date = [];
  presentEmployee = [];
  absentEmployee = []
  constructor(private apiService: DashboardService) {

  }
  ngOnInit(): void {
    this.getDailytWise()
  }
  getDailytWise() {
    this.apiService.getDailyAttendanceList().subscribe((res) => {
      this.data = res.responseModel
      this.date = [];
      this.absentEmployee = []
      this.presentEmployee = [];
      this.data.forEach(element => {
        this.date.push(element.attendanceDate)
        this.presentEmployee.push(element.presentEmployee)
        this.absentEmployee.push(element.absentEmployee)
      });
      this.chartOptions = {
        series: [
          {
            name: "Present",
            type: "column",
            data: this.presentEmployee
          },
          {
            name: "Absent",
            type: "line",
            data: this.absentEmployee
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: [0, 4]
        },
        title: {
          text: ""
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels: this.date,
        xaxis: {
          type: "datetime"
        },
        yaxis: [
          {
            title: {
              text: "Employee"
            }
          },
          {
            opposite: true,
            title: {
              text: "Employee"
            }
          }
        ]
      };
    })
  }
}