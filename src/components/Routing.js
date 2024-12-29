import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../views/Home';
import Students from '../views/Students';
import CreateStudent from '../views/CreateStudent';
import { Route, Routes } from 'react-router-dom';
import UpdateStudent from '../views/UpdateStudent';

const routing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" default element={<Home />} />
        <Route path="/students-list" element={<Students />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/update-student/:studentId" element={<UpdateStudent />} />
      </Routes>
      <Footer />
    </>
  );
};

export default routing;
