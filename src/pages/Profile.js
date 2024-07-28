import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../auth/context/UserContext";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormLabel } from "react-bootstrap";
// import { FormLabel } from "@mui/material";
import laptop from "../assets/images/laptop.jpg";
// import Raju from "../assets/images/Raju.jpg";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { Api_url } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
const Profile = ({ fetchUser }) => {
  const navigate = useNavigate();
  const msg = new SpeechSynthesisUtterance();
  msg.text = "welcome";
  const [speechText, setSpeechText] = useState("Initial");
  const user = useContext(UserContext);
  console.log("@@user", user);
  const [name, setName] = useState(user.name);

  const [nameFieldSwitch, setNameFieldSwitch] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { speak } = useSpeechSynthesis();
  // for (let key in userDetails) {
  //   console.log("key", key);
  // }
  useEffect(() => {
    console.log("useEffect called");
    // window.speechSynthesis.speak(msg);
    speak({ text: speechText });
    console.log("useEffect ended");
  }, [speechText]);
  // useEffect(() => {
  //   window.speechSynthesis.speak(msg);
  //   // setSpeechText("test");
  // }, [msg]);

  async function fetchUserDetails() {
    const url = Api_url + "/user-details/getDetails";
    const userIdObj = { userId: user.user_id };
    await axios
      .post(url, userIdObj)
      .then((res) => {
        console.log("@@res.data", res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    // abc.call(user);
    fetchUserDetails();
  }, [user]);
  return (
    <div
      style={{
        // backgroundImage: `url(${laptop})`,
        // backgroundSize: "cover",
        color: "black",
        width: "100%",
        height: "80vh",
        padding: "20px",
      }}
    >
      <h3>
        {console.log("userDetails", [userDetails])}
        <center>This is Profile Page</center>
      </h3>
      <Grid container rowSpacing={2} columnSpacing={2} xs={12} md={6} lg={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid
            container
            component={FormControl}
            required
            style={{
              display: "flex",
              jsutifyContent: "center",
            }}
          >
            <Grid item xs={4} component="b">
              <FormLabel>Name </FormLabel>
            </Grid>
            <Grid item xs={1} component="b">
              <FormLabel> :</FormLabel>
            </Grid>
            <Grid item xs={7}>
              <FormLabel>
                {user.name}
                {/* <Button sx={{ mx: 2 }} variant="outlined" onClick={() => {}}>
                  Edit
                </Button> */}
                {nameFieldSwitch && (
                  <Input
                    sx={{ ml: 2, color: "black", width: "50%" }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    // label="Message"
                    placeholder="Enter name"
                  />
                )}
                {!nameFieldSwitch && (
                  <IconButton
                    color="primary"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setNameFieldSwitch(true);
                    }}
                  >
                    <ModeEditOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                )}
                {nameFieldSwitch && (
                  <IconButton
                    color="primary"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      if (name.length > 2) {
                        setNameFieldSwitch(false);
                        const url = Api_url + "/user/update";
                        axios
                          .patch(url, { _id: user.user_id, name: name })
                          .then((res) => {
                            setNameFieldSwitch(false);
                            console.log("@@first", { ...user, name: name });

                            localStorage.setItem(
                              "user",
                              JSON.stringify({ ...user, name: name })
                            );
                            fetchUser();
                          })
                          .catch((err) => {
                            // setNameFieldSwitch(false);
                            console.log("err", err);
                          });
                      } else {
                        console.log("Name sholud be minimum of 3 charectors");
                      }
                    }}
                  >
                    <CheckIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                )}
              </FormLabel>
            </Grid>
          </Grid>
        </Grid>
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
              <FormLabel>Email</FormLabel>
            </Grid>
            <Grid item xs={1} component="b">
              <FormLabel> :</FormLabel>
            </Grid>
            <Grid item xs={7}>
              <FormLabel>{user.email}</FormLabel>
            </Grid>
          </Grid>
        </Grid>
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
              <FormLabel>Number</FormLabel>
            </Grid>
            <Grid item xs={1} component="b">
              <FormLabel> :</FormLabel>
            </Grid>
            <Grid item xs={7}>
              <FormLabel>{user.number}</FormLabel>
            </Grid>
          </Grid>
        </Grid>

        {Object.keys(userDetails).map((keyName, index) => {
          return (
            // <div>
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
                  <FormLabel>{keyName}</FormLabel>
                </Grid>
                <Grid item xs={1} component="b">
                  <FormLabel> :</FormLabel>
                </Grid>
                <Grid item xs={7}>
                  <FormLabel>{userDetails[keyName]}</FormLabel>
                </Grid>
              </Grid>
            </Grid>
            // </div>
          );
        })}
        {/* <Grid item xs={12} sm={12} lg={12}>
          <Grid
            component={FormControl}
            required
            container
            style={{
              display: "flex",
              jsutifyContent: "center",
            }}
          >
            <Grid item xs={3} component="b">
              <FormLabel>Father</FormLabel>
            </Grid>
            <Grid item xs={1} component="b">
              <FormLabel> :</FormLabel>
            </Grid>
            <Grid item xs={8}>
              <FormLabel>{userDetails.father}</FormLabel>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {/* <Button type="submit" variant="outlined" sx={{ mr: 2 }}>
          Edit
        </Button> */}
        <Button
          type="text"
          variant="outlined"
          onClick={() => {
            navigate("/detailsForm");
            // setToggle(false);
          }}
        >
          Update your Details
        </Button>
      </Grid>

      {/* // useContext and Text to speech code */}
      {/* <div>
        <div>
          <pre>Context: {JSON.stringify(user, null, 2)}</pre>
        </div>
        <button
          // onMouseOver={() =>
          //   speak({
          //     text: "your heartly invited to the wedding of Rom and sitha",
          //   })
          // }
          onMouseEnter={() =>
            // window.speechSynthesis.speak(msg);

            speak({
              // text: "your heartly invited to the wedding of Rom and sitha",
              text: "Hai Rajju Wellcome to profile page",
            })
          }
          onClick={
            () =>
              speak({
                text: "your heartly invited to the wedding of Rom and sitha",
              })
            // setSpeechText("najja bhaga jajara")
          }
        >
          Hover to Speech
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
