import { AnyRecord } from "dns";

export class Employees {
  public employeeId: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public employeeName: string = '';
  public gender: string = '';
  public dateOfBirth: string = '';
  public shoeSize: string = '';
  public shirtSize: string = '';
  public pantSize: string = '';
  public dateofJoining: string = '';
  public departmentId: string = '';
  public departmentName: string = '';
  public categoryId: string = '';
  public categoryName: string = '';
  public designationId: string = '';
  public shiftId: string = '';
  public positionName: string = '';
  public qualificationId: string = '';
  public qualification: string = '';
  public experienceMonth: string = '';
  public experienceYear: string = '';
  public employeeType: string = '';
  public maritalStatus: string = '';
  public bloodGroupId: string = '';
  public bloodGroup: string = '';
  public nationalityId: string = '';
  public nationality: string = '';
  public religionId: string = '';
  public religion: string = '';
  public workPhone: string = '';
  public mobileNumber: string = '';
  public aadharNumber: string = '';
  public email: string = '';
  public esiNo: string = '';
  public epfNo: string = '';
  public nomineeName: string = '';
  public accountNumber: string = '';
  public ifscCode: string = '';
  public salaryTypeId: string = '';
  public actualSalary: string = '';
  public esiSalary: string = '';
  public epfSalary: string = '';
  public personalMobile: string = '';
  public personalEmail: string = '';
  public personalPhone: string = '';
  public userImage: string = '';
  public addressLine1: string = '';
  public addressLine2: string = '';
  public countryId: string = '';
  public country: string = '';
  public stateId: string = '';
  public state: string = '';
  public cityId: string = '';
  public city: string = '';
  public zipcode: string = '';
  public deviceName: string = '';
  public macAddress: string = '';
  public notes: string = '';
  public createdBy: string = '';
  public createdAt: string = '';
  public updatedBy: string = '';
  public updatedAt: string = '';
  public districtId: string = '';
  public attachment: any = [];
  public drivingLicense: string = '';
  public employeeActiveStatus: string = '';
  public image: any = '';
  public imageDataUrl: any = '';
  public medicalCouncilNo: string = '';
  public speciality: string = '';
  public specialityId: string = '';
  responseModel: Employees[];

  keyword: string;
  employees: any;
  positionId: any;
  dateOfJoining: any;
  status: string;
  statusMessage: string;
  pageSize?: number;
  page?: number;
  count?: number
}
