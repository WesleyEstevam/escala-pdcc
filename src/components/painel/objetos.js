import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import { useEffect, useState } from "react";
import { baseURL } from "../api/api";
import axios from "axios";

export const Objetos = (props) => {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL + "objetos")
      .then((response) => {
        setObjetos(response.data);
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
              Objetos Litugicos
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {objetos.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
