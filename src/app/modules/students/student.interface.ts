import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  motherName: string;
  faterContactNo: string;
  motherContactNo: string;
  fatherOccupation: string;
  motherOccupation: string;
};

export type TLocalGuardian = {
  name: string;
  email: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female'; // union type literal
  email: string;
  avatar?: string; // optional type
  dateOfBarth?: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroupe?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isDeleted: boolean;
};

// For creating static
export interface StudentModal extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// For creating instance
// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
