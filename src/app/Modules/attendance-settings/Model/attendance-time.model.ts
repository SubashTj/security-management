
export class EmpAttendanceList {
    public customizeDate: string = "";
    public empAttendanceGroupId: string = "";
    public status: string = "";
    public department: string = "";
    public position: string = "";
    public departmentNames: string = "";
    public positionNames: string = "";
    public routineList: EmpRoutineList[] = [];
    public departmentIds: string = "";
    public positionIds: string = "";
    public activeStatus: string = "";
}

export class EmpRoutineList {
    public checkIn: string = "";
    public checkOut: string = "";
    public day: string = "";
    public dayId: string = "";
    public empAttendanceRoutineId: string = "";
    public halfDayMark: string = "";
    public isWorkingDay: string = "";
    public lateMark: string = "";
    public status: string = "";
}

export class EmpRoutineListForTracking {
    public checkIn: string = "";
    public checkOut: string = "";
    public day: string = "";
    public halfDayMarkTime: string = "";
    public isWorkingDay: string = "";
    public lateMarkMin: string = "";
}