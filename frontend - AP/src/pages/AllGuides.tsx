import Grid from "@mui/material/Grid2";

import { useLoaderData, useNavigate } from "react-router-dom";
import { Character } from "../types";
import FlexBox from "../custom-components/flex-box/FlexBox";
import { styled } from "@mui/material";

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
    overflow: "hidden",

    background: theme.palette.primary.light,
    "& .icon": {
      width: "auto",
      height: "120px",
      color: "#fff",
    },
  },
  ".option-title": {
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: ".5em",
  },
}));

export default function AllGuides() {
  const characters = useLoaderData() as Character[];
  const navigate = useNavigate();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }} sx={{ cursor: "pointer" }}>
          <OptionFlexBoxStyled
            onClick={() => navigate(`/add-guide`)}
            style={{ flexDirection: "column" }}
          >
            <div className="option-icon">
              <img
                className="icon"
                src={
                  "data:image/jpeg;base64,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"
                }
                loading="lazy"
              />
            </div>
            <p className="option-title">Add New Char</p>
          </OptionFlexBoxStyled>
        </Grid>
        {characters.map((char, index) => {
          return (
            <Grid
              size={{ xs: 6, md: 4 }}
              sx={{ cursor: "pointer" }}
              key={index}
            >
              <OptionFlexBoxStyled
                key={index}
                flexDirection={"column"}
                onClick={() => navigate(`/guides/${char._id}`)}
              >
                <div className="option-icon">
                  <img className="icon" src={char.image} loading="lazy" />
                </div>
                <p className="option-title">{char.name}</p>
              </OptionFlexBoxStyled>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
