import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Creating a schema validation using joy

    // Data comming from user / frontend
    const { student: studentData } = req.body;

    const { error } = studentValidationSchema.validate(studentData);

    // call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        sucess: false,
        message: 'Something went wrong.',
        error: error.details,
      });
    }

    // send response
    res.status(200).json({
      sucess: true,
      message: 'Student is created sucessfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong.',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      sucess: true,
      message: 'Students data retrieved sucessfully.',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);

    res.status(200).json({
      sucess: true,
      message: 'Student data retrieved sucessfully.',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
