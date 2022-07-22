
export class FileUpload {
  public id: string = '';
  public documentTitle: string = '';
  public status: string = '';
  public pdfFile: string = '';
  public file: string = '';
  responseModel: FileUpload[];
  activeStatus: string;
  customerId: string;
  districtId: string;
  pageSize?: number;
  page?: number;
  count?: number
  statusMessage: string
}