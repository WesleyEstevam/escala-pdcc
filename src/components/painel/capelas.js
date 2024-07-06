import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { baseURL } from "../api/api";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";

export const Capelas = (props) => {
  const [capelas, setCapelas] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "capelas")
      .then((response) => {
        setCapelas(response.data);
      })
      .catch((error) => {
        console.log("ops! Erro na consulta " + error);
      });
  }, []);

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Capelas
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {capelas.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <HomeIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
