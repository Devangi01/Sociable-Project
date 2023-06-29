import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import team1 from "assets/images/team-1.jpg";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

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
const FollowPost = (props) => {
  const classes = useStyles();
  const { mainstate, setMainstate } = useContext(MainContext);
  const encodedToken = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);

  const { _id, content, likes, username, firstName, lastName, createdAt, updatedAt } =
    props.followData;

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const ifFollow = mainstate.userFollowlist.filter((data) => data._id === _id);

  const handleFollowUnfollw = async (id, checkStatus) => {
    try {
      const response = await axios.post(
        checkStatus === "follow" ? `/api/users/follow/${id}` : `/api/users/unfollow/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );

      if (response.status === 200) {
        //   getAllPost(response.data.posts[response.data.posts.length - 1].username);
        console.log("Final list", response);
        setMainstate({
          ...mainstate,
          userFollowlist: response.data.user.following,
          loggedUser: response.data.user,
        });
        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content:
            checkStatus === "follow"
              ? "Now you are following to " +
                response.data.followUser.firstName +
                response.data.followUser.lastName
              : "You are unfollowing to " +
                response.data.followUser.firstName +
                " " +
                response.data.followUser.lastName,
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
    <MDBox key={_id}>
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
          <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
            {firstName} {lastName}
            <br />
            <small style={{ color: "#a09699" }}>@{username}</small>
          </MDTypography>
          {/* 
          {firstName} {lastName}
          <br />
          <small style={{ color: "#a09699" }}>@{username}</small> */}
        </Grid>
        <Grid item md={4}>
          {ifFollow.length > 0 ? (
            <MDButton
              pt={5}
              variant="contained"
              color="info"
              onClick={() => handleFollowUnfollw(_id, "Unfollow")}
            >
              Unfollow{" "}
            </MDButton>
          ) : (
            <MDButton
              pt={5}
              variant="outlined"
              color="info"
              onClick={() => handleFollowUnfollw(_id, "follow")}
            >
              + Follow{" "}
            </MDButton>
          )}
        </Grid>
      </Grid>
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
    </MDBox>
  );
};

FollowPost.propTypes = {
  followData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default FollowPost;
