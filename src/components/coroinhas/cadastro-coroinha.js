import { useState } from "react";
import { useRouter } from "next/router";
import { baseURL } from "../api/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { alertaCadastro } from "../btn_acao/alertas";
export const NovoCoroinha = () => {
  const [values, setValues] = useState({
    nome_coroinha: "",
    altura_coroinha: 0,
    sexo_coroinha: "",
    tipo_coroinha: "",
  });

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...values,
      altura_coroinha: parseFloat(values.altura_coroinha),
    };

    axios
      .post(baseURL + "coroinhas", data)
      .then(() => {
        router.push("/coroinhas");
        alertaCadastro();
      })
      .catch((error) => {
        console.error("ops! ocorreu um erro " + error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} method="POST" autoComplete="off" noValidate>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome completo"
                name="nome_coroinha"
                onChange={handleChange}
                required
                value={values.nome_coroinha}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Altura"
                name="altura_coroinha"
                type="number"
                onChange={handleChange}
                required
                value={values.altura_coroinha}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>Sexo</InputLabel>
              <Select
                fullWidth
                name="sexo_coroinha"
                onChange={handleChange}
                required
                value={values.sexo_coroinha}
                variant="outlined"
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Select>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>Tipo</InputLabel>
              <Select
                fullWidth
                required
                name="tipo_coroinha"
                value={values.tipo_coroinha}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="Coroinha">Coroinha</MenuItem>
                <MenuItem value="Cerimoniário">Cerimoniário</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Button color="success" variant="contained" type="submit">
            Cadastrar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
