export class Payment {
    public paymentName: string = '';
    public paymentPendingId: string = '';
    public paymentAmount: string = '';
    public paymentFrom: string = '';
    public paymentTo: string = '';
    public paymentStartDate: string = '';
    public paymentEndDate: string = '';
    responseModel: Payment[];
    activeStatus: string;
    customerId: string;
    districtId: string;
    pageSize?: number;
    page?: number;
    count?: number
    statusMessage: string
}