
export class Positions {
  public designationId: string = '';
  public positionName: string = '';
  public designation: string = '';
  public categoryId: string = '';
  public status: string = '';
  public departmentId: string = '';
  responseModel: Positions[];
  value: Positions;
  activeStatus: string;
  customerId: string;
  districtId: string;
  pageSize?: number;
  page?: number;
  count?: number
}
