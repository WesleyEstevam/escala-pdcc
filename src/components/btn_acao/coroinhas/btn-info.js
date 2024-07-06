import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { baseURL } from "../../api/api";

export const InfoCoroinha = () => {
  const [coroinha, setCoroinha] = useState([]);
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null;

  useEffect(() => {
    axios
      .get(baseURL + "coroinhas/" + data)
      .then((response) => {
        setCoroinha(response.data);
      })
      .catch((error) => {
        console.log("Ops, deu erro na listagem do id" + error);
      });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div
        style={{
          margin: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Coroinhas</h1>
        <Link href="/coroinhas">
          <Button
            startIcon={<ArrowBackIcon fontSize="small" />}
            variant="contained"
          >
            Voltar
          </Button>
        </Link>
      </div>
      <form autoComplete="off" noValidate>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <label>Nome do coroinha:</label>
                <TextField
                  fullWidth
                  name="nome_coroinha"
                  onChange={handleChange}
                  disabled
                  value={coroinha.nome_coroinha}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Altura:</label>
                <TextField
                  fullWidth
                  name="alura"
                  onChange={handleChange}
                  disabled
                  value={coroinha.altura_coroinha}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <label>Sexo:</label>
                <TextField
                  fullWidth
                  name="sexo"
                  onChange={handleChange}
                  disabled
                  value={coroinha.sexo_coroinha}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <label>Tipo:</label>
                <TextField
                  fullWidth
                  name="tipo_coroinha"
                  onChange={handleChange}
                  disabled
                  value={coroinha.tipo_coroinha}
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
