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
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import Box from "@mui/material/Box";
import MDAvatar from "components/MDAvatar";
import team1 from "assets/images/team-1.jpg";

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
import PolarChart from "examples/Charts/PolarChart";
import PostCard from "./components/PostCard";

function Dashboard() {
  const { mainstate, setMainstate } = useContext(MainContext);
  const { sales, tasks } = reportsLineChartData;

  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const [filterButton, setFilterButton] = useState({
    trending: false,
    latest: false,
  });
  const [postcontent, setPostContent] = useState("");
  const encodedToken = localStorage.getItem("token");

  // const getAllBookMarks = async () => {
  //   try {
  //     const response = await axios.get(`api/users/bookmark`, {
  //       headers: {
  //         authorization: encodedToken, // passing token as an authorization header
  //       },
  //     });
  //   } catch (error) {
  //     // setErrorSB(true);
  //     // setNotification({
  //     //   color: "error",
  //     //   icon: "warning",
  //     //   title: error.response.status + " " + error.response.statusText + " ",
  //     //   content: error.response.data.errors,
  //     // });
  //     // setOpen(true);
  //   }
  // };
  // const getAllPost = async (username) => {
  //   try {
  //     const response = await axios.get(`/api/posts/user/${username}`);

  //     if (response.status === 200) {
  //       setMainstate({ ...mainstate, displayPostData: response.data.posts });
  //     }
  //   } catch (error) {
  //     // setErrorSB(true);

  //     setNotification({
  //       color: "error",
  //       icon: "warning",
  //       title: error.response.status + " " + error.response.statusText + " ",
  //       content: error.response.data.errors,
  //     });
  //     setOpen(true);
  //   }
  // };

  const addNewPost = async () => {
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

      if (response.status === 201) {
        //getAllPost(response.data.posts[response.data.posts.length - 1].username);
        getAllUserPost();
        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content: "Post Created Successful!",
        });
        setOpen(true);
        setFilterButton({
          trending: false,
          latest: false,
        });
      }
    } catch (error) {
      // setErrorSB(true);

      setNotification({
        color: "error",
        icon: "warning",
        title: error.response.status + " " + error.response.statusText + " ",
        content: error.response.data.errors,
      });
      setOpen(true);
    }
  };
  // useEffect(() => {
  //   getAllPost(mainstate.loggedUser.username);
  // }, [mainstate.displayPostData]);

  const getAllUserPost = async () => {
    try {
      const response = await axios.get(`/api/posts`);

      if (response.status === 200) {
        setMainstate({ ...mainstate, displayAllUserPostData: response.data.posts });
      }
    } catch (error) {
      // setErrorSB(true);

      setNotification({
        color: "error",
        icon: "warning",
        title: error.response.status + " " + error.response.statusText + " ",
        content: error.response.data.errors,
      });
      setOpen(true);
    }
  };

  const handleFilter = (filterType) => {
    filterType === "trending"
      ? setFilterButton({ trending: true, latest: false })
      : setFilterButton({ trending: false, latest: true });
    console.log("Filter type", filterType);
    console.log("Filter type", filterButton);

    if (filterType === "trending") {
      mainstate.displayAllUserPostData.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    } else {
      mainstate.displayAllUserPostData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    }
    console.log("Filter type", mainstate.displayAllUserPostData);
  };

  console.log("Dashboard", mainstate.displayPostData);
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
                    <MDBox mr={2}>
                      <MDAvatar src={team1} alt="something here" shadow="md" />
                    </MDBox>
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
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Grid
                container
                style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                xs={12}
                md={12}
                lg={12}
              >
                <Grid item>
                  <MDTypography>Recent Post</MDTypography>{" "}
                </Grid>
                <Grid item style={{ display: "flex", flexDirection: "row" }}>
                  <MDButton
                    pt={5}
                    variant={filterButton.trending ? "contained" : "outlined"}
                    startIcon={<TrendingUpIcon />}
                    color="error"
                    onClick={() => handleFilter("trending")}
                  >
                    Trending{" "}
                  </MDButton>

                  <MDButton
                    size="small"
                    style={{ marginLeft: "3%" }}
                    pt={5}
                    variant={filterButton.latest ? "contained" : "outlined"}
                    startIcon={<RefreshIcon />}
                    color="error"
                    onClick={() => handleFilter("latest")}
                  >
                    Latest{" "}
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Box
                sx={{
                  width: "100%",
                  height: "420px",
                  overflow: "auto",
                  backgroundColor: "#f0f2f5",
                  borderRadius: "10px",
                }}
              >
                {mainstate.displayAllUserPostData &&
                  mainstate.displayAllUserPostData.map(
                    (data) =>
                      data.username === mainstate.loggedUser.username && (
                        <PostCard getAllUserPost={getAllUserPost} cardData={data} key={data._id} />
                      )
                  )}
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
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
