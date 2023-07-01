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

import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { MainContext } from "context";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

const formSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});
function Basic() {
  const { mainstate, setMainstate } = useContext(MainContext);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);

  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };
  const encodedToken = localStorage.getItem("token");
  const handleClick = async (loginUser) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        username: loginUser === "guestLogin" ? "guest" : login.username,
        password: loginUser === "guestLogin" ? "guest@123" : login.password,
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
      });
      if (response.status === 200) {
        console.log("loginresponse", response);
        localStorage.setItem("token", response.data.encodedToken);
        setMainstate({
          ...mainstate,
          displayPostData: [],
          userFollowlist: [],
          loggedUser: response.data.foundUser,
          token: true,
        });
        // setMainState({ ...mainState, isLoggedIn: true }); // Update isLoggedIn state in MainContext
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      setErrorSB(true);
    }
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout>
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
            Sign In
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                name="username"
                value={login.username}
                onChange={(event) => handleChange(event)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                value={login.password}
                onChange={(event) => handleChange(event)}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <Grid
                container
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                spacing={1}
              >
                <Grid item lg={6} sx={4}>
                  <MDButton
                    variant="gradient"
                    fullWidth
                    color="info"
                    onClick={() => handleClick("userLogin")}
                  >
                    Log in
                  </MDButton>
                </Grid>
                <Grid item lg={6} sx={8}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={() => handleClick("guestLogin")}
                    fullWidth
                  >
                    Login as guest
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDSnackbar
          color="error"
          icon="warning"
          title="Bad Credential"
          content="Please enter valid email & password"
          dateTime="11 mins ago"
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
          bgRed
        />
      </Card>
    </BasicLayout>
  );
}

export default Basic;
