import React, { useContext, useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/team-1.jpg";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import FollowPost from "./FollowPost";

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
    // height: "100%",
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
    fontSize: "15px",
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
    fontSize: "18px",
    cursor: "pointer",

    // marginBottom: theme.spacing(0.5),
  },
  username: {
    color: "#657786",
  },
  followButton: {
    color: "#fff",
    cursor: "pointer",
    border: "1px solid red",
    padding: "4px",
    borderRadius: "10px",
    backgroundColor: "lightblue",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const OrdersOverview = () => {
  const classes = useStyles();
  const { mainstate, setMainstate } = useContext(MainContext);
  const encodedToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const getAllUserInfo = async () => {
    try {
      const response = await axios.get(`api/users`);

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

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const addToFollowList = async (id) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );

      if (response.status === 200) {
        //   getAllPost(response.data.posts[response.data.posts.length - 1].username);

        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content: "Now you are following!",
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
        mainstate.allUserlist.map(
          (data) =>
            data.username !== mainstate.loggedUser.username && (
              <FollowPost followData={data} key={data._id} />
            )
        )}
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
  );
};

export default OrdersOverview;
