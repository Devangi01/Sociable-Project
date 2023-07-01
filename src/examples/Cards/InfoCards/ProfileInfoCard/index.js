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

// react-routers components
import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import MDInput from "components/MDInput";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import burceMars from "assets/images/bruce-mars.jpg";
import { MainContext } from "context";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProfileInfoCard({ title, description, info, social, action, shadow }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { mainstate, setMainstate } = useContext(MainContext);
  const encodedToken = localStorage.getItem("token");
  const [editUser, setEditUser] = useState({
    firstName: "",
    bio: "",
    lastName: "",
    email: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  const handleEditProfile = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setEditUser({ ...editUser, [event.target.name]: event.target.value });
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `/api/users/edit`,
        {
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          bio: editUser.bio,
          email: editUser.email,
        },
        {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        }
      );
      debugger;
      console.log("editprofile", response);
      if (response.status === 201) {
        // alert("Update");
        setMainstate({ ...mainstate, loggedUser: response.data.user });
        // getAllPost(response.data.posts[response.data.posts.length - 1].username);
        // setNotification({
        //   color: "success",
        //   icon: "check",
        //   title: response.status + " " + response.statusText,
        //   content: "Post Created Successful!",
        // });
        // setOpen(true);
      }
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
  const handleAvatarClick = () => {
    // Trigger the hidden file input element
    fileInputRef.current.click();
  };
  const fileInputRef = useRef(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      debugger;
      console.log(file);

      reader.readAsDataURL(file);
    }
  };
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon onClick={handleEditProfile}>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox>
        </MDBox>
      </MDBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ borderRadius: "100px" }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Avtar
              </MDTypography>
            </Grid>
            <Grid item xs={8} sx={{ position: "relative" }}>
              <MDAvatar
                src={previewImage}
                onClick={handleAvatarClick}
                alt="profile-image"
                size="xl"
                shadow="sm"
              />

              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <MDInput
                type="text"
                name="firstName"
                label="First Name"
                value={editUser.firstName}
                onChange={(event) => handleChange(event)}
                fullWidth
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <MDInput
                type="text"
                name="lastName"
                label="Last Name"
                value={editUser.lastName}
                onChange={(event) => handleChange(event)}
                fullWidth
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <MDInput
                type="text"
                name="bio"
                label="Bio"
                value={editUser.bio}
                onChange={(event) => handleChange(event)}
                fullWidth
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <MDInput
                type="text"
                name="email"
                label="Email"
                value={editUser.email}
                onChange={(event) => handleChange(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                style={{ color: "white" }}
                onClick={() => handleClick()}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
