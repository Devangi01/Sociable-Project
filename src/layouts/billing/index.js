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

// @mui material componentsimport React, { useContext, useState, useEffect } from "react";

import React, { useContext, useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import Box from "@mui/material/Box";
import MDAvatar from "components/MDAvatar";
import team1 from "assets/images/team-1.jpg";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import PostCard from "layouts/dashboard/components/PostCard";
import PostBookMarkCard from "./components/PostBookMarkCard";
import MDTypography from "components/MDTypography";

const Billing = () => {
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [displayPostData, setDisplayPostData] = useState([]);

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const encodedToken = localStorage.getItem("token");
  const getAllBookMarks = async () => {
    try {
      const response = await axios.get(`api/users/bookmark`, {
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
      });

      if (response.status === 200) {
        setDisplayPostData(response.data.bookmarks);
      }
    } catch (error) {
      // setErrorSB(true);
      // setNotification({
      //   color: "error",
      //   icon: "warning",
      //   title: error.response.status + " " + error.response.statusText + " ",
      //   content: error.response.data.errors,
      // });
      // setOpen(true);
    }
  };

  getAllBookMarks();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4.5}>
        <MDTypography>Filter Section</MDTypography>
      </MDBox>
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {displayPostData && displayPostData.length > 0 && "Bookmark Post"}
              <Box
                sx={{
                  width: "100%",
                  height: "420px",
                  overflow: "auto",
                  backgroundColor: "#f0f2f5",
                  borderRadius: "10px",
                }}
              >
                {displayPostData.length > 0 &&
                  displayPostData.map((data) => (
                    <PostBookMarkCard cardData={data} key={data._id} />
                  ))}
              </Box>
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
    </DashboardLayout>
  );
};

export default Billing;
