// material-ui
import { Grid } from '@mui/material';

// project import
import FirebaseAddProduct from './Form/formIndex';
import AuthWrapper from '../../components/AuthWrapper';

// ================================|| REGISTER ||================================ //

const AddTransaction = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FirebaseAddProduct />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default AddTransaction;
