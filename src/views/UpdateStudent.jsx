import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { studentValidationSchema } from '../util/validationSchemas';

const UpdateStudent = () => {
  const { studentId } = useParams(); // Retrieve student ID from route params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentValidationSchema),
    defaultValues: {
      studentId: '',
      studentName: '',
      studentEmail: '',
    },
  });

  // Fetch student data based on the studentId from the URL
  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        toast.error('Student ID is missing.');
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:7078/api/Students/get-student-from-id/${studentId}`
        );
        const studentData = response.data;
        setValue('studentId', studentData.studentId); // Pre-fill studentId
        setValue('studentName', studentData.studentName);
        setValue('studentEmail', studentData.studentEmail);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        toast.error('Failed to fetch student data.');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await axios.put(
        `https://localhost:7078/api/Students/update-student/${studentId}`,
        data
      );
      toast.success('Student updated successfully.');
      reset();
      navigate('/students-list'); // Redirect to Students list
    } catch (error) {
      console.error('Error updating student:', error);
      if (error.response) {
        toast.error(`Error: ${error.response.data}`);
      } else {
        toast.error('Failed to update student.');
      }
    }
  };

  const onError = (errors) => {
    toast.error('Please correct the errors in the form.');
    console.log('Errors:', errors);
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loader while data is being fetched
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(path-to-your-background-image)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          p: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
        }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Update Student
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
                  disabled
                  error={!!errors.studentId}
                  helperText={errors.studentId?.message}
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
                  helperText={errors.studentName?.message}
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
                  helperText={errors.studentEmail?.message}
                />
              )}
            />
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            Update
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default UpdateStudent;
