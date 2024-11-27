import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.joi.validation';



const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      sucess: true,
      message: 'Students data retrieved sucessfully.',
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
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong.',
      error: error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(studentId);

    res.status(200).json({
      sucess: true,
      message: 'Student data deleted sucessfully.',
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

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudent,
};
