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

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
