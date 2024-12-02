import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constent';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.preprocess((val) => {
      if (typeof val === 'string') {
        const parsedDate = new Date(val);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
      return val;
    }, z.date()),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
// import { z } from 'zod';
// import {
//   AcademicSemesterCode,
//   AcademicSemesterName,
//   Months,
// } from './academicSemester.constent';

// const createAcademicSemesterValidationSchema = z.object({
//   body: z.object({
//     name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
//     year: z.preprocess((val) => {
//       if (typeof val === 'string') {
//         const parsedDate = new Date(val);
//         if (!isNaN(parsedDate.getTime())) {
//           return parsedDate;
//         }
//       }
//       return val;
//     }, z.date()),
//     code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
//     startMonth: z.enum([...Months] as [string, ...string[]]),
//     endMonth: z.enum([...Months] as [string, ...string[]]),
//   }),
// });

// export const AcademicSemesterValidations = {
//   createAcademicSemesterValidationSchema,
// };
