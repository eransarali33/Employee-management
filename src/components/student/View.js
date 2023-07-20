import React, { useEffect, useState } from "react";
import axios from "axios";

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
  Button,
} from "@material-ui/core";

import { orange } from "@material-ui/core/colors";
import { useParams, useNavigate } from "react-router-dom";

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

const View = () => {
  const classes = useStyles();

  const { id } = useParams();

  const [student, setStudent] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3300/students/${id}`);
        setStudent(student.data);
        console.log(student.data);
      } catch (error) {
        console.log("Some error occured", error);
      }
    }
    getStudent();
  }, [id]);

  function handleClick() {
    navigate("/");
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{id}</TableCell>
              <TableCell align="center">{student.stuname}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back To Home
        </Button>
      </Box>
    </>
  );
};

export default View;
