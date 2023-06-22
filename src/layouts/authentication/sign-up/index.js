/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";

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

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);

  const [signUp, setSignUp] = useState({
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
    setSignUp({ ...signUp, [event.target.name]: event.target.value });
  };

  const handleSignup = async () => {
    console.log(signUp);
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        username: signUp.username,
        password: signUp.password,
      });
      console.log(response);
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
        // navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setNotification({
        color: "error",
        icon: "warning",
        title: error.response.status + " " + error.response.statusText + " ",
        content: error.response.data.errors,
      });
      setOpen(true);
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
                onChange={() => handleChange()}
                label="FirstName"
                fullWidth
              />{" "}
              <MDInput
                type="text"
                name="lastName"
                value={signUp.lastName}
                onChange={() => handleChange()}
                label="LastName"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                value={signUp.username}
                label="Username"
                onChange={() => handleChange(event)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                value={signUp.password}
                label="Password"
                onChange={() => handleChange(event)}
                fullWidth
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
