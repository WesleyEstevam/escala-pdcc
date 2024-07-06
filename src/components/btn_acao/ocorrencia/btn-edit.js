import { useState, useEffect } from 'react';
import { baseURL } from '../../api/api';
import { useRouter } from 'next/router'
import { alerta } from '../alertas'
import { Search as SearchIcon } from '../../../icons/search';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Grid,
  TextField,
  SvgIcon
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export const EditOcorrencia = () => {
  const [ocorrencia, setOcorrencia] = useState({
    nomePorteiro: "", // Estado inicial do nomePorteiro
    statusOcorrencia: "", // Estado inicial do status
    tipoOcorrencia: "", // Estado inicial do tipo
    dataOcorencia: "", // Estado inicial da data
    descOcorrencia: "", // Estado inicial da descricao
  });

  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null; //ID DA OCORRENCIA

  // Carregar os dados das ocorrencias quando o componente for montado
  useEffect(() => {
    if (data) {
      axios.get(baseURL + 'ocorrencia/' + data)
        .then((response) => {
          setOcorrencia(response.data);
        })
        .catch((error) => {
          console.log('Ops, deu erro na obtenção dos dados da ocorrencia: ' + error);
        });
    }
  }, [data]);

  // Atualizar as informações de cada input
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    if (data) {
      axios.patch(baseURL + 'ocorrencia/' + data, ocorrencia)
        .then(() => {
          router.push('/ocorrencias')
          alerta()
        })
        .catch((error) => {
          console.log('Ops, deu erro na atualização: ' + error);
        });
    }
  }

  const handleChange = (event) => {
    setOcorrencia({
      ...ocorrencia,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <div
        style={{
          margin: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h1>Ocorrência</h1>
        <Link href="/ocorrencias">
          <Button
            startIcon={(<ArrowBackIcon fontSize="small" />)}
            variant="contained"
          >
            Voltar
          </Button>
        </Link>
      </div>
      <form
        autoComplete="off"
        noValidate
      >
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Nome do Porteiro:</label>
                <TextField
                  fullWidth
                  name="nomePorteiro"
                  onChange={handleChange}
                  value={ocorrencia.nomePorteiro}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Status: </label>
                <TextField
                  fullWidth
                  name="statusOcorrencia"
                  onChange={handleChange}
                  value={ocorrencia.statusOcorrencia.descStatusOcorrencia}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Descrição: </label>
                <TextField
                  fullWidth
                  name="descOcorrencia"
                  value={ocorrencia.descOcorrencia}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Tipo: </label>
                <TextField
                  fullWidth
                  name="tipoOcorrencia"
                  onChange={handleChange}
                  value={ocorrencia.tipoOcorrencia.descTipoOcorrencia}
                  variant="outlined"
                >
                  {/* ocorrencia.map((option) => (
                  <option
                    key={option.idOcorrencia}
                    value={option.tipoOcorrencia}
                  >
                    {option.label}
                  </option>
                ))*/}
                </TextField>
              </Grid>

            </Grid>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2
            }}
          >
            <Button
              color="success"
              variant="contained"
              onClick={handleSubmit}
            >
              Atualizar
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};