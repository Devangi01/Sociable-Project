import React, { useContext, useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/team-1.jpg";
import MDAvatar from "components/MDAvatar";
import axios from "axios";
import { makeStyles } from "@mui/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { MainContext } from "context";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: theme.spacing(1),
    backgroundColor: "#f5f8fa",
  },
  header: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    // marginBottom: theme.spacing(2),
  },
  followText: {
    color: "#344767",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  name: {
    fontWeight: "bold",
    // marginBottom: theme.spacing(0.5),
  },
  username: {
    color: "#657786",
  },
  followButton: {
    color: "#344767",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const OrdersOverview = () => {
  const classes = useStyles();
  const { mainstate, setMainstate } = useContext(MainContext);
  const getAllUserInfo = async () => {
    debugger;
    try {
      const response = await axios.get(`api/users`);
      console.log("order", response);

      if (response.status === 200) {
        setMainstate({ ...mainstate, allUserlist: response.data.users });
      }
    } catch (error) {
      setErrorSB(true);
      // setNotification({
      //   color: "error",
      //   icon: "warning",
      //   title: error.response.status + " " + error.response.statusText + " ",
      //   content: error.response.data.errors,
      // });
      // setOpen(true);
    }
  };
  console.log("alluserlist", mainstate);

  useEffect(() => {
    getAllUserInfo();
  }, []);

  return (
    <Card className={classes.card}>
      <MDBox className={classes.header}>
        <MDTypography variant="h6" className={classes.followText}>
          Who to Follow?
        </MDTypography>
        <MDTypography variant="h6" className={classes.followText}>
          Show More
        </MDTypography>
      </MDBox>
      {mainstate.allUserlist &&
        mainstate.allUserlist.map((data) => (
          <MDBox key={data._id}>
            <Grid
              container
              // spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              className={classes.avatarContainer}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "3px 3px 3px 2px grey",
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
              <Grid item md={4} className={classes.name}>
                {data.firstName} {data.lastName}
                <br />
                <small style={{ color: "#a09699" }}>@{data.username}</small>
              </Grid>
              <Grid item md={4}>
                <small className={classes.followButton}>Follow+</small>
              </Grid>
            </Grid>
          </MDBox>
        ))}
    </Card>
  );
};

export default OrdersOverview;
