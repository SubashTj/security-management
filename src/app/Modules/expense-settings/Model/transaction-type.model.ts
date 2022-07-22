export class TransactionType {
    public type: string;
    public id: string = "";
    public activeStatus: string = "";
    responseModel: TransactionType[];
    customerId: any;
    districtId: string;
    offset: number;
    limit: number;
    pageSize?: number;
    page?: number;
    count?: number
}
