import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const columns = [
  { id: 'studentId', label: 'Student ID', minWidth: 170 },
  { id: 'studentName', label: 'Name', minWidth: 170 },
  { id: 'studentEmail', label: 'Email', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170 },
];

const Students = () => {
  const [studentList, setStudentList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [studentToDelete, setStudentToDelete] = React.useState(null);
  const navigate = useNavigate();

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
        toast.error('Failed to fetch student data.');
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (studentId) => {
    if (studentId) {
      navigate(`/update-student/${studentId}`);
    } else {
      toast.error('Student ID is invalid.');
    }
  };

  const handleDelete = (studentId) => {
    setStudentToDelete(studentId);
    setOpenDialog(true); // Open the delete confirmation dialog
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await axios.delete(
          `https://localhost:7078/api/Students/delete-student/${studentToDelete}`
        );
        toast.success('Student deleted successfully!');
        setOpenDialog(false);
        setStudentList(
          studentList.filter((student) => student.studentId !== studentToDelete)
        );
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error('Failed to delete student.');
      }
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false); // Close the dialog without performing any action
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper sx={{ width: '80%', overflow: 'hidden' }}>
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
                                onClick={() => handleEdit(student.studentId)}
                              />
                              <Delete
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleDelete(student.studentId)}
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

        {/* Dialog for delete confirmation */}
        <Dialog open={openDialog} onClose={cancelDelete}>
          <DialogTitle>Delete Student</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this student?
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              No
            </Button>
            <Button onClick={confirmDelete} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Paper>
    </div>
  );
};

export default Students;
