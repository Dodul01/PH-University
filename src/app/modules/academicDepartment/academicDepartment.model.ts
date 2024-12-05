import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

const academicDepartmentSchama = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchama.pre('save', async function (next) {
  const isDepartmentExsist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExsist) {
    throw new AppError(403, 'This department is already exsist.');
  }

  next();
});

academicDepartmentSchama.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExsist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExsist) {
    throw new AppError(404, 'This department does not exsist.');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchama,
);
