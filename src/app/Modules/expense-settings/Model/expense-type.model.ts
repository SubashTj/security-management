export class ExpenseType {
    public expenseTypeId: string;
    public expenseName: string = "";
    public activeStatus: string = "";
    responseModel: ExpenseType[];
    customerId: any;
    districtId: string;
    offset: number;
    limit: number;
    pageSize?: number;
    page?: number;
    count?: number
}
