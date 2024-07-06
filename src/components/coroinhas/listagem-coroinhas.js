import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ImageList from "@mui/material/ImageList";
import { DeletarItem } from "../btn_acao/btn-delet";
import { useEffect, useState } from "react";
import { baseURL } from "../api/api";
import { useRouter } from "next/router";

export const ListagemCoroinhas = ({ coroinhas }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [coroinha, setCoroinha] = useState([]);
  const [allCoroinhas, setAllCoroinhas] = useState([]);
  const router = useRouter();

  // EXCLUSÃO DE COROINHAS
  async function handleDelete(idPessoa) {
    try {
      await axios.delete(baseURL + "coroinhas/" + `${idPessoa}`).then(() => {
        const novaLista = coroinha.filter(
          (coroinhas) => coroinhas.id_coroinha !== idPessoa
        );
        setCoroinha(novaLista);
      });
    } catch (error) {
      console.error("ops, erro ao deletar " + error);
    }
  }

  // LISTAGEM DE COROINHAS POR ID
  async function handleFindOne(tipoPessoa) {
    try {
      router.push(
        `/telas_acao/coroinhas/btn-info?data=${JSON.stringify(
          tipoPessoa.id_coroinha
        )}`
      );
    } catch (error) {
      console.error("ops, erro ao listar id " + error);
    }
  }

  // ATUALIZAÇÃO DE COROINHAS
  async function handleUpdate(tipoPessoa) {
    try {
      router.push(
        `/telas_acao/coroinhas/btn-edit?data=${JSON.stringify(
          tipoPessoa.id_coroinha
        )}`
      );
    } catch (error) {
      console.error("ops, erro ao editar id " + error);
    }
  }

  // LISTAGEM DE COROINHAS
  useEffect(() => {
    if (!coroinhas) {
      axios
        .get(baseURL + "coroinhas")
        .then((response) => {
          setAllCoroinhas(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setAllCoroinhas(coroinhas);
    }
  }, [coroinhas]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = coroinha.map((coroinha) => coroinha.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = coroinha;

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <ImageList
        sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr)) !important",
          gridAutoColumns: "minmax(160px, 1fr)",
        }}
      >
        <Box sx={{ minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell>Altura</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCoroinhas.slice(0, limit).map((coroinha) => (
                <TableRow
                  hover
                  key={coroinha.id}
                  selected={selectedCustomerIds.indexOf(coroinha.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {coroinha.nome_coroinha}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{coroinha.sexo_coroinha}</TableCell>
                  <TableCell>{` ${coroinha.altura_coroinha}`}</TableCell>
                  <TableCell>{coroinha.tipo_coroinha}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => handleFindOne(coroinha)}
                    >
                      <InfoIcon />
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleUpdate(coroinha)}
                    >
                      <EditIcon />
                    </Button>

                    <DeletarItem
                      onDelete={() => handleDelete(coroinha.id_coroinha)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </ImageList>
      <TablePagination
        component="div"
        count={allCoroinhas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
