// marrital status and Education
import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Api_url } from "../utils/Constants";
import { UserContext } from "../auth/context/UserContext";

const DatailsForm = () => {
  const user = useContext(UserContext);
  const [body, setBody] = useState({
    mother: "",
    father: "",
    surName: "",
    spouse: "",
    childs: "",
    siblings: "",
    familyDetails: "",
    caste: "",
    subCaste: "",
    dateOfBirth: "",
    houseNumber: "",
    village: "",
    mandal: "",
    district: "",
    state: "",
    contry: "",
    pincode: "",
    education: "",
    occupation: "",
    occupationDetails: "",
    anyOtherDetails: "",
  });
  const [gender, setGender] = useState("none");
  const [maritalStatus, setMaritalStatus] = useState("married");

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    const url = Api_url + "/user-details";
    axios
      .post(url, {
        ...body,
        gender: gender,
        maritalStatus: maritalStatus,
        name: user.name,
        email: user.email,
        number: user.number,
        userId: user.user_id,
      })
      .then((res) => {
        console.log("res.data", res.data);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  function fieldHandler(e) {
    return setBody({ ...body, [e.target.name]: e.target.value });
  }
  async function abc() {
    const url = Api_url + "/user-details/getDetails";
    const userIdObj = { userId: user.user_id };
    await axios
      .post(url, userIdObj)
      .then((res) => {
        console.log("@@res.data", res.data);
        setBody(res.data);
        setGender(res.data.gender);
        setMaritalStatus(res.data.maritalStatus);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    // abc.call(user);
    abc();
  }, [user]);
  return (
    // <div className="mt-5">
    <form onSubmit={submitHandler}>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          // xs={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item>Details entry form</Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="mother"
              value={body?.mother}
              label="Mother"
              placeholder="Enter mother name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="father"
              value={body?.father}
              label="Father"
              placeholder="Enter father name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                defaultValue=""
                sx={{ width: "224px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                placeholder="select your gender"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Marital status
              </InputLabel>
              <Select
                defaultValue=""
                sx={{ width: "224px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maritalStatus}
                label="marital status"
                onChange={(e) => {
                  setMaritalStatus(e.target.value);
                }}
                placeholder="select marital status"
              >
                <MenuItem value="unmarried">Unmarried</MenuItem>
                <MenuItem value="married">Married</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {maritalStatus === "married" && (
            <>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  onChange={fieldHandler}
                  name="spouse"
                  value={body?.spouse}
                  label="Spouse"
                  placeholder="Enter spouse name"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  onChange={fieldHandler}
                  name="childs"
                  value={body?.childs}
                  label="Childs"
                  placeholder="Enter childs names"
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="surName"
              value={body?.surName}
              label="Surname of family"
              placeholder="Enter surname name of family"
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="siblings"
              value={body?.siblings}
              label="Siblings"
              placeholder="Enter siblings details"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="Family details"
              value={body?.familyDetails}
              label="Family details"
              placeholder="Enter family details"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="caste"
              value={body?.caste}
              label="Caste"
              placeholder="Enter caste"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="subCaste"
              value={body?.subCaste}
              label="Sub caste"
              placeholder="Enter sub caste"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="dateOfBirth"
              value={body?.dateOfBirth}
              label="Date of birth"
              placeholder="Enter date of birth"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="houseNumber"
              value={body?.houseNumber}
              label="House number"
              placeholder="Enter house number"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="village"
              value={body?.village}
              label="Village"
              placeholder="Enter village name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="mandal"
              value={body?.mandal}
              label="Mandal"
              placeholder="Enter mandal name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="district"
              value={body?.district}
              label="District"
              placeholder="Enter district name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="state"
              value={body?.state}
              label="State"
              placeholder="Enter state name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="contry"
              value={body?.contry}
              label="Contry"
              placeholder="Enter contry name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="pincode"
              value={body?.pincode}
              label="Pin code"
              placeholder="Enter pin code"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="education"
              value={body?.education}
              label="Education details"
              placeholder="Enter educational details"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="occupation"
              value={body?.occupation}
              label="Occupation"
              placeholder="Enter your occupation"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="occupationDetails"
              value={body?.occupationDetails}
              label="Occupation details"
              placeholder="Enter your occupation details"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={fieldHandler}
              name="anyOtherDetails"
              value={body?.anyOtherDetails}
              label="Any other details"
              placeholder="Enter Any other details"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ marginRight: "15px" }}
            >
              Go Back
            </Button>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
    // </div>
  );
};

export default DatailsForm;
