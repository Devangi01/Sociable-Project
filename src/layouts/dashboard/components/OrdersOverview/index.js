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
import React, { useContext, useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/team-1.jpg";
import MDAvatar from "components/MDAvatar";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

const OrdersOverview = () => {
  const getAllUserInfo = async () => {
    try {
      const response = await axios.get(`api/users`);

      console.log("getAllUserInfo", response);
    } catch (error) {
      // setErrorSB(true);
      console.log(error);
      // setNotification({
      //   color: "error",
      //   icon: "warning",
      //   title: error.response.status + " " + error.response.statusText + " ",
      //   content: error.response.data.errors,
      // });
      // setOpen(true);
    }
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3} style={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography variant="h6" style={{ color: "red" }} fontWeight="medium">
          Who to Follow?
        </MDTypography>
        <MDTypography variant="h6" style={{ color: "red" }} fontWeight="medium">
          Show More
        </MDTypography>
      </MDBox>
      <MDBox>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          m={2}
          style={{
            width: "91%",
            borderRadius: "10px",
            boxShadow: "3px 3px 3px 3px grey",
          }}
        >
          <Grid
            item
            md={4}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MDBox mr={2}>
              <MDAvatar src={team1} alt="something here" shadow="md" />
            </MDBox>
          </Grid>
          <Grid item md={4} style={{ marginBottom: "10px" }}>
            Ajay Zala <br />
            <small style={{ color: "#a09699" }}>@ajayzala</small>
          </Grid>
          <Grid item md={4}>
            <small style={{ color: "red", fontWeight: "bold" }}>Follow+</small>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};

export default OrdersOverview;
