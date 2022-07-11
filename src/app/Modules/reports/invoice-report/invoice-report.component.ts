import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getYears } from 'src/app/core/helpers/global.helper';
import { ApiService } from 'src/app/core/service/api.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Department } from '../../department/Department-Model/department.model';
import { Positions } from '../../job-position/Model/positions.model';
import { ReportService } from '../service/report.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  name: string;
  price: number;
  qty: number;
}
export interface Month {
  value: string;
  viewValue: string;
}
class Invoice {
  amount: string;
  amountInWords: 0;
  amountsInwords: string;
  branchName: string;
  cgst: string;
  designation: string;
  districtName: string;
  epf: string;
  esi: string;
  grossTotal: string;
  invoiceDate: string;
  invoiceNumbers: string;
  mode: string;
  netTotal: string;
  noOfStaffs: string;
  presentCount: string;
  referenceNumbers: string;
  sgst: string;
  unitPricePerDay: string
  additionalDetails: string;
  constructor() {

  }
}
@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.scss']
})
export class InvoiceReportComponent implements OnInit {
  invoicedata = new Invoice();

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


  customerId: string;
  branchIds: string;
  branchs: any;
  clients: any;
  branch: any;
  years: any[] = getYears();
  months: Month[] = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },

  ];
  basicForm: FormGroup;
  departments: Department[];
  designation: Positions[];
  public response = '';
  pdfName: any;

  constructor(private config: ConfigService, private modelService: ReportService, private getService: ApiService) {
    this.config.init();
    this.customerId = config.customerId;
    this.branchIds = config.districtId;
  }

  form() {
    this.basicForm = new FormGroup({
      type: new FormControl(''),
      districtId: new FormControl(''),
      branchId: new FormControl(''),
      employeeId: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      departmentId: new FormControl(''),
      designationId: new FormControl(''),
    })

  }
  ngOnInit(): void {
    this.form();
    this.getBranch();
    this.getemployee();
    this.getDep();
  }

  async generatePDF(action = 'download') {
    var form = this.basicForm.value;
    var obj = {
      'customerId': this.customerId,
      'districtId': form?.districtId,
      'branchId': form?.branchId,
      'departmentId': form?.departmentId,
      'designationId': form?.designationId,
      'month': form?.month,
      'year': form?.year
    }
    this.modelService.downloadMonthly(obj).subscribe((data) => {
      this.invoicedata = data.responseModel
    })
    let docDefinition = {
      content: [
        {

          image: await this.getBase64ImageFromURL("../../assets/images/HeaderFinal.png"),
          alignment: 'center',
        },
        {
          text: 'Bill To',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: 'The Managing Director',
                bold: true
              },
              { text: this.invoicedata.branchName },
              { text: this.invoicedata.districtName },
            ],
            [
              {
                text: `Bill Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            Headers: 2,
            widths: [248, 248],
            heights: [20, 20],
            body: [
              [`Invoice Date   :${this.invoicedata.invoiceDate}`, `Ref No  :${this.invoicedata.referenceNumbers}`],
              [`Invoice Number :${this.invoicedata.invoiceNumbers}`, `Mode :${this.invoicedata.mode}`]
            ]
          },
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Designation', 'No.Of Staffs', 'Unit Price(Perday)', 'Unit', 'Amount(Rs)'],
              ([this.invoicedata.designation, this.invoicedata.noOfStaffs, this.invoicedata.unitPricePerDay, this.invoicedata.presentCount, this.invoicedata.grossTotal]),
              [{ text: 'GROSS Total', colSpan: 4 }, {}, {}, {}, this.invoicedata.grossTotal],
              [{ text: 'GST 9%', colSpan: 4 }, {}, {}, {}, this.invoicedata.cgst],
              [{ text: 'GST 9%', colSpan: 4 }, {}, {}, {}, this.invoicedata.sgst],
              [{ text: 'EPF 12%', colSpan: 4 }, {}, {}, {}, this.invoicedata.epf],
              [{ text: 'ESI 3.25%', colSpan: 4 }, {}, {}, {}, this.invoicedata.esi],
              [{ text: 'Total Amount', colSpan: 4 }, {}, {}, {}, this.invoicedata.netTotal],
            ],

          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: [504],
            body: [[`Amount In Words :${this.invoicedata.amountsInwords}`]]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          columns: [
            [{ text: 'Paramount Hospitality Service', alignment: 'right', italics: true }],
          ]
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },

        defaultStyle: {
          font: 'Helvetica-Bold'
        }
      }

    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
    pdfMake.createPdf(docDefinition).getDataUrl(function (dataUrl) {
      this.response = dataUrl;

    });
  }

  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.modelService.getbranch(obj).subscribe((data) => {
      this.branchs = data.responseModel;
      console.log(data)
    })
  }
  onItemsSelect(event: any) {
    var obj = {
      'customerId': this.customerId,
      'districtId': event.value
    }
    this.modelService.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
      console.log(data)
    })
  }
  getemployee() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.branchIds,
    }
    this.modelService.getemployee(obj).subscribe((data) => {
      this.branch = data.responseModel;
      console.log(data)
    })
  }
  getDep() {
    var obj = {
      'customerId': this.customerId
    }
    this.modelService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel
      console.log(data)
    })
  }
  onItemSelect(event: any) {
    var obj = {
      'departmentId': event.value,
      'customerId': this.customerId
    }
    this.modelService.getPosition(obj).subscribe((data) => {
      this.designation = data.responseModel;
      console.log(data)
    })
  }
  getInvoicce() {
    var form = this.basicForm.value;
    var obj = {
      'customerId': this.customerId,
      'districtId': form?.districtId,
      'branchId': form?.branchId,
      'departmentId': form?.departmentId,
      'designationId': form?.designationId,
      'month': form?.month,
      'year': form?.year
    }
    this.modelService.downloadMonthly(obj).subscribe((data) => {
      this.invoicedata = data.responseModel
      // switch (data.type) {
      //   case HttpEventType.DownloadProgress:
      //     break;
      //   case HttpEventType.Response:
      //     const downloadedFile = new Blob([data.body], {
      //       type: data.body.type,
      //     });
      //     const a = document.createElement("a");
      //     a.setAttribute("style", "display:none;");
      //     document.body.appendChild(a);
      //     a.download =
      //       this.pdfName ??
      //       "Employee" + " - " + "Salary - Report";
      //     a.href = URL.createObjectURL(downloadedFile);
      //     this.response = a.href;
      //     // a.target = "_blank";
      //     // a.click();
      //     // document.body.removeChild(a);

      //     break;
      // }
    })
  }
  downloadInvoice() {
    var form = this.basicForm.value;
    var obj = {
      'customerId': this.customerId,
      'districtId': form?.districtId,
      'branchId': form?.branchId,
      'departmentId': form?.departmentId,
      'designationId': form?.designationId,
      'month': form?.month,
      'year': form?.year
    }
    this.getService.downloadMonthly(`invoice/get-invoice-report/pdf`, obj).subscribe((data) => {
      switch (data.type) {
        case HttpEventType.DownloadProgress:
          break;
        case HttpEventType.Response:
          const downloadedFile = new Blob([data.body], {
            type: data.body.type,
          });
          const a = document.createElement("a");
          a.setAttribute("style", "display:none;");
          document.body.appendChild(a);
          a.download =
            this.pdfName ??
            "Invoice - Report";
          a.href = URL.createObjectURL(downloadedFile);

          a.target = "_blank";
          a.click();
          document.body.removeChild(a);

          break;
      }
    })

  }
}
