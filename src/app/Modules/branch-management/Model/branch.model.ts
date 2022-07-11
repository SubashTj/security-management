
export class District {
    public districtId: string ='';
    public branchCode: string ='';
    public districtName : string ='';
    public address: string ='';
    public phoneNo: string ='';
    public emailId: string ='';
    public status: string ='';
  responseModel: District[];
  value: District;
  activeStatus: string;
  customerId: string;
  pageSize?: number;
  page?: number;
  count?:number
  statusMessage: string;
  }