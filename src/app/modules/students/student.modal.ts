import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModal,
  TUserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModal>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required.'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Student name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported.',
      },
      required: true,
    },
    dateOfBarth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email.',
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
    admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    academicDepartment: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// query middleware
studentSchema.pre('find', async function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const exsistingUser = await Student.findOne({ id });
  return exsistingUser;
};

export const Student = model<TStudent, StudentModal>('Student', studentSchema);
