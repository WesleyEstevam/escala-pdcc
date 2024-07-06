import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@mui/material';
import { Veiculo } from '../../Atributos/veiculo'
import { Telefone } from '../../Atributos/telefone'
import { useRouter } from 'next/router'
import { baseURL } from '../../api/api';

export const InfoPrestador = () => {
  const [prestador, setPrestador] = useState([])
  const router = useRouter()
  const data = router.query.data ? JSON.parse(router.query.data) : null

  useEffect(() => {
    axios.get(baseURL + 'prestador/' + data)
      .then((response) => {
        setPrestador(response.data)
      })
      .catch((error) => {
        console.log('Ops, deu erro na listagem do id' + error)
      })
  }, [])

  const handleChange = (event) => {
    setPrestador({
      ...prestador,
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
        <h1>Prestador de Serviço</h1>
        <Link href="/prestadores">
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
                <label>Nome do prestador:</label>
                <TextField
                  fullWidth
                  name="nome"
                  onChange={handleChange}
                  disabled
                  value={prestador.nomePessoa}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>E-mail:</label>
                <TextField
                  fullWidth
                  name="email"
                  onChange={handleChange}
                  disabled
                  value={prestador.email}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Documento:</label>
                <TextField
                  fullWidth
                  name="documento"
                  onChange={handleChange}
                  disabled
                  value={prestador.documento}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Empresa:</label>
                <TextField
                  fullWidth
                  name="empresa"
                  onChange={handleChange}
                  disabled
                  value={prestador.empresa}
                  variant="outlined"
                >
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Nome da Mãe:</label>
                <TextField
                  fullWidth
                  name="nomeMae"
                  onChange={handleChange}
                  disabled
                  value={prestador.nomeMae}
                  variant="outlined"
                >
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <label>Nome do Pai:</label>
                <TextField
                  fullWidth
                  name="nomePai"
                  onChange={handleChange}
                  disabled
                  value={prestador.nomePai}
                  variant="outlined"
                >
                </TextField>
              </Grid>
              <input
                name="tipo"
                type="hidden"
                value="prestador"
              />
            </Grid>
            <CardHeader
              title="Dados do Veículo"
              sx={{
                textAlign: 'center'
              }}
            />
            <Grid
              item
              xs={12}
              mb={5}
            >
              <Veiculo />
            </Grid>
            <CardHeader
              title="Telefones"
              sx={{
                textAlign: 'center'
              }}
            />
            <Grid
              item
              xs={12}
            >
              <Telefone />
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};