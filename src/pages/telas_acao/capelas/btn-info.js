import { Box, Container } from '@mui/material';
import { InfoOcorrencia } from '../../../components/btn_acao/ocorrencia/btn-info';
import { DashboardLayout } from '../../../components/painel-layout';
import { customers } from '../../../__mocks__/customers';

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
        <Box sx={{ mt: 3 }}>
          <InfoOcorrencia customers={customers} />
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
