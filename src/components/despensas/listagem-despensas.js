import { useState, useEffect } from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ImageList from "@mui/material/ImageList";
import axios from "axios";
import {
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { baseURL } from "../api/api";

export const ListaDespensas = ({ coroinhas }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [allCoroinhas, setAllCoroinhas] = useState([]);
  const router = useRouter();

  // LISTAGEM DE coroinhas
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

  const dispensarCoroinha = async (id_coroinha) => {
    try {
      await axios.patch(`${baseURL}coroinhas/${id_coroinha}/dispensar`);
      setAllCoroinhas((prevCoroinhas) =>
        prevCoroinhas.map((coroinha) =>
          coroinha.id_coroinha === id_coroinha
            ? {
                ...coroinha,
                status: coroinha.status === "ativo" ? "dispensado" : "ativo",
              }
            : coroinha
        )
      );
    } catch (error) {
      console.error("Erro ao dispensar coroinha:", error);
    }
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
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCoroinhas.slice(0, limit).map((coroinha) => (
                <TableRow
                  hover
                  key={coroinha.id_coroinha}
                  selected={
                    selectedCustomerIds.indexOf(coroinha.id_coroinha) !== -1
                  }
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
                  <TableCell>{coroinha.altura_coroinha}</TableCell>
                  <TableCell>{coroinha.tipo_coroinha}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <Button
                      color={
                        coroinha.status === "dispensado" ? "info" : "warning"
                      }
                      variant="contained"
                      onClick={() => dispensarCoroinha(coroinha.id_coroinha)}
                    >
                      {coroinha.status === "dispensado" ? (
                        <HotelIcon />
                      ) : (
                        <LightbulbIcon />
                      )}
                    </Button>
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
