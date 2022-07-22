export class License {
  public licenseId: string = '';
  public licenseName: string = '';
  public licenseNumber: string = '';
  public startDate: string = '';
  public endDate: string = '';
  responseModel: License[];
  activeStatus: string;
  customerId: string;
  districtId: string;
  pageSize?: number;
  page?: number;
  count?: number
  statusMessage: string
}