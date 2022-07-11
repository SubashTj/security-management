import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from "@angular/animations";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import {
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import {
  ApexAxisChartSeries, ApexChart, ChartComponent, ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexYAxis,
  ApexGrid,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexResponsive

} from "ng-apexcharts";
import { ThemeService } from 'src/app/core/service/theme.service';
import {
  format,
} from "date-fns";
import { DashboardService } from '../service/dashboard.service';
import { Calendar, CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { ConfigService } from 'src/app/core/service/congif.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: any;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid,
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];

};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger("fade", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 })),
      ]),
      transition("* => void", [
        style({ opacity: 1 }),
        animate("300ms", style({ opacity: 0 })),
      ]),
    ]),
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ],
})
export class DashboardComponent implements OnInit {
  employeelistCount: any = 0;

  DailyAttendanceChart: any;

  attenDate: any;
  date: any = []
  employeeDetails: any = [50];
  empPresentCount: any;
  yAsixCount: any;
  empDocCount: any;
  empNurCount: any;
  empLabCount: any;
  empOtherCount: any;
  allCount: any;
  trestedSec: any = 0;
  avgChat: any = [];
  totalAvg: any = [];

  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  calc: any;
  thisDate: string;
  Time: string
  data: any;
  datas: any;
  totalPresentCount: any;
  totalAbsentCount: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-06-27' },
      { title: 'event 2', date: '2020-06-30' }
    ]
  };
  customerId: any;
  employeecount: any;
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  constructor(private apiService: DashboardService, private themeService: ThemeService, private config: ConfigService) {
    this.customerId = config.customerId;
    this.thisDate = format(new Date(), "yyyy-MM-dd");
    this.Time = format(new Date(), " h:mm a")
    this.attenDate = format(new Date(), "MMM,yyyy");
  }
  ngOnInit(): void {
    this.date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    this.themeService.onThemeChange.subscribe((activeTheme) => {
      this.initDailyAttendanceChart(activeTheme);
    });
    this.initDailyAttendanceChart(this.themeService.activatedTheme);
    this.getDepartmentWise();
    this.getDepartmentWise();
    this.getData();
    this.getDatas();
  }
  Attendence() {
    this.themeService.onThemeChange.subscribe((activeTheme) => {
      this.initDailyAttendanceChart(activeTheme);
    });
    this.initDailyAttendanceChart(this.themeService.activatedTheme);

  }
  initDailyAttendanceChart(theme) {

  }


  formatSubtitleothers = (progress: number): string => {
    if (progress >= 0) {
      return "Present";
    }
  };

  formatSubtitledoctor = (progress: number): string => {
    if (progress >= 0) {
      return "Present";
    }
  };

  formatSubtitlenurse = (progress: number): string => {
    if (progress >= 0) {
      return "Present";
    }
  };
  formatSubtitleLab = (progress: number): string => {
    if (progress >= 0) {
      return "Present";
    }

  };

  getDepartmentWise(): void {
    this.apiService.getList().subscribe((res) => {
      this.data = res.responseModel
      this.data.forEach(element => {
        this.totalPresentCount = element.presentAverage
        this.totalAbsentCount = element.absentAverage
      });

      this.chartOptions = {
        series: [this.totalPresentCount, this.totalAbsentCount],
        chart: {
          type: "donut"
        },
        dataLabels: ["Present", "Absent"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })
  }
  getData() {
    let obj = {
      'customerId': this.customerId
    }
    this.apiService.getData(obj).subscribe((res) => {
      this.datas = res
    })
  }
  getDatas() {
    let obj = {
      'customerId': this.customerId
    }
    this.apiService.getDatas(obj).subscribe((res) => {
      this.employeecount = res
    })
  }
}
