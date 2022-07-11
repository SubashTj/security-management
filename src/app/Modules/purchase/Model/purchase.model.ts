export class Purchase {
  receiptDate: string;
  receiptNumber: string
  vendorId: string
  totalAmount: string
  paidAmount: string
  balanceAmount: string
  stockItemCode: string
  unitTypeId: string
  quantity: string
  baseRate: string
  baseAmount: string
  discountPercentage: string
  discountAmount: string
  discountedAmount: string
  taxPercentage: string
  taxAmount: string
  netAmount: string
  purchaseItemDescription: string
  paymentDate: string
  paymentMode: string
  referenceNumber: string
  purchaseId:number
  activeStatus: string
  statusCode: any
  amount: string
  customerId: string;
  districtId: string;
  pageSize?: number;
  page?: number;
  count?: number
  responseModel: Purchase[];
  purchaseItemDetails: [
    {
      baseAmount: "string",
      baseRate: "string",
      branchId: "string",
      customerId: "string",
      discountAmount: "string",
      discountPercentage: "string",
      discountedAmount: "string",
      netAmount: "string",
      purchaseId: "string",
      purchaseItemDescription: "string",
      quantity: "string",
      stockItemCode: "string",
      taxAmount: "string",
      taxPercentage: "string",
      unitTypeId: "string"
    }
  ]
  purchasePaymentDetails: [{
    amount: "string",
    paymentMode: "string",
    referenceNumber: "string"
    receiptDate: "string",
    receiptNumber: "string",
    totalAmount: "string",
    vendorId: "string"
    paymentDate: "string"
  }
  ]
}
