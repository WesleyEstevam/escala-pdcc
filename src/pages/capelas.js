import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/painel-layout';
import { customers } from '../__mocks__/customers';
import { ListaPrestadores } from '../components/prestadores/listagem-prestadores'
import { HeaderPrestadores } from '../components/prestadores/header';

const Page = () => (
  <> 
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <HeaderPrestadores />
        <Box sx={{ mt: 3 }}>
          <ListaPrestadores customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
