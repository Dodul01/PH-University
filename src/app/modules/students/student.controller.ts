import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(id);

  res.status(200).json({
    sucess: true,
    message: 'Student data retrieved sucessfully.',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDb(id);

  res.status(200).json({
    sucess: true,
    message: 'Student data deleted sucessfully.',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  updateStudent,
  deleteSingleStudent,
};
