export class Invoice {
    public bankGstNo: string;
    public cgst: string = "";
    public epf: string = "";
    public esi: string = "";
    public mode: string = "";
    public referenceNo: string = "";
    public sgct: string = "";
    public expenseId: string = "";
    public activeStatus: string = "";
    responseModel: Invoice[];
    qualificationId: any;
    customerId: any;
    districtId: string;
    offset: number;
    limit: number;
    pageSize?: number;
    page?: number;
    count?: number
}
