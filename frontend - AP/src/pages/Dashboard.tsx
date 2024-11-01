import Grid from "@mui/material/Grid2";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonOffIcon from "@mui/icons-material/PersonOff";
import SchoolIcon from "@mui/icons-material/School";
import FlexBox from "../custom-components/flex-box/FlexBox";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OptionFlexBoxStyled = styled(FlexBox)(({ theme }) => ({
  ".option-icon": {
    minWidth: "164px",
    minHeight: "150px",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: theme.palette.primary.light,
    "& .icon": {
      width: "50%",
      height: "50%",
      color: "#fff",
    },
  },
  ".option-title": {
    color: "#fff",
    fontSize: "1.25rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: ".5em",
  },
}));

const dashboardOptions = [
  // { text: "All Guides", icon: <HomeIcon className="icon" /> },
  // { text: "Char Anti Guide", icon: <PersonOffIcon className="icon" /> },
  {
    text: "Char Guides",
    icon: <PeopleIcon className="icon" />,
    link: "/guides",
  },
  { text: "My Guides", icon: <FolderIcon className="icon" />, link: "/" },
  { text: "Courses", icon: <SchoolIcon className="icon" />, link: "/" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {dashboardOptions.map((option, index) => {
        return (
          <Grid size={{ xs: 6, md: 4 }} sx={{ cursor: "pointer" }} key={index}>
            <OptionFlexBoxStyled
              key={index}
              flexDirection={"column"}
              onClick={() => navigate(option.link)}
            >
              <Box className="option-icon">{option.icon}</Box>
              <p className="option-title">{option.text}</p>
            </OptionFlexBoxStyled>
          </Grid>
        );
      })}
    </Grid>
  );
}
