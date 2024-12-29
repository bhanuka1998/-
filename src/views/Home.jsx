import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '40px 0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex', // Enable Flexbox
        justifyContent: 'center', // Horizontally center the content
        alignItems: 'center', // Vertically center the content
        minHeight: '100vh', // Take up at least the full height of the viewport
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          width: '100%', // Ensure the Paper takes the full width available
        }}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome to the Simple CRUD App
        </Typography>
        <Typography variant="body1" paragraph>
          This is a simple CRUD app used to perform basic CRUD operations. For
          the front-end, I have used ReactJS and Material UI. The back-end is
          built with .NET Core, and all database functionalities are managed
          through MySQL. For form validation, I have implemented Yup for
          validation rules and React Hook Form for handling form data
          efficiently.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
