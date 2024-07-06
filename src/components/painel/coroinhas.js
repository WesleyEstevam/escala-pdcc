import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { useEffect, useState } from "react";
import { baseURL } from "../api/api";
import axios from "axios";

export const Coroinhas = (props) => {
  const [coroinha, setCoroinha] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "coroinhas")
      .then((response) => {
        setCoroinha(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Coroinhas
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {coroinha.length}
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
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowUpwardIcon color="success" />
          <Typography
            color="error"
            sx={{
              mr: 1,
            }}
            variant="body2"
          ></Typography>
          <Typography color="textSecondary" variant="caption">
            Total de imóveis
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
