export class Account {
    public accountHolderName: string;
    public accountNo: string = "";
    public branch: string = "";
    public accountType: string = "";
    public ifscCode: string = "";
    public accountFor: string = "";
    public accountId: string = "";
    public activeStatus: string = "";
    responseModel: Account[];
    qualificationId: any;
    customerId: any;
    districtId: string;
    offset: number;
    limit: number;
    pageSize?: number;
    page?: number;
    count?: number
}
