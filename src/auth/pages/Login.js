// small cased email only
import {
  Button,
  Grid,
  TextField,
  Box,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ fetchUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const email = useRef();
  // const password = useRef();
  const [open, setOpen] = React.useState(false); //snakbar trigger state
  const [errMsg, setErrMsg] = React.useState();

  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/v1/user/login";

    const body = {
      email: email,
      password: password,
    };
    // console.log("@@data", body);
    axios
      .post(url, body)
      .then((res) => {
        // console.log("@@login user response", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        fetchUser();
        navigate("/");
        // window.location.reload();
      })
      .catch((err) => {
        setErrMsg(err.response.data);
        setOpen(true);

        // console.log("Error message: ", err.response.data);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="mt-5">
      <Box sx={{ flexGrow: 1 }}>
        <form
          onSubmit={loginHandler}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item>Login page</Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {/* <FormLabel>Email : </FormLabel> */}
              <TextField
                // ref={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                label="Email"
                placeholder="Enter email"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                // ref={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // type="password"
                name="password"
                label="Password"
                placeholder="Enter password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Grid item>
                <Typography>
                  Forget Password..?
                  <Button variant="outLined">
                    <Link to="/forgot">Reset Password</Link>
                  </Button>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Need an Account..?
                  <Button variant="outLined">
                    <Link to="/register">Sign up</Link>
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {errMsg}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Login;
