import { DashboardLayout } from "../components/painel-layout";
import { Box, Container, Grid } from "@mui/material";
import { Grafico } from "../components/painel/grafico";
import { Escalas } from "../components/painel/escalas";
import { Capelas } from "../components/painel/capelas";
import { Objetos } from "../components/painel/objetos";
import { Coroinhas } from "../components/painel/coroinhas";

const Page = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Coroinhas />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Escalas />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Objetos />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Capelas sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Grafico />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
