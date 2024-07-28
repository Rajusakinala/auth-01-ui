import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FormLabel } from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contry, setContry] = useState({
    label: "India",
    shortCode: "IN",
    value: "+91",
  });
  // const [contry, setContry] = useState([]);
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirnPassword] = useState();
  const navigate = useNavigate();

  const contryDialCodes = [
    {
      label: "Afghanistan",
      value: "+93",
      shortCode: "AF",
    },
    {
      label: "Aland Islands",
      value: "+358",
      shortCode: "AX",
    },
    {
      label: "Albania",
      value: "+355",
      shortCode: "AL",
    },
    {
      label: "Algeria",
      value: "+213",
      shortCode: "DZ",
    },
    {
      label: "AmericanSamoa",
      value: "+1684",
      shortCode: "AS",
    },
    {
      label: "Andorra",
      value: "+376",
      shortCode: "AD",
    },
    {
      label: "Angola",
      value: "+244",
      shortCode: "AO",
    },
    {
      label: "Anguilla",
      value: "+1264",
      shortCode: "AI",
    },
    {
      label: "Antarctica",
      value: "+672",
      shortCode: "AQ",
    },
    {
      label: "Antigua and Barbuda",
      value: "+1268",
      shortCode: "AG",
    },
    {
      label: "Argentina",
      value: "+54",
      shortCode: "AR",
    },
    {
      label: "Armenia",
      value: "+374",
      shortCode: "AM",
    },
    {
      label: "Aruba",
      value: "+297",
      shortCode: "AW",
    },
    {
      label: "Australia",
      value: "+61",
      shortCode: "AU",
    },
    {
      label: "Austria",
      value: "+43",
      shortCode: "AT",
    },
    {
      label: "Azerbaijan",
      value: "+994",
      shortCode: "AZ",
    },
    {
      label: "Bahamas",
      value: "+1242",
      shortCode: "BS",
    },
    {
      label: "Bahrain",
      value: "+973",
      shortCode: "BH",
    },
    {
      label: "Bangladesh",
      value: "+880",
      shortCode: "BD",
    },
    {
      label: "Barbados",
      value: "+1246",
      shortCode: "BB",
    },
    {
      label: "Belarus",
      value: "+375",
      shortCode: "BY",
    },
    {
      label: "Belgium",
      value: "+32",
      shortCode: "BE",
    },
    {
      label: "Belize",
      value: "+501",
      shortCode: "BZ",
    },
    {
      label: "Benin",
      value: "+229",
      shortCode: "BJ",
    },
    {
      label: "Bermuda",
      value: "+1441",
      shortCode: "BM",
    },
    {
      label: "Bhutan",
      value: "+975",
      shortCode: "BT",
    },
    {
      label: "Bolivia, Plurinational State of",
      value: "+591",
      shortCode: "BO",
    },
    {
      label: "Bosnia and Herzegovina",
      value: "+387",
      shortCode: "BA",
    },
    {
      label: "Botswana",
      value: "+267",
      shortCode: "BW",
    },
    {
      label: "Brazil",
      value: "+55",
      shortCode: "BR",
    },
    {
      label: "British Indian Ocean Territory",
      value: "+246",
      shortCode: "IO",
    },
    {
      label: "Brunei Darussalam",
      value: "+673",
      shortCode: "BN",
    },
    {
      label: "Bulgaria",
      value: "+359",
      shortCode: "BG",
    },
    {
      label: "Burkina Faso",
      value: "+226",
      shortCode: "BF",
    },
    {
      label: "Burundi",
      value: "+257",
      shortCode: "BI",
    },
    {
      label: "Cambodia",
      value: "+855",
      shortCode: "KH",
    },
    {
      label: "Cameroon",
      value: "+237",
      shortCode: "CM",
    },
    {
      label: "Canada",
      value: "+1",
      shortCode: "CA",
    },
    {
      label: "Cape Verde",
      value: "+238",
      shortCode: "CV",
    },
    {
      label: "Cayman Islands",
      value: "+ 345",
      shortCode: "KY",
    },
    {
      label: "Central African Republic",
      value: "+236",
      shortCode: "CF",
    },
    {
      label: "Chad",
      value: "+235",
      shortCode: "TD",
    },
    {
      label: "Chile",
      value: "+56",
      shortCode: "CL",
    },
    {
      label: "China",
      value: "+86",
      shortCode: "CN",
    },
    {
      label: "Christmas Island",
      value: "+61",
      shortCode: "CX",
    },
    {
      label: "Cocos (Keeling) Islands",
      value: "+61",
      shortCode: "CC",
    },
    {
      label: "Colombia",
      value: "+57",
      shortCode: "CO",
    },
    {
      label: "Comoros",
      value: "+269",
      shortCode: "KM",
    },
    {
      label: "Congo",
      value: "+242",
      shortCode: "CG",
    },
    {
      label: "Congo, The Democratic Republic of the Congo",
      value: "+243",
      shortCode: "CD",
    },
    {
      label: "Cook Islands",
      value: "+682",
      shortCode: "CK",
    },
    {
      label: "Costa Rica",
      value: "+506",
      shortCode: "CR",
    },
    {
      label: "Cote d'Ivoire",
      value: "+225",
      shortCode: "CI",
    },
    {
      label: "Croatia",
      value: "+385",
      shortCode: "HR",
    },
    {
      label: "Cuba",
      value: "+53",
      shortCode: "CU",
    },
    {
      label: "Cyprus",
      value: "+357",
      shortCode: "CY",
    },
    {
      label: "Czech Republic",
      value: "+420",
      shortCode: "CZ",
    },
    {
      label: "Denmark",
      value: "+45",
      shortCode: "DK",
    },
    {
      label: "Djibouti",
      value: "+253",
      shortCode: "DJ",
    },
    {
      label: "Dominica",
      value: "+1767",
      shortCode: "DM",
    },
    {
      label: "Dominican Republic",
      value: "+1849",
      shortCode: "DO",
    },
    {
      label: "Ecuador",
      value: "+593",
      shortCode: "EC",
    },
    {
      label: "Egypt",
      value: "+20",
      shortCode: "EG",
    },
    {
      label: "El Salvador",
      value: "+503",
      shortCode: "SV",
    },
    {
      label: "Equatorial Guinea",
      value: "+240",
      shortCode: "GQ",
    },
    {
      label: "Eritrea",
      value: "+291",
      shortCode: "ER",
    },
    {
      label: "Estonia",
      value: "+372",
      shortCode: "EE",
    },
    {
      label: "Ethiopia",
      value: "+251",
      shortCode: "ET",
    },
    {
      label: "Falkland Islands (Malvinas)",
      value: "+500",
      shortCode: "FK",
    },
    {
      label: "Faroe Islands",
      value: "+298",
      shortCode: "FO",
    },
    {
      label: "Fiji",
      value: "+679",
      shortCode: "FJ",
    },
    {
      label: "Finland",
      value: "+358",
      shortCode: "FI",
    },
    {
      label: "France",
      value: "+33",
      shortCode: "FR",
    },
    {
      label: "French Guiana",
      value: "+594",
      shortCode: "GF",
    },
    {
      label: "French Polynesia",
      value: "+689",
      shortCode: "PF",
    },
    {
      label: "Gabon",
      value: "+241",
      shortCode: "GA",
    },
    {
      label: "Gambia",
      value: "+220",
      shortCode: "GM",
    },
    {
      label: "Georgia",
      value: "+995",
      shortCode: "GE",
    },
    {
      label: "Germany",
      value: "+49",
      shortCode: "DE",
    },
    {
      label: "Ghana",
      value: "+233",
      shortCode: "GH",
    },
    {
      label: "Gibraltar",
      value: "+350",
      shortCode: "GI",
    },
    {
      label: "Greece",
      value: "+30",
      shortCode: "GR",
    },
    {
      label: "Greenland",
      value: "+299",
      shortCode: "GL",
    },
    {
      label: "Grenada",
      value: "+1473",
      shortCode: "GD",
    },
    {
      label: "Guadeloupe",
      value: "+590",
      shortCode: "GP",
    },
    {
      label: "Guam",
      value: "+1671",
      shortCode: "GU",
    },
    {
      label: "Guatemala",
      value: "+502",
      shortCode: "GT",
    },
    {
      label: "Guernsey",
      value: "+44",
      shortCode: "GG",
    },
    {
      label: "Guinea",
      value: "+224",
      shortCode: "GN",
    },
    {
      label: "Guinea-Bissau",
      value: "+245",
      shortCode: "GW",
    },
    {
      label: "Guyana",
      value: "+595",
      shortCode: "GY",
    },
    {
      label: "Haiti",
      value: "+509",
      shortCode: "HT",
    },
    {
      label: "Holy See (Vatican City State)",
      value: "+379",
      shortCode: "VA",
    },
    {
      label: "Honduras",
      value: "+504",
      shortCode: "HN",
    },
    {
      label: "Hong Kong",
      value: "+852",
      shortCode: "HK",
    },
    {
      label: "Hungary",
      value: "+36",
      shortCode: "HU",
    },
    {
      label: "Iceland",
      value: "+354",
      shortCode: "IS",
    },
    {
      label: "India",
      value: "+91",
      shortCode: "IN",
    },
    {
      label: "Indonesia",
      value: "+62",
      shortCode: "ID",
    },
    {
      label: "Iran, Islamic Republic of Persian Gulf",
      value: "+98",
      shortCode: "IR",
    },
    {
      label: "Iraq",
      value: "+964",
      shortCode: "IQ",
    },
    {
      label: "Ireland",
      value: "+353",
      shortCode: "IE",
    },
    {
      label: "Isle of Man",
      value: "+44",
      shortCode: "IM",
    },
    {
      label: "Israel",
      value: "+972",
      shortCode: "IL",
    },
    {
      label: "Italy",
      value: "+39",
      shortCode: "IT",
    },
    {
      label: "Jamaica",
      value: "+1876",
      shortCode: "JM",
    },
    {
      label: "Japan",
      value: "+81",
      shortCode: "JP",
    },
    {
      label: "Jersey",
      value: "+44",
      shortCode: "JE",
    },
    {
      label: "Jordan",
      value: "+962",
      shortCode: "JO",
    },
    {
      label: "Kazakhstan",
      value: "+77",
      shortCode: "KZ",
    },
    {
      label: "Kenya",
      value: "+254",
      shortCode: "KE",
    },
    {
      label: "Kiribati",
      value: "+686",
      shortCode: "KI",
    },
    {
      label: "Korea, Democratic People's Republic of Korea",
      value: "+850",
      shortCode: "KP",
    },
    {
      label: "Korea, Republic of South Korea",
      value: "+82",
      shortCode: "KR",
    },
    {
      label: "Kuwait",
      value: "+965",
      shortCode: "KW",
    },
    {
      label: "Kyrgyzstan",
      value: "+996",
      shortCode: "KG",
    },
    {
      label: "Laos",
      value: "+856",
      shortCode: "LA",
    },
    {
      label: "Latvia",
      value: "+371",
      shortCode: "LV",
    },
    {
      label: "Lebanon",
      value: "+961",
      shortCode: "LB",
    },
    {
      label: "Lesotho",
      value: "+266",
      shortCode: "LS",
    },
    {
      label: "Liberia",
      value: "+231",
      shortCode: "LR",
    },
    {
      label: "Libyan Arab Jamahiriya",
      value: "+218",
      shortCode: "LY",
    },
    {
      label: "Liechtenstein",
      value: "+423",
      shortCode: "LI",
    },
    {
      label: "Lithuania",
      value: "+370",
      shortCode: "LT",
    },
    {
      label: "Luxembourg",
      value: "+352",
      shortCode: "LU",
    },
    {
      label: "Macao",
      value: "+853",
      shortCode: "MO",
    },
    {
      label: "Macedonia",
      value: "+389",
      shortCode: "MK",
    },
    {
      label: "Madagascar",
      value: "+261",
      shortCode: "MG",
    },
    {
      label: "Malawi",
      value: "+265",
      shortCode: "MW",
    },
    {
      label: "Malaysia",
      value: "+60",
      shortCode: "MY",
    },
    {
      label: "Maldives",
      value: "+960",
      shortCode: "MV",
    },
    {
      label: "Mali",
      value: "+223",
      shortCode: "ML",
    },
    {
      label: "Malta",
      value: "+356",
      shortCode: "MT",
    },
    {
      label: "Marshall Islands",
      value: "+692",
      shortCode: "MH",
    },
    {
      label: "Martinique",
      value: "+596",
      shortCode: "MQ",
    },
    {
      label: "Mauritania",
      value: "+222",
      shortCode: "MR",
    },
    {
      label: "Mauritius",
      value: "+230",
      shortCode: "MU",
    },
    {
      label: "Mayotte",
      value: "+262",
      shortCode: "YT",
    },
    {
      label: "Mexico",
      value: "+52",
      shortCode: "MX",
    },
    {
      label: "Micronesia, Federated States of Micronesia",
      value: "+691",
      shortCode: "FM",
    },
    {
      label: "Moldova",
      value: "+373",
      shortCode: "MD",
    },
    {
      label: "Monaco",
      value: "+377",
      shortCode: "MC",
    },
    {
      label: "Mongolia",
      value: "+976",
      shortCode: "MN",
    },
    {
      label: "Montenegro",
      value: "+382",
      shortCode: "ME",
    },
    {
      label: "Montserrat",
      value: "+1664",
      shortCode: "MS",
    },
    {
      label: "Morocco",
      value: "+212",
      shortCode: "MA",
    },
    {
      label: "Mozambique",
      value: "+258",
      shortCode: "MZ",
    },
    {
      label: "Myanmar",
      value: "+95",
      shortCode: "MM",
    },
    {
      label: "Namibia",
      value: "+264",
      shortCode: "NA",
    },
    {
      label: "Nauru",
      value: "+674",
      shortCode: "NR",
    },
    {
      label: "Nepal",
      value: "+977",
      shortCode: "NP",
    },
    {
      label: "Netherlands",
      value: "+31",
      shortCode: "NL",
    },
    {
      label: "Netherlands Antilles",
      value: "+599",
      shortCode: "AN",
    },
    {
      label: "New Caledonia",
      value: "+687",
      shortCode: "NC",
    },
    {
      label: "New Zealand",
      value: "+64",
      shortCode: "NZ",
    },
    {
      label: "Nicaragua",
      value: "+505",
      shortCode: "NI",
    },
    {
      label: "Niger",
      value: "+227",
      shortCode: "NE",
    },
    {
      label: "Nigeria",
      value: "+234",
      shortCode: "NG",
    },
    {
      label: "Niue",
      value: "+683",
      shortCode: "NU",
    },
    {
      label: "Norfolk Island",
      value: "+672",
      shortCode: "NF",
    },
    {
      label: "Northern Mariana Islands",
      value: "+1670",
      shortCode: "MP",
    },
    {
      label: "Norway",
      value: "+47",
      shortCode: "NO",
    },
    {
      label: "Oman",
      value: "+968",
      shortCode: "OM",
    },
    {
      label: "Pakistan",
      value: "+92",
      shortCode: "PK",
    },
    {
      label: "Palau",
      value: "+680",
      shortCode: "PW",
    },
    {
      label: "Palestinian Territory, Occupied",
      value: "+970",
      shortCode: "PS",
    },
    {
      label: "Panama",
      value: "+507",
      shortCode: "PA",
    },
    {
      label: "Papua New Guinea",
      value: "+675",
      shortCode: "PG",
    },
    {
      label: "Paraguay",
      value: "+595",
      shortCode: "PY",
    },
    {
      label: "Peru",
      value: "+51",
      shortCode: "PE",
    },
    {
      label: "Philippines",
      value: "+63",
      shortCode: "PH",
    },
    {
      label: "Pitcairn",
      value: "+872",
      shortCode: "PN",
    },
    {
      label: "Poland",
      value: "+48",
      shortCode: "PL",
    },
    {
      label: "Portugal",
      value: "+351",
      shortCode: "PT",
    },
    {
      label: "Puerto Rico",
      value: "+1939",
      shortCode: "PR",
    },
    {
      label: "Qatar",
      value: "+974",
      shortCode: "QA",
    },
    {
      label: "Romania",
      value: "+40",
      shortCode: "RO",
    },
    {
      label: "Russia",
      value: "+7",
      shortCode: "RU",
    },
    {
      label: "Rwanda",
      value: "+250",
      shortCode: "RW",
    },
    {
      label: "Reunion",
      value: "+262",
      shortCode: "RE",
    },
    {
      label: "Saint Barthelemy",
      value: "+590",
      shortCode: "BL",
    },
    {
      label: "Saint Helena, Ascension and Tristan Da Cunha",
      value: "+290",
      shortCode: "SH",
    },
    {
      label: "Saint Kitts and Nevis",
      value: "+1869",
      shortCode: "KN",
    },
    {
      label: "Saint Lucia",
      value: "+1758",
      shortCode: "LC",
    },
    {
      label: "Saint Martin",
      value: "+590",
      shortCode: "MF",
    },
    {
      label: "Saint Pierre and Miquelon",
      value: "+508",
      shortCode: "PM",
    },
    {
      label: "Saint Vincent and the Grenadines",
      value: "+1784",
      shortCode: "VC",
    },
    {
      label: "Samoa",
      value: "+685",
      shortCode: "WS",
    },
    {
      label: "San Marino",
      value: "+378",
      shortCode: "SM",
    },
    {
      label: "Sao Tome and Principe",
      value: "+239",
      shortCode: "ST",
    },
    {
      label: "Saudi Arabia",
      value: "+966",
      shortCode: "SA",
    },
    {
      label: "Senegal",
      value: "+221",
      shortCode: "SN",
    },
    {
      label: "Serbia",
      value: "+381",
      shortCode: "RS",
    },
    {
      label: "Seychelles",
      value: "+248",
      shortCode: "SC",
    },
    {
      label: "Sierra Leone",
      value: "+232",
      shortCode: "SL",
    },
    {
      label: "Singapore",
      value: "+65",
      shortCode: "SG",
    },
    {
      label: "Slovakia",
      value: "+421",
      shortCode: "SK",
    },
    {
      label: "Slovenia",
      value: "+386",
      shortCode: "SI",
    },
    {
      label: "Solomon Islands",
      value: "+677",
      shortCode: "SB",
    },
    {
      label: "Somalia",
      value: "+252",
      shortCode: "SO",
    },
    {
      label: "South Africa",
      value: "+27",
      shortCode: "ZA",
    },
    {
      label: "South Sudan",
      value: "+211",
      shortCode: "SS",
    },
    {
      label: "South Georgia and the South Sandwich Islands",
      value: "+500",
      shortCode: "GS",
    },
    {
      label: "Spain",
      value: "+34",
      shortCode: "ES",
    },
    {
      label: "Sri Lanka",
      value: "+94",
      shortCode: "LK",
    },
    {
      label: "Sudan",
      value: "+249",
      shortCode: "SD",
    },
    {
      label: "Suriname",
      value: "+597",
      shortCode: "SR",
    },
    {
      label: "Svalbard and Jan Mayen",
      value: "+47",
      shortCode: "SJ",
    },
    {
      label: "Swaziland",
      value: "+268",
      shortCode: "SZ",
    },
    {
      label: "Sweden",
      value: "+46",
      shortCode: "SE",
    },
    {
      label: "Switzerland",
      value: "+41",
      shortCode: "CH",
    },
    {
      label: "Syrian Arab Republic",
      value: "+963",
      shortCode: "SY",
    },
    {
      label: "Taiwan",
      value: "+886",
      shortCode: "TW",
    },
    {
      label: "Tajikistan",
      value: "+992",
      shortCode: "TJ",
    },
    {
      label: "Tanzania, United Republic of Tanzania",
      value: "+255",
      shortCode: "TZ",
    },
    {
      label: "Thailand",
      value: "+66",
      shortCode: "TH",
    },
    {
      label: "Timor-Leste",
      value: "+670",
      shortCode: "TL",
    },
    {
      label: "Togo",
      value: "+228",
      shortCode: "TG",
    },
    {
      label: "Tokelau",
      value: "+690",
      shortCode: "TK",
    },
    {
      label: "Tonga",
      value: "+676",
      shortCode: "TO",
    },
    {
      label: "Trinidad and Tobago",
      value: "+1868",
      shortCode: "TT",
    },
    {
      label: "Tunisia",
      value: "+216",
      shortCode: "TN",
    },
    {
      label: "Turkey",
      value: "+90",
      shortCode: "TR",
    },
    {
      label: "Turkmenistan",
      value: "+993",
      shortCode: "TM",
    },
    {
      label: "Turks and Caicos Islands",
      value: "+1649",
      shortCode: "TC",
    },
    {
      label: "Tuvalu",
      value: "+688",
      shortCode: "TV",
    },
    {
      label: "Uganda",
      value: "+256",
      shortCode: "UG",
    },
    {
      label: "Ukraine",
      value: "+380",
      shortCode: "UA",
    },
    {
      label: "United Arab Emirates",
      value: "+971",
      shortCode: "AE",
    },
    {
      label: "United Kingdom",
      value: "+44",
      shortCode: "GB",
    },
    {
      label: "United States",
      value: "+1",
      shortCode: "US",
    },
    {
      label: "Uruguay",
      value: "+598",
      shortCode: "UY",
    },
    {
      label: "Uzbekistan",
      value: "+998",
      shortCode: "UZ",
    },
    {
      label: "Vanuatu",
      value: "+678",
      shortCode: "VU",
    },
    {
      label: "Venezuela, Bolivarian Republic of Venezuela",
      value: "+58",
      shortCode: "VE",
    },
    {
      label: "Vietnam",
      value: "+84",
      shortCode: "VN",
    },
    {
      label: "Virgin Islands, British",
      value: "+1284",
      shortCode: "VG",
    },
    {
      label: "Virgin Islands, U.S.",
      value: "+1340",
      shortCode: "VI",
    },
    {
      label: "Wallis and Futuna",
      value: "+681",
      shortCode: "WF",
    },
    {
      label: "Yemen",
      value: "+967",
      shortCode: "YE",
    },
    {
      label: "Zambia",
      value: "+260",
      shortCode: "ZM",
    },
    {
      label: "Zimbabwe",
      value: "+263",
      shortCode: "ZW",
    },
  ];

  function registerHandler(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      const url = "http://localhost:4000/api/v1/user/register";
      const cantactNumber = contry.value + " " + number;
      const body = {
        name: name,
        email: email,
        number: cantactNumber,
        password: password,
      };
      console.log("body", body);
      axios
        .post(url, body)
        .then((res) => {
          console.log("registered in user", res.data);
          navigate("/login");
        })
        .catch((err) => {
          console.log("Error message: ", err.response.data);
        });
    } else {
      console.log(
        "Error message: ",
        " Password and Confirm Password not matching"
      );
    }
  }
  return (
    // <div className="mt-5">
    <form onSubmit={registerHandler}>
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
          <Grid item>Register page</Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              // ref={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              label="Name"
              placeholder="Enter name"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
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
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <FormLabel>Contry code : </FormLabel>&nbsp;
            <Select
              options={contryDialCodes}
              value={contry}
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setContry(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              name="email"
              label="Mobile number"
              placeholder="Enter mobile number"
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              // ref={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              label="Password"
              placeholder="Enter password"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={(e) => {
                setConfirnPassword(e.target.value);
              }}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter Confirm password"
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
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
    // </div>
  );
};

export default Register;
