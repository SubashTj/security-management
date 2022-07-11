export class ShiftDetails {
    public shiftName: string = '';
    public shiftId: number;
    public shiftStartTime: string = '';
    public shiftEndTime: string = '';
    responseModel: ShiftDetails[];
    activeStatus: string;
  keyword: string;
  statusMessage: string;
  pageSize?: number;
  page?: number;
  count?:number
  }