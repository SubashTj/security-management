export class Vendors {
    vendorId: string;
    vendorName: string
    vendorGst: string
    vendorContactNumber: string
    vendorEmail: string
    vendorAddress: string
    bankName: string;
    bankBranchName: string;
    accountHolderName: string;
    accountNumber: string;
    branchIfscCode: string;
    accountId: string;
    branchAddress: string
    responseModel: Vendors[];
    vendorAccountDetailDao: any;
    activeStatus: string;
    pageSize?: number;
    page?: number;
    count?: number
    statusCode: any;
}
