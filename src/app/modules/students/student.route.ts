import express from 'express';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';
import validateRequest from '../../middlewares/validRequest';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.get('/:id', StudentControllers.getSingleStudents);

router.delete('/:id', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;