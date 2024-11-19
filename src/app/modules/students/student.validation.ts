import Joi from "joi";

// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string.',
      'string.empty': 'First name is required.',
      'string.max': 'First name cannot be more than 20 characters.',
      'string.pattern.base': 'First name must be in capitalized format.',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string.',
      'string.empty': 'Last name is required.',
      'string.pattern.base':
        'Last name must contain only alphabetic characters.',
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father name is required.',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Mother name is required.',
  }),
  faterContactNo: Joi.string().trim().required().max(16).messages({
    'string.empty': 'Father contact number is required.',
    'string.max': 'Father contact number cannot be more than 16 characters.',
  }),
  motherContactNo: Joi.string().trim().required().max(16).messages({
    'string.empty': 'Mother contact number is required.',
    'string.max': 'Mother contact number cannot be more than 16 characters.',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Father occupation is required.',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Mother occupation is required.',
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian name is required.',
  }),
  email: Joi.string().trim().required().email().messages({
    'string.empty': 'Local guardian email is required.',
    'string.email': 'Local guardian email must be a valid email address.',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian occupation is required.',
  }),
  contactNo: Joi.string().trim().required().max(16).messages({
    'string.empty': 'Local guardian contact number is required.',
    'string.max': 'Contact number cannot be more than 16 characters.',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian address is required.',
  }),
});

// Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required.',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required.',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not a supported gender.',
    'string.empty': 'Gender is required.',
  }),
  dateOfBarth: Joi.string().isoDate().optional(),
  email: Joi.string().trim().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': '{#value} is not a valid email.',
  }),
  avatar: Joi.string().uri().optional(),
  contactNumber: Joi.string().trim().required().max(16).messages({
    'string.empty': 'Contact number is required.',
    'string.max': 'Contact number cannot be more than 16 characters.',
  }),
  emergencyContactNo: Joi.string().trim().required().max(16).messages({
    'string.empty': 'Emergency contact number is required.',
    'string.max': 'Contact number cannot be more than 16 characters.',
  }),
  bloodGroupe: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group.',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required.',
  }),
  parmanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required.',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  isActive: Joi.string().valid('active', 'block').default('active').messages({
    'any.only': '{#value} is not a valid status.',
  }),
});


export default studentValidationSchema;