import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/core/service/congif.service';
import { PuchaseService } from '../service/puchase.service';
import Swal from 'sweetalert2';
import { Vendors } from '../../vendors/Model/vendor.model';
interface Animal {
  stockItemCode: string;
  stockItemName: string;
}
interface Payment {
  paymentMode: string;
  viewValue: string
}
interface vendor {
  vendorId: string;
  vendorName: string;
}
interface unit {
  unitTypeId: string;
  unitTypeName: string;
}
@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.scss']
})
export class PurchaseCreateComponent implements OnInit {
  purchaseItem: {};
  purchasePayment: {};
  purchasePaymentDetails = [];
  purchaseItemDetails = [];
  purchaseForm: FormGroup;
  arr: FormArray;
  customerId: any;
  tableone: string[];
  tabletwo: string[];
  unit: any;
  vendor: any;
  vendorone: any;
  selectedvalue: any;
  constructor(private getService: PuchaseService, private config: ConfigService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;

    this.tableone = ["Itemcode", "Unit", "Quantity", "Baserate", "Baseamt", "Disc%", "Discamt", "Amt-disc", "Tax%", "Taxamt", "Net-amt", "Description", "Delete", "Add"];
    this.tabletwo = ["Payment Date", "Payment Mode", "Ref No", "Amount", "Delete", "Add"];
  }


  ngOnInit() {
    this.purchaseForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItemFormGroup()]),
      payment: this.formBuilder.array([this.createPaymentFormGroup()]),
      'vendorId': new FormControl(''),
      'totalAmount': new FormControl(''),
      'paidAmount': new FormControl(''),
      'balanceAmount': new FormControl(''),
      'receiptNumber': new FormControl(''),
      'receiptDate': new FormControl(''),
    });
    this.getVendor();
    this.getUnit();
  }

  public addItemFormGroup() {
    const items = this.purchaseForm.get('items') as FormArray
    items.push(this.createItemFormGroup())
  }

  public removeOrClearItem(i: number) {
    const items = this.purchaseForm.get('items') as FormArray
    if (items.length > 1) {
      items.removeAt(i)
    } else {
      items.reset()
    }
  }

  public addPaymentFormGroup() {
    const payment = this.purchaseForm.get('payment') as FormArray
    payment.push(this.createPaymentFormGroup())
  }

  public removeOrClearPayment(i: number) {
    const payment = this.purchaseForm.get('payment') as FormArray
    if (payment.length > 1) {
      payment.removeAt(i)
    } else {
      payment.reset()
    }
  }
  private createItemFormGroup(): FormGroup {
    return new FormGroup({
      'stockItemCode': new FormControl(''),
      'unitTypeId': new FormControl(''),
      'quantity': new FormControl(''),
      'baseRate': new FormControl(''),
      'baseAmount': new FormControl(''),
      'discountPercentage': new FormControl(''),
      'discountedAmount': new FormControl(''),
      'taxPercentage': new FormControl(''),
      'taxAmount': new FormControl(''),
      'netAmount': new FormControl(''),
      'purchaseItemDescription': new FormControl('')
    })
  }
  private createPaymentFormGroup(): FormGroup {
    return new FormGroup({
      'amount': new FormControl(''),
      'paymentDate': new FormControl(''),
      'paymentMode': new FormControl(''),
      'referenceNumber': new FormControl('')
    })
  }
  Changed() {
    this.purchaseForm.value.items.forEach(element => {
      ((this.purchaseForm.get('payment') as FormArray)).get('amount').patchValue(element.discountedAmount * (element.discountedAmount / element.taxPercentage));
    });
  }
  // this.purchaseForm.get('items').patchValue(element.discountedAmount * (element.discountedAmount/element.taxPercentage));
  save(post) {
    this.purchaseForm.value.items.forEach(element => {
      this.purchaseItem = {
        baseRate: element.baseRate,
        quantity: element.quantity,
        customerId: this.customerId,
        discountPercentage: element.discountPercentage,
        purchaseItemDescription: element.purchaseItemDescription,
        stockItemCode: element.stockItemCode,
        taxPercentage: element.taxPercentage,
        unitTypeId: element.unitTypeId
      }
    });
    this.purchaseItemDetails.push(this.purchaseItem)
    this.purchaseForm.value.payment.forEach(element => {
      this.purchasePayment = {
        customerId: this.customerId,
        amount: element.amount,
        paymentDate: element.paymentDate,
        paymentMode: element.paymentMode,
        referenceNumber: element.referenceNumber,
      }
    });
    this.purchasePaymentDetails.push(this.purchasePayment)
    post.purchaseItemDetails = this.purchaseItemDetails
    post.purchasePaymentDetails = this.purchasePaymentDetails
    post.customerId = this.customerId
    this.getService.create(post).subscribe((res: any) => {
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Purchase Details Created  Successfull",
          timer: 2500
        }).then(function () {
          // window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Purchase Details Create Failed",
          timer: 2500

        }).then(function () {
          // window.location.reload();
        });

      }


    });
  }
  select(event: any, type: Vendors) {
    this.selectedvalue = type.vendorId;
    var obj = {
      'customerId': this.customerId,
      'vendorId': this.selectedvalue
    }
    this.getService.getallVendor(obj).subscribe((data) => {
      this.vendorone = data.responseModel;

    })

  }
  getVendor() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getPurchaseVendor(obj).subscribe((data) => {
      this.vendor = data.responseModel;
    });
  }
  getUnit() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getPurchaseUnit(obj).subscribe((data) => {
      this.unit = data.responseModel;
    });
  }

}

