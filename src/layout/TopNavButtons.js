import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const TopNavButtons = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{ mr: 2, cursor: "pointer", border: "2px solid red" }}
        onClick={() => navigate("/Option1")}
      >
        Option 01
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ mr: 2, cursor: "pointer", border: "2px solid red" }}
        onClick={() => navigate("/Option2")}
      >
        Option 02
      </Typography>
    </>
  );
};

export default TopNavButtons;
