import React, { useEffect, useState } from "react";

import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import { orange } from "@material-ui/core/colors";

import { Visibility as VisibilityIcon } from "@material-ui/icons";

import { Edit as EditIcon } from "@material-ui/icons";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { Link } from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const List = () => {
  const classes = useStyles();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get("http://localhost:3300/students");
        setStudents(students.data);
      } catch (error) {
        console.log("Some error occured", error);
      }
    }
    getAllStudent();
  }, []);

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3300/students/${id}`);
    var newStudent = students.filter((item) => {
      return item.id !== id;
    });
    setStudents(newStudent);
  }

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                Id
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student, i) => (
              <TableRow key={i}>
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{student.stuname}</TableCell>
                <TableCell align="center">{student.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton>
                      <Link to={`/view/${student.id}`}>
                        <VisibilityIcon color="primary" />
                      </Link>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton>
                      <Link to={`/edit/${student.id}`}>
                        <EditIcon />
                      </Link>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(student.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
