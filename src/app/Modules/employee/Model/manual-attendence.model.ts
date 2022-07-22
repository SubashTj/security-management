
export class ManualAttendence {
  public employeeLeaveId: string = '';
  public employeeId: string = '';
  public employeeName: string = '';
  public date: string = '';
  public totalCount: string = '';
  public list: AttendenceList[] = [];
  public attendanceTime: any[] = [];
  public checkIn: string = '';
  public checkOut: string = '';
  public status: string = '';
}

export class AttendenceList {
  public employeeLeaveId: string = '';
  public employeeId: string = '';
  public employeeName: string = '';
  public date: string = '';
  public checkIn: string = '';
  public checkOut: string = '';
  public mac: string = '';
  public departmentId: string = '';
  public departmentName: string = '';
  public leaveDay: string = '';
  public leave: string = '';
  public total: string = '';
  public present: string = '';
  public absent: string = '';
  public od: string = '';
  public late: string = '';
  public requestPermission: string = '';
  public lateWithPermission: string = '';
  public lateWithoutPermission: string = '';
  public lateComingWithoutPermission: string = '';
  public lateComingWithPermission: string = '';
  public permission: string = '';
  public status: string = '';
}