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

// @mui material components
import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import MDTypography from "components/MDTypography";
import { MainContext } from "context";

function Dashboard() {
  const { mainstate, setMainstate } = useContext(MainContext);
  const { sales, tasks } = reportsLineChartData;
  console.log("Dash", mainstate);

  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const [postcontent, setPostContent] = useState("");
  const encodedToken = localStorage.getItem("token");

  const addNewPost = async () => {
    debugger;
    try {
      const response = await axios.post(
        `/api/posts`,
        {
          content: postcontent,
        },
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );

      debugger;
      console.log("loginResponse", response);
      if (response.status === 201) {
        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content: "Post Created Successful!",
        });
        setOpen(true);
      }
    } catch (error) {
      // setErrorSB(true);
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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <MDBox style={{ backgroundColor: "white", borderRadius: "10px" }} mb={3} p={2}>
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    ss
                  </Grid>

                  <Grid item xs={11}>
                    <Grid
                      container
                      spacing={1}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Grid item>
                        <MDInput
                          type="description"
                          label="Description"
                          name="description"
                          multiline
                          rows={3}
                          fullWidth
                          value={postcontent}
                          onChange={(event) => setPostContent(event.target.value)}
                        />
                      </Grid>
                      <Grid item style={{ display: "flex", flexDirection: "row-reverse" }}>
                        <MDButton
                          pt={5}
                          variant="contained"
                          color="info"
                          onClick={() => addNewPost()}
                        >
                          Post
                        </MDButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
