import { IUser } from "./user.interface";

export class User implements IUser {
    public id? : number;
    public name? : string;
    public email? : string;
    public token? : string;
    public userName? : string;
    public password? :string;
    public oldPassword? : string;
    public newPassword? : string;
    public confirmPassword? : string;
    public avatar? : string;
    public mobileNumber? :string;
    public status?: string;
    public roleName? : string;
    public roleId? : any;
    public mobile? : any;
    public skybind? : any = '';
    public otp : number;

  }
  