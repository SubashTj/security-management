import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/core/service/congif.service';
import { QuotationService } from '../service/quotation.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns';
import { Department } from '../../department/Department-Model/department.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  departmentName: string;
  designation: string;
  noOfEmployees: number;
  unitsPerDay: number;
  workingDuration: number;
  amount: number;
}
class Invoice {
  qutationName: string;
  clientName: string;
  address: string;
  contactNo: number;
  email: string;

  products: Product[] = [];
  additionalDetails: string;

  constructor() {
    // Initially one empty product row we will show 
    this.products.push(new Product());
  }
}
interface unit {
  unitTypeId: string;
  unitTypeName: string;
}
@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.scss']
})
export class QuotationCreateComponent implements OnInit {
  qutationArray = {};
  qutationArrayModel = [];
  invoice = new Invoice();
  ids: string;
  amount: number;
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


  async generatePDF(action = 'open', quotationForm) {
    let docDefinition = {
      content: [
        {
          image: await this.getBase64ImageFromURL("../../assets/images/PHS QT ORG FILE.png"),
          fit: [400, 300],
          alignment: 'left'
        },
        {
          text: 'Client Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.quotationForm.value.clientName,
                bold: true
              },
              { text: this.quotationForm.value.address },
              { text: this.quotationForm.value.email },
              { text: this.quotationForm.value.contactNo }
            ],
            [
              {
                text: `Date: ${new Date()}`,
                alignment: 'right'
              },
              {
                text: `Quotation No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Employee Details',
          style: 'sectionHeader'
        },
        {
          table: {

            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Designation', 'No of Employee', 'Unit(PerDay)', 'Working Duration', 'amount'],
              ...this.quotationForm.value.items.map(p => ([p.designation, p.noOfEmployees, p.unitsPerDay, p.workingDuration, (p.workingDuration * p.unitsPerDay).toFixed(2)])),
              [{ text: 'Total Amount', colSpan: 3 }, {}, {}, {}, this.quotationForm.value.items.reduce((sum, p) => sum + (p.workingDuration * p.unitsPerDay), 0).toFixed(2)]
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          text: this.quotationForm.value.additionalDetails,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
      this.quotationForm.value.items.forEach(element => {
        this.qutationArray = {
          amount: element.amount,
          departmentName: element.departmentName,
          designationName: element.designation,
          noOfEmployees: element.noOfEmployees,
          unitsPerDay: element.unitsPerDay,
          workingDuration: element.workingDuration
        }
      })
      this.qutationArrayModel.push(this.qutationArray)
      quotationForm.quotationDate = format(new Date(), "yyyy-MM-dd")
      quotationForm.qutationArrayModel = this.qutationArrayModel
      this.getService.create(quotationForm).subscribe((res: any) => {
      })
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
      this.getService.create(quotationForm).subscribe((res: any) => {
      })
    } else {
      pdfMake.createPdf(docDefinition).open();
      this.getService.create(quotationForm).subscribe((res: any) => {
      })
    }
  }
  // calculateValues() {
  //   this.quotationForm.value.items.map(p => {
  //     this.quotationForm.get('items').patchValue([
  //       { amount: (p.workingDuration * p.unitsPerDay) }
  //     ]);
  //   })
  // }
  purchaseItem: {};
  purchasePayment: {};
  purchasePaymentDetails = [];
  purchaseItemDetails = [];
  quotationForm: FormGroup;
  arr: FormArray;
  customerId: any;
  tableone: string[];
  departments: any;
  designation: any;
  selectedvalue: any;
  constructor(private getService: QuotationService, private config: ConfigService, private modelService: QuotationService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;

    this.tableone = ["designation", "noOfEmployees", "Disc%", "Discamt", "Amt-disc", "Tax%", "Taxamt", "Net-amt", "Description", "Delete", "Add"];
  }


  ngOnInit() {
    this.quotationForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItemFormGroup()]),
      clientName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      address: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      quotationName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      contactNo: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    });
    this.getDep()
  }

  getDep() {
    var obj = {
      'customerId': this.customerId,
    }
    this.modelService.getPosition(obj).subscribe((data) => {
      this.designation = data.responseModel;
      console.log(data)
    })
  }


  public addItemFormGroup() {
    const items = this.quotationForm.get('items') as FormArray
    items.push(this.createItemFormGroup())
  }
  public removeOrClearItem(i: number) {
    const items = this.quotationForm.get('items') as FormArray
    if (items.length > 1) {
      items.removeAt(i)
    } else {
      items.reset()
    }
  }
  private createItemFormGroup(): FormGroup {
    return new FormGroup({
      'departmentName': new FormControl(''),
      'designation': new FormControl(''),
      'noOfEmployees': new FormControl(''),
      'amount': new FormControl(''),
      'unitsPerDay': new FormControl(''),
      'workingDuration': new FormControl('')
    })
  }
}
