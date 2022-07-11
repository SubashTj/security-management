
export class Clients {
  public branchId: string = '';
  public clientName: string = '';
  public address: string = '';
  public mailId: string = '';
  public phoneNo: string = '';
  public status: string = '';
  public departmentId: string = '';
  public branchesId: string = '';
  public emloyeeCode: string = '';
  responseModel: Clients[];
  value: Clients;
  activeStatus: string;
  customerId: string;
  districtId: string;
  pageSize?: number;
  page?: number;
  count?: number
  statusMessage: string;
}
