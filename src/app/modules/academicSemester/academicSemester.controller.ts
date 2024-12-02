import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  console.log(req.body);
  
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic semester is created sucessfully.',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
