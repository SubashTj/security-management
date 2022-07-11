export class Speciality {
    public specialityId: string ='';
    public speciality: string ='';
    public status: string ='';
    public districtId: string ='';
    public departmentName: string = '';
    public departmentId: string  = '';
  responseModel: Speciality[];
  activeStatus: string;
  pageSize?: number;
  page?: number;
  count?:number
  }