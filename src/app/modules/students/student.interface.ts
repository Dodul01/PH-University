export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  motherName: string;
  faterContactNo: string;
  motherContactNo: string;
  fatherOccupation: string;
  motherOccupation: string;
};

export type LocalGuardian = {
  name: string;
  email: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female'; // union type literal
  email: string;
  avatar?: string; // optional type
  dateOfBarth?: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroupe?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  isActive: 'active' | 'block';
};
