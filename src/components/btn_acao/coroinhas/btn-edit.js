import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseURL } from "../../api/api";
import { alerta } from "../alertas";
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
import Link from "next/link";

export const EditCoroinha = () => {
  const [coroinha, setCoroinha] = useState({
    nome_coroinha: "",
    sexo_coroinha: "",
    altura_coroinha: "", // Use a string here for controlled input
    tipo_coroinha: "",
  });

  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null; //ID DO coroinha

  // Carregar os dados do coroinha quando o componente for montado
  useEffect(() => {
    if (data) {
      axios
        .get(baseURL + "coroinhas/" + data)
        .then((response) => {
          setCoroinha(response.data);
        })
        .catch((error) => {
          console.log(
            "Ops, deu erro na obtenção dos dados do coroinha: " + error
          );
        });
    }
  }, [data]);

  // Atualizar as informações de cada input
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    const updatedCoroinha = {
      ...coroinha,
      altura_coroinha: parseFloat(coroinha.altura_coroinha), // Ensure it's a number
    };

    if (data) {
      axios
        .patch(baseURL + "coroinhas/" + data, updatedCoroinha)
        .then(() => {
          router.push("/coroinhas");
          alerta();
        })
        .catch((error) => {
          console.log("Ops, deu erro na atualização: " + error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoroinha({
      ...coroinha,
      [name]: name === "altura_coroinha" ? parseFloat(value) : value,
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
          <Button variant="contained">Voltar</Button>
        </Link>
      </div>
      <form autoComplete="off">
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <InputLabel>Nome do coroinha</InputLabel>
                <TextField
                  fullWidth
                  name="nome_coroinha"
                  onChange={handleChange}
                  value={coroinha.nome_coroinha}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>Altura</InputLabel>
                <TextField
                  fullWidth
                  name="altura_coroinha"
                  type="number" // Ensure it's a number input
                  onChange={handleChange}
                  value={coroinha.altura_coroinha}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <InputLabel>Sexo</InputLabel>
                <TextField
                  fullWidth
                  name="sexo_coroinha"
                  onChange={handleChange}
                  value={coroinha.sexo_coroinha}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  fullWidth
                  name="tipo_coroinha" // Ensure the name is set
                  value={coroinha.tipo_coroinha}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Coroinha">Coroinha</MenuItem>
                  <MenuItem value="Cerimoniário">Cerimoniário</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    Atualizar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
