import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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
import { MainContext } from "context";
import Typography from "@mui/material/Typography";

const PostCard = (props) => {
  const { mainstate, setMainstate } = useContext(MainContext);
  const [open, setOpen] = useState(false);
  const closeSuccessSB = () => setOpen(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [notification, setNotification] = useState({
    color: "",
    icon: "",
    title: "",
    content: "",
  });

  const { _id, content, likes, firstName, lastName, createdAt, updatedAt, username, image } =
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

  const handlePostLikeClick = async (id, checkStatus) => {
    try {
      const response = await axios.post(
        checkStatus === "like" ? `/api/posts/like/${id}` : `/api/posts/dislike/${id}`,
        {},
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );
      if (response.status === 201) {
        props.getAllUserPost();
        // getAllUserPost();
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

  const handleDeletePost = async (checkStatus) => {
    try {
      const response = await axios.delete(`api/posts/${_id}`, {
        headers: {
          authorization: encodedToken, // passing token as an authorization header
        },
      });
      if (response.status === 201) {
        props.getAllUserPost();
        setNotification({
          color: "success",
          icon: "check",
          title: response.status + " " + response.statusText,
          content: "Delete Post Successful!",
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

  const handleEditPost = async (checkStatus) => {
    props.setDataForEditPost(_id, content, image);
  };

  const checkISLiked =
    likes.likedBy.filter((data) => data.username === mainstate.loggedUser.username).length > 0;

  var binaryData = [];
  binaryData.push(image);

  return (
    <MDBox key={_id} style={{ backgroundColor: "white", borderRadius: "10px" }} mb={3} p={2}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <MDBox mr={2}>
            <MDAvatar src={mainstate.loggedUser.image} alt="something here" shadow="md" />
          </MDBox>
        </Grid>

        <Grid item xs={11}>
          <Grid container spacing={1} style={{ display: "flex", flexDirection: "column" }}>
            <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
              <MDTypography>
                {firstName} {lastName}&nbsp;
                <small style={{ color: "#a09699" }}>@{username}</small>
              </MDTypography>
              {props.pageName === "home" && (
                <MDTypography>
                  <DriveFileRenameOutlineIcon
                    style={{ cursor: "pointer", border: "1px solid #000", fontSize: "large" }}
                    onClick={() => handleEditPost("edit")}
                  />{" "}
                  <DeleteOutlineIcon
                    onClick={() => handleDeletePost("delete")}
                    style={{ cursor: "pointer", border: "1px solid #000", fontSize: "large" }}
                  />{" "}
                </MDTypography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="overline" display="block" gutterBottom>
                {content}
              </Typography>
            </Grid>
            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              {image && (
                <img src={image} alt="Selected" style={{ width: "400px", height: "auto" }} />
              )}
            </Grid>

            <Grid item style={{ width: "100%" }}>
              <Grid container spacing={1}>
                <Grid style={{ textAlign: "left", display: "flex", flexWrap: "wrap" }} item md={3}>
                  {checkISLiked ? (
                    <FavoriteIcon
                      fontSize="medium"
                      style={{ cursor: "pointer", color: "#ed3939" }}
                      onClick={() => handlePostLikeClick(_id, "unlike")}
                    ></FavoriteIcon>
                  ) : (
                    <FavoriteBorderIcon
                      fontSize="medium"
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePostLikeClick(_id, "like")}
                    ></FavoriteBorderIcon>
                  )}
                  <span style={{ fontSize: "15px", marginLeft: "7px" }}>{likes.likeCount}</span>
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
    image: PropTypes.string.isRequired,
  }).isRequired,

  getAllUserPost: PropTypes.func,
  setDataForEditPost: PropTypes.func,
  pageName: PropTypes.string,
};
export default PostCard;
