import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../students/student.validation';
import validateRequest from '../../middlewares/validRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;