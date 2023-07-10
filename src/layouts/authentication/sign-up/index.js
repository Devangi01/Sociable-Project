import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { MainContext } from "context";
import team2 from "assets/images/team-2.jpg";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

//create a validation schema
const formSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("username name is required"),
  password: yup.string().required("password is required"),
});

function Cover() {
  const { mainstate, setMainstate } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.message });
      });
    setSignUp({ ...signUp, [name]: value });
  };

  const handleSignup = async () => {
    const validationErrors = {};
    try {
      await formSchema.validate(signUp, { abortEarly: false });
      const response = await axios.post(`/api/auth/signup`, {
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        username: signUp.username,
        password: signUp.password,
        image: team2,
        bio: "Hi, I’m Alec default, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
        email: "tempemail@gmail.com",
        location: "UAE",
      });

      // saving the encodedToken in the localStorage

      if (response.status === 201) {
        localStorage.setItem("token", response.data.encodedToken);

        setNotification({
          color: "success",
          icon: "check",
          title: "Account Created",
          content: "Register Successful!",
        });
        setOpen(true);
        setMainstate({ ...mainstate, displayPostData: [] });
        navigate("/authentication/sign-in", { replace: true });
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }

      setErrors(validationErrors);
    }
  };
  return (
    <CoverLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2} style={{ display: "flex", flexDirection: "row" }}>
              <MDInput
                type="text"
                name="firstName"
                value={signUp.firstName}
                onChange={handleChange}
                label="FirstName"
                fullWidth
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                errorColor="error"
              />{" "}
              <MDInput
                type="text"
                name="lastName"
                value={signUp.lastName}
                onChange={handleChange}
                label="LastName"
                fullWidth
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                errorColor="error"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                value={signUp.username}
                label="Username"
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.username)}
                helperText={errors.username}
                errorColor="error"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                value={signUp.password}
                label="Password"
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password}
                errorColor="error"
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => handleSignup()} variant="gradient" color="info" fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDSnackbar
          color={notification.color}
          icon={notification.icon}
          title={notification.title}
          content={notification.content}
          open={open}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite
        />
      </Card>
    </CoverLayout>
  );
}

export default Cover;
