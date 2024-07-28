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

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const [step1, setStep1] = useState(true);
  const [otp, setOtp] = useState();
  const [enteredOtp, setEnteredOtp] = useState();
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const email = useRef();
  // const password = useRef();
  const [open, setOpen] = React.useState(false); //snakbar trigger state
  const [errMsg, setErrMsg] = React.useState();

  const navigate = useNavigate();

  const sendOtpHandler = (email) => {
    console.log("email", email);
    const url = "http://localhost:4000/api/v1/user/forgot";
    axios
      .post(url, { email: email })
      .then((res) => {
        const { email, otp } = res.data;
        console.log("email, otp", email, otp);
        setOtp(otp);
        setStep1(false);
        setStep2(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const verifyOtpHandler = (enteredOtp) => {
    if (enteredOtp === otp) {
      console.log("otps verified");
      setStep2(false);
      setStep3(true);
    } else {
      console.log("otp not matched");
    }
  };

  const resetSubmitHandler = () => {
    if (newPassword === confirmPassword) {
      const url = "http://localhost:4000/api/v1/user/reset-password";
      axios
        .post(url, { email: email, password: newPassword })
        .then((res) => {
          console.log("res.data", res.data);
          console.log("Password updated successfully");
          navigate("/login");
        })
        .catch((err) => {
          console.log("err", err);
        });
      console.log("passwords matched");
    } else {
      console.log("passwords not matched");
    }
  };

  //   function loginHandler(e) {
  //     e.preventDefault();
  //     const url = "http://localhost:4000/api/v1/user/login";

  //     const body = {
  //       email: email,
  //     //   password: password,
  //     };
  //     // console.log("@@data", body);
  //     axios
  //       .post(url, body)
  //       .then((res) => {
  //         // console.log("@@login user response", res.data);
  //         localStorage.setItem("user", JSON.stringify(res.data));
  //         // fetchUser();
  //         // navigate("/");
  //         // window.location.reload();
  //       })
  //       .catch((err) => {
  //         setErrMsg(err.response.data);
  //         setOpen(true);

  //         // console.log("Error message: ", err.response.data);
  //       });
  //   }

  // snakbar close function
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
          //   onSubmit={loginHandler}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* // step 01 */}
          {step1 && (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item>Reset password</Grid>
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
                  placeholder="Enter your email address"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => sendOtpHandler(email)}
                >
                  Send OTP
                </Button>
              </Grid>
            </Grid>
          )}
          {/* // step 02 */}
          {step2 && (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item>Enter OTP</Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {/* <FormLabel>Email : </FormLabel> */}
                <TextField
                  // ref={email}
                  onChange={(e) => {
                    setEnteredOtp(e.target.value);
                  }}
                  name="enteredOtp"
                  label="OTP"
                  placeholder="Enter OTP shared on mail"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => verifyOtpHandler(enteredOtp)}
                >
                  Verify
                </Button>
              </Grid>
            </Grid>
          )}
          {/* // step 03 */}
          {step3 && (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item>Create new Password</Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {/* <FormLabel>Email : </FormLabel> */}
                <TextField
                  // ref={email}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  name="newPassword"
                  label="new password"
                  placeholder="Enter new password"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {/* <FormLabel>Email : </FormLabel> */}
                <TextField
                  // ref={email}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={resetSubmitHandler}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
      {/* <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default ForgetPassword;
