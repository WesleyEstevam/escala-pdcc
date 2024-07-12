import {
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import InfoIcon from "@mui/icons-material/Info";
import { DeletarItem } from "../btn_acao/btn-delet";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { baseURL } from "../api/api";

export const Escalas = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [page, setPage] = useState(0);
  const [escalas, setEscalas] = useState([]);
  const router = useRouter();

  // LISTAGEM DE ESCALAS
  useEffect(() => {
    axios
      .get(baseURL + "escalas")
      .then((response) => {
        setEscalas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // LISTAGEM DE ESCALAS POR ID
  async function handleFindOne(tipoPessoa) {
    try {
      router.push(
        `/telas_acao/escalas/btn-info?data=${JSON.stringify(
          tipoPessoa.id_escala
        )}`
      );
    } catch (error) {
      console.error("ops, erro ao listar id " + error);
    }
  }

  // EXCLUSÃO DE ESCALAS
  async function handleDelete(item) {
    console.log(item);
    try {
      await axios.delete(baseURL + "escalas/" + `${item}`).then(() => {
        const novaLista = escalas.filter((escala) => escala.id_escala !== item);
        setEscalas(novaLista);
      });
    } catch (error) {
      console.error("ops, erro ao deletar " + error);
    }
  }

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = escalas.map((escalas) => escalas.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = escalas;

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

  const formatarDataBrasileira = (dataString) => {
    const data = new Date(dataString);
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
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
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome da Capela</TableCell>
                <TableCell>Horário</TableCell>
                <TableCell>Tipo da cerimonia</TableCell>
                <TableCell>Data da escala</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {escalas.slice(0).map((escala) => (
                <TableRow
                  hover
                  key={escala.id_escala}
                  selected={selectedCustomerIds.indexOf(escala.id) !== -1}
                >
                  <TableCell>{escala.capela.nome_capela}</TableCell>
                  <TableCell>{escala.horario_missa}</TableCell>
                  <TableCell>{escala.tipo_cerimonia}</TableCell>
                  <TableCell>
                    {formatarDataBrasileira(escala.data_escala)}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => handleFindOne(escala)}
                    >
                      <InfoIcon />
                    </Button>

                    <DeletarItem
                      color="error"
                      variant="contained"
                      onDelete={() => handleDelete(escala.id_escala)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </ImageList>
    </Card>
  );
};
