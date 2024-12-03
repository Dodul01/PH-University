// import config from '../../config';
// // import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
// import { AcademicSemester } from '../academicSemester/academicSemester.model';
// import { TStudent } from '../students/student.interface';
// import { Student } from '../students/student.modal';
// import { TUser } from './user.interface';
// import { User } from './user.model';
// import { generateStudentId } from './user.utils';

// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   // If password is not given use default password
//   userData.password = password || (config.default_password as string);

//   // set student role
//   userData.role = 'student';

//   // Finde academic semester info
//   const admissionSemester = await AcademicSemester.findById(
//     payload.admissionSemester,
//   );

//   userData.id = await generateStudentId(admissionSemester);

//   // create a user
//   const newUser = await User.create(userData); // build in static method

//   // create a student
//   if (Object.keys(newUser).length) {
//     // set id , _id as user
//     payload.id = newUser.id;
//     payload.user = newUser._id; // reference _id

//     const newStudent = await Student.create(payload);

//     return newStudent;
//   }

//   return newUser;
// };

// export const UserServices = {
//   createStudentIntoDB,
// };

import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.modal';

import { AcademicSemester } from './../academicSemester/academicSemester.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set  generated id
  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
