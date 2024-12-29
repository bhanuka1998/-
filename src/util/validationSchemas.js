import * as Yup from 'yup';

export const studentValidationSchema = Yup.object().shape({
  studentId: Yup.string()
    .required('Student ID is required')
    .matches(/^\d+$/, 'Student ID must only contain numbers'),
  studentName: Yup.string()
    .required('Student Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Student Name must only contain letters'),
  studentEmail: Yup.string()
    .required('Student Email is required')
    .email('Enter a valid email address'),
});
