import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { baseURL } from "../api/api";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";

export const Escalas = (props) => {
  const [escalas, setEscalas] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "escalas")
      .then((response) => {
        setEscalas(response.data);
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
              Escalas
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {escalas.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <HomeIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          ></Typography>
          <Typography color="textSecondary" variant="caption">
            Total de moradores
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
