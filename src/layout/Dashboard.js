import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  Button,
  Drawer,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Paper,
  Snackbar,
  Grid,
  // FormLabel,
  FormControl,
} from "@mui/material";

import { FormLabel } from "react-bootstrap";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

import MenuIcon from "@mui/icons-material/Menu";
// import InboxIcon from "@mui/icons-material/Inbox";
// import DraftsIcon from "@mui/icons-material/Drafts";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "./Footer";
import MuiAlert from "@mui/material/Alert";

import axios from "axios";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SideDrawer from "./SideDrawer";
import TopNavButtons from "./TopNavButtons";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Dashboard = ({ fetchUser, user }) => {
  // console.log("@@@user", user);
  const [open, setOpen] = React.useState(true); // login successfull snakbar default true

  const [drawerOpen, setDrawerOpen] = useState(false); // Right drawer
  const [profileDrawer, setProfileDrawer] = useState(false); // left Drawer
  const [logoutDialogBox, setLogoutDialogBox] = useState(false);
  const [avatar, setAvatar] = useState();

  const [avatarSrc, setAvatarSrc] = useState();
  const [anchorElUser, setAnchorElUser] = useState(false);
  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  useEffect(() => {
    fetchUser();
    // setOpen(true);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // function addDetailsHandler() {
  //   handleCloseUserMenu();

  // }
  async function logoutHandler() {
    await axios
      .delete("http://localhost:4000/api/v1/user/logout")
      .then((res) => {
        console.log("res.data", res.data);
      });
    localStorage.removeItem("user");
    // Bellow 2 lines no need when application reloads
    fetchUser();
    // bellow line is optional even
    navigate("/login");
    window.location.reload(); //reload way
  }

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // useEffect(() => {
  //   if (!user.email) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    function arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    }
    axios
      .get(`http://localhost:4000/api/v1/user/profile-pic?email=${user.email}`)
      .then((res) => {
        console.log("res.data", res.data);
        const ImageBufferArray = res.data.avatar.data;
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = arrayBufferToBase64(ImageBufferArray);
        const imgSrc = base64Flag + imageStr;
        setAvatarSrc(imgSrc);
        // setProfileData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div>
        <center>Welcome to our Website</center>
      </div>

      {/* // Top AppBar or NavBar // */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Button variant="outlined" onClick={() => navigate("/")}> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2, cursor: "pointer", border: "2px solid red" }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          <Box sx={{ mr: 2 }}>
            <Search sx={{ flexGrow: 2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          {/* <TopNavButtons /> */}
          {/* </Button> */}
          {/* // Dummy for nav buttons slide */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onMouseEnter={handleOpenUserMenu}
              // onMouseLeave={handleCloseUserMenu}
              sx={{ p: 0 }}
            >
              <Typography color={"white"} style={{ marginRight: "12px" }}>
                <i>{user.name}</i>
              </Typography>
              <Tooltip title={user.name}>
                {/* <Avatar alt="Raju" src={"/assets/images/Raju.jpg"} /> */}
                {/* <Avatar alt="Raju" src={"/assets/images/Raju.jpg"} /> */}
                <Avatar alt="Raju" src={avatarSrc || ""} />
              </Tooltip>
            </IconButton>

            {/* // Menu // */}
            <Menu
              sx={{ mt: "60px" }}
              // id="menu-appbar"
              anchorEl={anchorElUser}
              keepMounted
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Button
                  variant="contained"
                  onClick={() => {
                    setProfileDrawer(true);
                    handleCloseUserMenu();
                    navigate("/profile");
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setLogoutDialogBox(true);
                    handleCloseUserMenu();
                    // logoutHandler();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* // Left Drawer // */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        {/* <Paper> */}
        <Box width="250px" p={2}>
          <IconButton
            style={{
              marginLeft: "180px",

              marginRight: "auto",
            }}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Divider color="inherit" />
          <SideDrawer />
        </Box>
        {/* </Paper> */}
      </Drawer>

      {/* // Right Drawer // */}

      <Drawer
        anchor="right"
        open={profileDrawer}
        onClose={() => {
          setProfileDrawer(false);
        }}
      >
        <Box width="320px" p={2}>
          <Paper>
            <Box height="90vh" sx={{ p: 1 }}>
              <IconButton
                style={{
                  marginRight: "auto",
                }}
                onClick={() => {
                  setProfileDrawer(false);
                }}
              >
                <ChevronRightIcon />
              </IconButton>
              My Profile
              <Divider color="inherit" />
              {/* <div>Profile</div> */}
              <div>
                <span>Hey your Logged in</span>
              </div>
              <div>
                {/* <span>Hey your Logged in</span> */}
                <Grid item xs={12} sm={12} lg={12}>
                  <Grid
                    component={FormControl}
                    required
                    container
                    style={{
                      display: "flex",
                      jsutifyContent: "center",
                    }}
                  >
                    <Grid item xs={4} component="b">
                      <FormLabel>Profile Picture</FormLabel>
                    </Grid>
                    <Grid item xs={1} component="b">
                      <FormLabel> :</FormLabel>
                    </Grid>
                    <Grid item xs={7} component="b">
                      {/* <Avatar src="/assets/images/Raju.jpg" alt="Raju" /> */}
                      <Avatar alt="Raju" src={avatarSrc || ""} />
                      <input
                        type="file"
                        onChange={(e) => {
                          setAvatar(e.target.files[0]);
                        }}
                      />
                      {avatar && (
                        <img
                          src={URL.createObjectURL(avatar) || ""}
                          alt="profile pic loading.."
                          width="200px"
                        />
                      )}
                      <button
                        onClick={() => {
                          var userFormData = new FormData();
                          userFormData.append("avatar", avatar);
                          userFormData.append("email", user.email);
                          console.log("@@userFormData", userFormData);
                          axios
                            .post(
                              "http://localhost:4000/api/v1/user/profile-pic",
                              userFormData
                            )
                            .then((res) => {
                              console.log("res.data", res.data);
                              const arrayBufferToBase64 = (buffer) => {
                                var binary = "";
                                var bytes = [].slice.call(
                                  new Uint8Array(buffer)
                                );
                                bytes.forEach(
                                  (b) => (binary += String.fromCharCode(b))
                                );
                                return window.btoa(binary);
                              };
                              axios
                                .get(
                                  `http://localhost:4000/api/v1/user/profile-pic?email=${user.email}`
                                )
                                .then((res) => {
                                  console.log("res.data", res.data);
                                  const ImageBufferArray = res.data.avatar.data;
                                  var base64Flag = "data:image/jpeg;base64,";
                                  var imageStr =
                                    arrayBufferToBase64(ImageBufferArray);
                                  const imgSrc = base64Flag + imageStr;
                                  setAvatarSrc(imgSrc);
                                  // setProfileData(res.data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            })
                            .catch((err) => console.error(err));
                        }}
                      >
                        Update
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div>Name : {user.name}</div>
              <div>Email : {user.email}</div>
              <div>Number : {user.number}</div>
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setProfileDrawer(false);
                    navigate("/detailsEntryForm");
                  }}
                >
                  Add your Details
                </Button>
              </div>
              <div style={{ margin: "12px 0px" }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setProfileDrawer(false);
                    navigate("/posts");
                  }}
                >
                  Posts
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setLogoutDialogBox(true);
                    setProfileDrawer(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            </Box>
          </Paper>
        </Box>
      </Drawer>
      <div>
        <Dialog
          // open={true}
          open={logoutDialogBox}
          onClose={() => {
            setLogoutDialogBox(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure to Logout..?
          </DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button
              variant="outlined"
              // sx={{ backgroundColor: "red" }}
              color="success"
              onClick={() => {
                setLogoutDialogBox(false);
              }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={logoutHandler}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Outlet />
      <Footer />
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Succesfully Logged in
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
