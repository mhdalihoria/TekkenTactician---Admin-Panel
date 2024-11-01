import Grid from "@mui/material/Grid2";

import { useLoaderData, useNavigate } from "react-router-dom";
import { Character } from "../types";
import FlexBox from "../custom-components/flex-box/FlexBox";
import { Box, styled } from "@mui/material";

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

export default function AllGuides() {
  const characters = useLoaderData() as Character[];
  const navigate = useNavigate();
  console.log(characters);
  return (
    <div>
      <Grid container spacing={2}>
        {characters.map((char, index) => {
          console.log(char.image)
          return (
            <Grid
              size={{ xs: 6, md: 4 }}
              sx={{ cursor: "pointer" }}
              key={index}
            >
              <OptionFlexBoxStyled
                key={index}
                flexDirection={"column"}
                onClick={() => navigate(`/guides/${char.name}`)}
              >
                <img className="option-icon" src={char.image} loading="lazy" />
                <p className="option-title">{char.name}</p>
              </OptionFlexBoxStyled>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
