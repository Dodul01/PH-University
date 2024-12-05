import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters.')
    .regex(/^[A-Z][a-z]*$/, '{VALUE} is not in capitalized format.')
    .nonempty('First name is required.'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .nonempty('Last name is required.')
    .regex(/^[A-Za-z]+$/, '{VALUE} is not valid.'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty('Father name is required.'),
  motherName: z.string().trim().nonempty('Mother name is required.'),
  faterContactNo: z
    .string()
    .trim()
    .max(16, 'Contact number cannot be more than 16 characters.')
    .nonempty('Father contact number is required.'),
  motherContactNo: z
    .string()
    .trim()
    .max(16, 'Contact number cannot be more than 16 characters.')
    .nonempty('Mother contact number is required.'),
  fatherOccupation: z
    .string()
    .trim()
    .nonempty('Father occupation is required.'),
  motherOccupation: z
    .string()
    .trim()
    .nonempty('Mother occupation is required.'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty('Local guardian name is required.'),
  email: z
    .string()
    .trim()
    .email('Local guardian email must be a valid email.')
    .nonempty('Local guardian email is required.'),
  occupation: z
    .string()
    .trim()
    .nonempty('Local guardian occupation is required.'),
  contactNo: z
    .string()
    .trim()
    .max(16, 'Contact number cannot be more than 16 characters.')
    .nonempty('Local guardian contact number is required.'),
  address: z.string().trim().nonempty('Local guardian address is required.'),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      password: z.string().max(20),
      name: userNameValidationSchema.refine((value) => value, {
        message: 'Student name is required.',
      }),
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: '{VALUE} is not supported.' }),
      }),
      dateOfBarth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email('{VALUE} is not a valid email.')
        .nonempty('Email is required.'),
      avatar: z.string().url().optional(),
      contactNumber: z
        .string()
        .trim()
        .max(16, 'Contact number cannot be more than 16 characters.')
        .nonempty('Contact number is required.'),
      emergencyContactNo: z
        .string()
        .trim()
        .max(16, 'Emergency contact number cannot be more than 16 characters.')
        .nonempty('Emergency contact number is required.'),
      bloodGroupe: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .trim()
        .nonempty('Present address is required.'),
      parmanentAddress: z
        .string()
        .trim()
        .nonempty('Permanent address is required.'),
      guardian: guardianValidationSchema,
      admissionSemester: z.string(),
      localGuardian: localGuardianValidationSchema,
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
