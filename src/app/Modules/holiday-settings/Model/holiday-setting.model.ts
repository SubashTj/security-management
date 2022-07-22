export class Holiday {
  public description: string = "";
  public title: string = "";
  public status: string = "";
  public holidayId: string = ""
  responseModel: Holiday[];
  pageSize?: number;
  page?: number;
  count?: number
}
