// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
// import { User } from './user.model';

// const findLastStudentId = async () => {
//   const lastStudent = await User.findOne(
//     {
//       role: 'student',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
// };

// // Generate id automatic
// export const generateStudentId = async (payload: TAcademicSemester) => {
//   let currentId = (0).toString();
//   const lastStudentId = await findLastStudentId();
//   const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
//   const lastStudentYear = lastStudentId?.substring(0, 4);
//   const currentSemesterCode = payload.code;
//   const currentYear = payload.year;

//   if (
//     lastStudentId &&
//     lastStudentSemesterCode === currentSemesterCode &&
//     lastStudentYear === currentYear
//   ) {
//     currentId = lastStudentId.substring(6);
//   }

//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//   incrementId = `${payload.year}${payload.code}${incrementId}`;

//   return incrementId;
// };
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' })
    .sort({ createdAt: -1 })
    .lean();
    
  // Ensure we return a valid ID
  if (!lastStudent || !lastStudent.id || lastStudent.id.length < 6) {
    return undefined;
  }

  return lastStudent.id;
};

const isIdUnique = async (id: string): Promise<boolean> => {
  const existingUser = await User.findOne({ id });
  return !existingUser;
};

// Generate ID automatically
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = '0000';
  const lastStudentId = await findLastStudentId();

  if (lastStudentId) {
    const lastStudentSemesterCode = lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId.substring(0, 4);

    if (
      lastStudentSemesterCode === payload.code &&
      lastStudentYear === payload.year
    ) {
      currentId = lastStudentId.substring(6); // Get the numeric part
    }
  }

  // Increment the ID
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  // Check uniqueness
  if (!(await isIdUnique(incrementId))) {
    throw new Error('Duplicate ID generated. Please retry.');
  }

  return incrementId;
};
