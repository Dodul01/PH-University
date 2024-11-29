import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      sucess: true,
      message: 'Students data retrieved sucessfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);

    res.status(200).json({
      sucess: true,
      message: 'Student data retrieved sucessfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDb(studentId);

    res.status(200).json({
      sucess: true,
      message: 'Student data deleted sucessfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudent,
};