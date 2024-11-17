// import { Schema, model, connect } from 'mongoose';
import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, require: true },
  middleName: { type: String },
  lastName: { type: String, require: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, require: true },
  motherName: { type: String, require: true },
  faterContactNo: { type: String, require: true },
  motherContactNo: { type: String, require: true },
  fatherOccupation: { type: String, require: true },
  motherOccupation: { type: String, require: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, require: true },
  email: { type: String, require: true },
  occupation: { type: String, require: true },
  contactNo: { type: String, require: true },
  address: { type: String, require: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBarth: { type: String },
  email: { type: String, required: true },
  avatar: { type: String },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroupe: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  isActive: ['active', 'block'],
});

export const StudentModel = model<Student>('Student', studentSchema);
