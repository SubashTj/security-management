
export class Department {
    public departmentId: string ='';
    public departmentName: string ='';
    public status: string ='';
    public createdOn: string ='';
  responseModel: Department[];
  activeStatus: string;
  customerId: string;
  districtId: string;
  pageSize?: number;
  page?: number;
  count?:number
  statusMessage:string
  }