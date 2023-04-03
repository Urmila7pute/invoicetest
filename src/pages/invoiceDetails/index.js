// material-ui
import { Grid, Box } from '@mui/material';

// project import
import AuthWrapper from '../../components/AuthWrapper';

// ================================|| REGISTER ||================================ //

const InvoiceDetails = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box sx={{ width: '100%', ml: 1 }} />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default InvoiceDetails;
