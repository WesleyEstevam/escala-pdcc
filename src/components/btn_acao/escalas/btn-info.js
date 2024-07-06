import { Container, Grid, TextField, InputLabel, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { baseURL } from "../../api/api";
import axios from "axios";

export const InfoEscalas = () => {
  const [escala, setEscala] = useState(null);
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null;

  useEffect(() => {
    axios
      .get(baseURL + "escalas/" + data)
      .then((response) => {
        setEscala(response.data);
      })
      .catch((error) => {
        console.log("Ops, deu erro na listagem do id" + error);
      });
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEscala((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBack = () => {
    router.push("/escalas");
  };

  if (!escala) return null;

  const formatarDataBrasileira = (dataString) => {
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Container>
      <div
        style={{
          margin: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Escala do dia: {formatarDataBrasileira(escala.data_escala)}</h1>
        <Button variant="contained" onClick={handleBack}>
          Voltar
        </Button>
      </div>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            label="Nome da Capela"
            name="nome_capela"
            value={escala.capela.nome_capela}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            label="Horário da Missa"
            name="horario_missa"
            value={escala.horario_missa}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            label="Tipo de Cerimônia"
            name="tipo_cerimonia"
            value={escala.tipo_cerimonia}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            name="data_escala"
            value={formatarDataBrasileira(escala.data_escala)}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {escala.coroinhas &&
        escala.coroinhas.map((coroinha, index) => (
          <Grid container spacing={2} alignItems="center" mt={3} key={index}>
            <Grid item xs={12} sm={6}>
              <InputLabel>Coroinha</InputLabel>
              <TextField
                fullWidth
                disabled
                value={coroinha.coroinha.nome_coroinha}
                placeholder="Nome do Coroinha"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Objeto Litúrgico</InputLabel>
              <TextField
                fullWidth
                disabled
                value={coroinha.objetoLiturgico.nome_objeto}
                placeholder="Objeto Litúrgico"
              />
            </Grid>
          </Grid>
        ))}
    </Container>
  );
};
