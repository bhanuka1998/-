import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material'; // Import Material UI icons

const columns = [
  { id: 'studentId', label: 'Student ID', minWidth: 170 },
  { id: 'studentName', label: 'Name', minWidth: 170 },
  { id: 'studentEmail', label: 'Email', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170 },
];

const Students = () => {
  const [studentList, setStudentList] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // To manage loading state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7078/api/Students/students-list'
        );
        setStudentList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        toast.error('Failed to fetch student data.'); // Display error toast
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>; // You can display a loader while data is being fetched
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={student.studentId}
                >
                  {columns.map((column) => {
                    const value = student[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <>
                            <Edit
                              style={{ cursor: 'pointer', marginRight: 10 }}
                              onClick={() => handleEdit(student.studentId)} // Handle edit
                            />
                            <Delete
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleDelete(student.studentId)} // Handle delete
                            />
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer /> {/* Display toast notifications */}
    </Paper>
  );
};

// Placeholder functions for handling edit and delete actions
const handleEdit = (studentId) => {
  console.log(`Edit student with ID: ${studentId}`);
  // Implement your edit logic here (e.g., open an edit form/modal)
};

const handleDelete = (studentId) => {
  console.log(`Delete student with ID: ${studentId}`);
  // Implement your delete logic here (e.g., call API to delete student)
};

export default Students;
