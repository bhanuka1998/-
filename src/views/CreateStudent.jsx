import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { studentValidationSchema } from '../util/validationSchemas'; // Import validation schema
import axios from 'axios';

const CreateStudent = () => {
  // react-hook-form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentValidationSchema), // Use imported validation schema
    defaultValues: {
      studentId: '',
      studentName: '',
      studentEmail: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://localhost:7078/api/Students/create-student',
        data
      );
      toast.success('Student created successfully.');
      console.log('Response:', response);
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error creating student:', error);
      if (error.response) {
        // Display error message from backend if available
        toast.error(`Error: ${error.response.data}`);
      } else {
        toast.error('Failed to create student. Please try again.');
      }
      reset();
    }
  };

  // Handle form errors
  const onError = (errors) => {
    console.log('Errors:', errors);
    toast.error('Please correct the errors in the form.');
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        mt: 4,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Create Student
      </Typography>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Box mb={3}>
          <Controller
            name="studentId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Student ID"
                fullWidth
                error={!!errors.studentId}
                helperText={errors.studentId ? errors.studentId.message : ''}
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="studentName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Student Name"
                fullWidth
                error={!!errors.studentName}
                helperText={
                  errors.studentName ? errors.studentName.message : ''
                }
              />
            )}
          />
        </Box>
        <Box mb={3}>
          <Controller
            name="studentEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Student Email"
                fullWidth
                error={!!errors.studentEmail}
                helperText={
                  errors.studentEmail ? errors.studentEmail.message : ''
                }
              />
            )}
          />
        </Box>
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default CreateStudent;
