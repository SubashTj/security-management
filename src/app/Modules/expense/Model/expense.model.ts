export class Expense {
    public accountHolderName: string;
    public accountNo: string = "";
    public branch: string = "";
    public accountType: string = "";
    public ifscCode: string = "";
    public accountFor: string = "";
    public expenseId: string = "";
    public activeStatus: string = "";
    responseModel: Expense[];
    qualificationId: any;
    customerId: any;
    districtId: string;
    offset: number;
    limit: number;
    pageSize?: number;
    page?: number;
    count?: number
}
