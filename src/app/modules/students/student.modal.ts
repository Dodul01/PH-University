import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxlength: [20, 'First name cannot be more than 20 characters.'],
    trim: true,
    validate: {
      validator: function (value: string) {
        if (!value) return false;

        const trimmedValue = value.trim();

        return /^[A-Z][a-z]*$/.test(trimmedValue);
      },
      message: '{VALUE} is not in capitalized format.',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid.',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  faterContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
    maxlength: [16, 'Contact number can not be more then 16 carecters.'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
    maxlength: [16, 'Contact number can not be more then 16 carecters.'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local gurdian name is required.'] },
  email: { type: String, required: [true, 'Local guardian email is required'] },
  occupation: {
    type: String,
    required: [true, 'Local gurdian ocupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local gurdian contact number is required.'],
    maxlength: [16, 'Contact number can not be more then 16 carecters.'],
  },
  address: {
    type: String,
    required: [true, 'Local gurdian address is required.'],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: [true, 'Student name is required.'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported.',
    },
    required: true,
  },
  dateOfBarth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email.'
    },
  },
  avatar: { type: String },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required.'],
    maxlength: [16, 'Contact number can not be more then 16 carecters.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emmergency contact number is required.'],
    maxlength: [16, 'Contact number can not be more then 16 carecters.'],
  },
  bloodGroupe: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  parmanentAddress: {
    type: String,
    required: [true, 'Parmanent address is required.'],
  },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  isActive: { type: String, enum: ['active', 'block'], default: 'active' },
});

export const StudentModel = model<Student>('Student', studentSchema);
