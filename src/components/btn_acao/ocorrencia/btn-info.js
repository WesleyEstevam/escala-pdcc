import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router'
import { baseURL } from '../../api/api';

export const InfoOcorrencia = () => {
  const [ocorrencia, setOcorrencia] = useState([])
  const router = useRouter()
  const data = router.query.data ? JSON.parse(router.query.data) : null
  
  useEffect(()=> {
      axios.get(baseURL + 'ocorrencia/' + data)
      .then((response)=> {
        setOcorrencia(response.data)
      }) 
    .catch((error) => {
      console.log('Ops, deu erro na listagem do id' + error)
    })
  }, [])

  const handleChange = (event) => {
    setValues({
      ...values,
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
                disabled
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
                name="status"
                onChange={handleChange}
                disabled
                value={ocorrencia.statusOcorrencia}
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
                name="descricao"
                value={ocorrencia.descOcorrencia}
                id="outlined-multiline-static"
                multiline
                disabled
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
                name="tipo"
                onChange={handleChange}
                disabled
                value={ocorrencia.tipoOcorrencia}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
    </>  
  );
};