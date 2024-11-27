import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Data comming from user / frontend
    const { password, student: studentData } = req.body;

    // Data validation using Zod
    // const zodParseData = studentValidationSchema.parse(studentData);
    // call service function to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // send response
    res.status(200).json({
      sucess: true,
      message: 'Student is created sucessfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      sucess: false,
      message: error.message || 'Something went wrong.',
      error: error,
    });
  }
};

export const UserController = {
  createStudent,
};
