import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

import { deepPurple, green } from "@material-ui/core/colors";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
});

const Edit = () => {
  const classes = useStyles();

  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });

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

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3300/students/${id}`, student);
      alert("Updated Successfully");
      navigate("/");
    } catch (error) {
      console.log("Some error occured", error);
    }
  }

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">React CRUD with API call</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
          </Box>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  autoFocus
                  value={id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="NAME"
                  value={student.stuname}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={student.email}
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Update
              </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleClick}>
              Back To Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
