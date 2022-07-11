export class Vendors {
    vendorId: string;
      vendorName:string
      vendorGst:string
      vendorContactNumber:string
      vendorEmail:string
      vendorAddress:string
      bankName:string;
      bankBranchName:string;
      accountHolderName:string;
      accountNumber:string;
      branchIfscCode:string;
      accountId:string;
      activeStatus:string;
      branchAddress:string
    responseModel: Vendors[];
    vendorAccountDetailDao: any;
    customerId: string;
    districtId: string;
    pageSize?: number;
    page?: number;
    count?: number
    statusMessage: string;
    }
    