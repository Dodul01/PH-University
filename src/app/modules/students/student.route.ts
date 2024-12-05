import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.get('/:studentId', StudentControllers.getSingleStudents);

router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
