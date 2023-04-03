// material-ui
import { Grid } from '@mui/material';

// project import
import FirebaseAddInvoice from './Form/formIndex';
import AuthWrapper from '../../components/AuthWrapper';

// ================================|| REGISTER ||================================ //

const AddInvoice = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FirebaseAddInvoice />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default AddInvoice;
