export class Qualification {
  public qualification: string;
  public name: string = "";
  public status: string = "";
  responseModel: Qualification[];
  qualificationId: any;
  customerId: any;
  districtId: string;
  offset: number;
  limit: number;
  pageSize?: number;
  page?: number;
  count?: number
}
