import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import axios from "axios";
import { baseURL } from "../api/api";
import { ListagemCoroinhas } from "./listagem-coroinhas";
import Link from "next/link";
export const HeaderCoroinhas = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${baseURL}coroinhas/nome/${searchValue}`
      );
      setSearchResult([response.data]); // Definir resultados da pesquisa como array para ListagemCoroinhas
    } catch (error) {
      console.error("Erro ao buscar coroinha:", error);
      setSearchResult([]); // Definir array vazio em caso de erro
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchResult(null); // Limpar resultados da pesquisa
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Coroinhas
        </Typography>
        <Box sx={{ m: 1, display: "flex" }}>
          <Link href="/cadastros/novo-coroinha" color="primary">
            <Button color="primary" variant="contained">
              Novo Coroinha
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{ maxWidth: 1000, display: "flex", alignContent: "center" }}
            >
              {/* Campo de pesquisa */}
              <TextField
                fullWidth
                placeholder="Nome do coroinha"
                variant="outlined"
                value={searchValue}
                onChange={handleSearchChange}
              />
              {/* Botão de Pesquisar */}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "0px 10px",
                }}
                color="success"
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />} // Ícone de lupa
              >
                Pesquisar
              </Button>
              {/* Botão de Limpar Pesquisa */}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
                color="secondary"
                variant="contained"
                onClick={handleClear}
                startIcon={<ClearIcon />} // Ícone de borracha
              >
                Limpar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <br />
      {/* Componente de listagem de coroinhas */}
      <ListagemCoroinhas coroinhas={searchResult} />
    </Box>
  );
};
