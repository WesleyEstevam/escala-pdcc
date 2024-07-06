import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { baseURL } from "../api/api";
import { useRouter } from "next/router";
import { alertaCadastro } from "../btn_acao/alertas";

const CadastrarEscala = () => {
  const [capelas, setCapelas] = useState([]);
  const [nomesCoroinhas, setNomesCoroinhas] = useState([]);
  const [nomesObjetosLiturgicos, setNomesObjetosLiturgicos] = useState([]);
  const [escala, setEscala] = useState({
    id_capela: "",
    horario_missa: "",
    tipo_cerimonia: "",
    data_escala: "",
  });
  const [coroinhas, setCoroinhas] = useState([
    { id_coroinha: "", id_objeto: "" },
  ]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [step, setStep] = useState(1);
  const [coroinhasComErro, setCoroinhasComErro] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEscala({
      ...escala,
      [name]: value,
    });
  };

  const handleChangeCoroinha = (index, atributo, value) => {
    const novasCoroinhas = [...coroinhas];
    novasCoroinhas[index][atributo] = value;
    setCoroinhas(novasCoroinhas);
  };

  useEffect(() => {
    const fetchCapelas = async () => {
      try {
        const response = await axios.get(`${baseURL}capelas`);
        const capelasData = response.data.map((capela) => ({
          id: capela.id_capela,
          nome: capela.nome_capela,
        }));
        setCapelas(capelasData);
      } catch (error) {
        console.error("Erro ao buscar o nome da capela:", error);
      }
    };

    const fetchNomesCoroinhas = async () => {
      try {
        const response = await axios.get(`${baseURL}coroinhas/ativos`);
        setNomesCoroinhas(response.data);
      } catch (error) {
        console.error("Erro ao buscar nomes dos coroinhas:", error);
      }
    };

    const fetchNomesObjetosLiturgicos = async () => {
      try {
        const response = await axios.get(`${baseURL}objetos`);
        setNomesObjetosLiturgicos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os objetos litúrgicos:", error);
      }
    };

    fetchCapelas();
    fetchNomesCoroinhas();
    fetchNomesObjetosLiturgicos();
  }, []);

  const navigate = useRouter();

  const handleNextStep = () => {
    setStep(2);
  };

  const verificarAlturaCoroinhas = async (idCoroinha1, idCoroinha2) => {
    try {
      const response = await axios.get(`${baseURL}escalas/verificarAltura`, {
        params: { idCoroinha1, idCoroinha2 },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar a altura dos coroinhas:", error);
      throw error;
    }
  };

  const handleSaveEscala = async () => {
    setCoroinhasComErro([]);
    if (
      coroinhas.length === 0 ||
      coroinhas.some((c) => !c.id_coroinha || !c.id_objeto)
    ) {
      console.error(
        "Por favor, adicione pelo menos um coroinha com seu objeto litúrgico."
      );
      setSnackbarMessage(
        "Por favor, adicione pelo menos um coroinha com seu objeto litúrgico."
      );
      setSnackbarOpen(true);
      return;
    }

    const objetosLiturgicosEspecificos = [4, 5, 6];

    const coroinhasParaVerificar = coroinhas.filter((coroinha) =>
      objetosLiturgicosEspecificos.includes(parseInt(coroinha.id_objeto))
    );

    if (coroinhasParaVerificar.length >= 2) {
      for (let i = 0; i < coroinhasParaVerificar.length; i++) {
        for (let j = i + 1; j < coroinhasParaVerificar.length; j++) {
          const resultado = await verificarAlturaCoroinhas(
            coroinhasParaVerificar[i].id_coroinha,
            coroinhasParaVerificar[j].id_coroinha
          );
          if (resultado.message.includes("Muita diferença de altura")) {
            setSnackbarMessage(resultado.message);
            setSnackbarOpen(true);
            setCoroinhasComErro([
              coroinhasParaVerificar[i].id_coroinha,
              coroinhasParaVerificar[j].id_coroinha,
            ]);
            return;
          }
        }
      }
    }

    try {
      const response = await axios.post(`${baseURL}escalas`, {
        ...escala,
        id_capela: parseInt(escala.id_capela),
        coroinhas: coroinhas.map(({ id_coroinha, id_objeto }) => ({
          id_coroinha: parseInt(id_coroinha),
          id_objeto: parseInt(id_objeto),
        })),
      });

      alertaCadastro();
      navigate.push("/escalas");
    } catch (error) {
      console.error("Ops! Ocorreu um erro:", error);
      setSnackbarMessage("Ops! Ocorreu um erro ao salvar a escala.");
      setSnackbarOpen(true);
    }
  };

  const addCoroinha = () => {
    setCoroinhas([...coroinhas, { id_coroinha: "", id_objeto: "" }]);
  };

  const deletarLinha = (index) => {
    setCoroinhas((prevCoroinhas) => {
      const novasCoroinhas = [...prevCoroinhas];
      novasCoroinhas.splice(index, 1);
      return novasCoroinhas;
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const getCoroinhaErrorStyle = (idCoroinha) => {
    return coroinhasComErro.includes(idCoroinha)
      ? { borderColor: "red", borderWidth: "2px", borderStyle: "solid" }
      : {};
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        textAlign="center"
        m={3}
      >
        <Typography variant="h4" textAlign="center">
          {step === 1 ? "Nova Escala" : "Adicionar Coroinhas"}
        </Typography>
        <Box />
      </Box>
      <Container>
        {step === 1 ? (
          <>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Nome da Igreja</InputLabel>
                  <Select
                    name="id_capela"
                    value={escala.id_capela}
                    onChange={handleChange}
                  >
                    {capelas.map((capela) => (
                      <MenuItem key={capela.id} value={capela.id}>
                        {capela.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Horário da Missa</InputLabel>
                  <Select
                    name="horario_missa"
                    value={escala.horario_missa}
                    onChange={handleChange}
                  >
                    <MenuItem value="07:00h">07:00h</MenuItem>
                    <MenuItem value="09:00h">09:00h</MenuItem>
                    <MenuItem value="11:00h">11:00h</MenuItem>
                    <MenuItem value="17:00h">17:00h</MenuItem>
                    <MenuItem value="18:00h">18:00h</MenuItem>
                    <MenuItem value="18:30h">18:30h</MenuItem>
                    <MenuItem value="19:00h">19:00h</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="tipo_cerimonia"
                  label="Tipo de Cerimônia"
                  fullWidth
                  value={escala.tipo_cerimonia}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="data_escala"
                  label="Data"
                  type="date"
                  fullWidth
                  value={escala.data_escala}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStep}
              >
                Avançar
              </Button>
            </Box>
          </>
        ) : (
          <>
            {coroinhas.map((coroinha, index) => (
              <Grid
                container
                spacing={2}
                alignItems="center"
                mt={3}
                key={index}
              >
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth>
                    <InputLabel>Coroinha</InputLabel>
                    <Select
                      value={coroinha.id_coroinha}
                      onChange={(e) =>
                        handleChangeCoroinha(
                          index,
                          "id_coroinha",
                          e.target.value
                        )
                      }
                      style={getCoroinhaErrorStyle(coroinha.id_coroinha)}
                    >
                      <MenuItem value="">
                        <em>-</em>
                      </MenuItem>
                      {nomesCoroinhas.map((coroinha) => (
                        <MenuItem
                          key={coroinha.id_coroinha}
                          value={coroinha.id_coroinha}
                        >
                          {coroinha.nome_coroinha}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth>
                    <InputLabel>Objeto Litúrgico</InputLabel>
                    <Select
                      value={coroinha.id_objeto}
                      onChange={(e) =>
                        handleChangeCoroinha(index, "id_objeto", e.target.value)
                      }
                      style={getCoroinhaErrorStyle(coroinha.id_coroinha)}
                    >
                      {nomesObjetosLiturgicos.map((objeto) => (
                        <MenuItem
                          key={objeto.id_objeto}
                          value={objeto.id_objeto}
                        >
                          {objeto.nome_objeto}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton
                    color="secondary"
                    onClick={() => deletarLinha(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained" color="primary" onClick={addCoroinha}>
                Adicionar Coroinha
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveEscala}
                sx={{ ml: 2 }}
              >
                Salvar
              </Button>
            </Box>
          </>
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CadastrarEscala;
