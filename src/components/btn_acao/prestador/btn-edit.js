import { useState, useEffect } from 'react';
import { Imoveis } from '../../Atributos/imoveis'
import { Veiculo } from '../../Atributos/veiculo'
import { Telefone } from '../../Atributos/telefone'
import { baseURL } from '../../api/api';
import { useRouter } from 'next/router'
import { alerta } from '../alertas'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export const EditPrestador = (props) => {
  const [prestador, setPrestador] = useState({
    nomePessoa: "", // Estado inicial do nomePessoa
    email: "", // Estado inicial do email
    documento: "", // Estado inicial do documento
    nomePai: "", // Estado inicial do nomePai
    nomeMae: "", // Estado inicial do nomeMae
    empresa: "", // Estado inicial do empresa
  });

  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null; //ID DO MORADOR

  // Carregar os dados do visitante quando o componente for montado
  useEffect(() => {
    if (data) {
      axios.get(baseURL + 'prestador/' + data)
        .then((response) => {
          setPrestador(response.data);
        })
        .catch((error) => {
          console.log('Ops, deu erro na obtenção dos dados do prestador: ' + error);
        });
    }
  }, [data]);

  // Atualizar as informações de cada input
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    if (data) {
      axios.patch(baseURL + 'prestador/' + data, prestador)
        .then(() => {
          router.push('/prestadores')
          alerta()
        })
        .catch((error) => {
          console.log('Ops, deu erro na atualização: ' + error);
        });
    }
  }

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
                <TextField
                  fullWidth
                  label="Nome completo"
                  name="nomePessoa"
                  onChange={handleChange}
                  required
                  value={prestador.nomePessoa}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  onChange={handleChange}
                  required
                  value={prestador.email}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Documento"
                  name="documento"
                  onChange={handleChange}
                  required
                  value={prestador.documento}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nome do Pai"
                  name="nomePai"
                  onChange={handleChange}
                  required
                  value={prestador.nomePai}
                  variant="outlined"
                >
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nome do Mãe"
                  name="nomeMae"
                  onChange={handleChange}
                  required
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
                <TextField
                  fullWidth
                  label="Empresa"
                  name="empresa"
                  onChange={handleChange}
                  required
                  value={prestador.nomeMae}
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
              type="submit"
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