import { useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const InfoImovel = (props) => {
  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });

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
        <h1>Imóveis</h1>
        <Link href="/imoveis">
          <Button
            startIcon={<ArrowBackIcon fontSize="small" />}
            variant="contained"
          >
            Voltar
          </Button>
        </Link>
      </div>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Quadra"
                  name="quadra"
                  onChange={handleChange}
                  disabled
                  value={values.nome}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Lote"
                  name="lote"
                  onChange={handleChange}
                  disabled
                  value={values.email}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Bloco"
                  name="bloco"
                  onChange={handleChange}
                  disabled
                  value={values.documento}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Apartamento"
                  name="apartamento"
                  onChange={handleChange}
                  disabled
                  value={values.nomePai}
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          ></Box>
        </Card>
      </form>
    </>
  );
};
