import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import Box from "@mui/material/Box";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

import team1 from "assets/images/team-1.jpg";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

const PostCard = (props) => {
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);
  const [isBookMarked, setIsBookMarked] = useState(false);

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const { _id, content, likes, username, firstName, lastName, createdAt, updatedAt } =
    props.cardData;

  const encodedToken = localStorage.getItem("token");

  const getAllBookMarks = async () => {
    try {
      const response = await axios.get(`api/users/bookmark`, {
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
      });

      const bookmarkData = response.data.bookmarks.filter((data) => data._id === _id);
      if (bookmarkData.length > 0) {
        setIsBookMarked(true);
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

  const handleBookMarksClick = (id) => {
    isBookMarked ? removeToBookmark(id) : addToBookmark(id);

    //   getAllBookMarks();
  };

  const removeToBookmark = async (id) => {
    try {
      const response = await axios.post(
        `api/users/remove-bookmark/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );

      if (response.status === 200) {
        setIsBookMarked(false);
        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content: "Removes From Bookmarks Successful!",
        });
        setOpen(true);
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

  const addToBookmark = async (id) => {
    try {
      const response = await axios.post(
        `api/users/bookmark/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );

      if (response.status === 200) {
        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content: "Added To Bookmarks Successful!",
        });
        setOpen(true);
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

  return (
    <MDBox key={_id} style={{ backgroundColor: "white", borderRadius: "10px" }} mb={3} p={2}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <MDBox mr={2}>
            <MDAvatar src={team1} alt="something here" shadow="md" />
          </MDBox>
        </Grid>

        <Grid item xs={11}>
          <Grid container spacing={1} style={{ display: "flex", flexDirection: "column" }}>
            <Grid item>
              <MDTypography>
                {firstName} {lastName}&nbsp;
                <small style={{ color: "#a09699" }}>@{username}</small>
              </MDTypography>
            </Grid>
            <Grid item>
              <MDInput
                type="text"
                name="description"
                multiline
                rows={3}
                fullWidth
                value={content}
                disabled
                //  onChange={(event) => setPostContent(event.target.value)}
              />
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <Grid container spacing={1}>
                <Grid style={{ textAlign: "left" }} item md={3}>
                  <FavoriteBorderIcon fontSize="medium"></FavoriteBorderIcon>
                </Grid>
                <Grid style={{ textAlign: "center" }} item md={3}>
                  <ShareIcon fontSize="medium"></ShareIcon>
                </Grid>
                <Grid style={{ textAlign: "center" }} item md={3}>
                  <ChatBubbleOutlineIcon fontSize="medium"></ChatBubbleOutlineIcon>
                </Grid>
                <Grid style={{ textAlign: "right" }} item md={3}>
                  {isBookMarked ? (
                    <BookmarkIcon
                      onClick={() => handleBookMarksClick(_id)}
                      fontSize="medium"
                    ></BookmarkIcon>
                  ) : (
                    <BookmarkBorderIcon
                      onClick={() => handleBookMarksClick(_id)}
                      fontSize="medium"
                    ></BookmarkBorderIcon>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
PostCard.propTypes = {
  cardData: PropTypes.shape({
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
export default PostCard;
