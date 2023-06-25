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
import React, { useState } from "react";
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
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import burceMars from "assets/images/bruce-mars.jpg";
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

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
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
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Avtar</Typography>
            </Grid>
            <Grid item xs={8} sx={{ position: "relative" }}>
              <MDAvatar
                src={burceMars}
                alt="profile-image"
                size="xl"
                shadow="sm"
                sx={{ cursor: "pointer" }}
              >
                <input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="avatar-upload"
                  style={{ position: "absolute", bottom: "0", right: "0" }}
                >
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                  <PhotoCamera />
                </label>
              </MDAvatar>
            </Grid>

            <Grid item xs={4}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Devangi</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>UserName</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>username</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Bio</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Devangi</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Website</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Devangi</Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button variant="contained" style={{ color: "white" }}>
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
