import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Grid,
} from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import AnimateButton from '../../components/@extended/AnimateButton';
import CommonTable from '../../components/Table';

const headCells = [
    {
        id: 'transactionId',
        align: 'left',
        disablePadding: false,
        label: 'TRANSACTION ID'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'DATE'
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: true,
        label: 'DESCRIPTION'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'STATUS'
    },

    {
        id: 'price',
        align: 'right',
        disablePadding: false,
        label: 'AMOUNT'
    },
    {
        id: 'attachment',
        align: 'center',
        disablePadding: false,
        label: 'ATTACHMENT'
    }
];

function createData(transactionId, date, description, status, price, attachment) {
    return { transactionId, date, description, status, price, attachment };
}

const rows = [
    createData('#BR2150', '23 Aug, 2022', 'Maintenance', 4, 742, 'nfbg'),
    createData('#BR2151', '12 Feb, 2022', 'Flight Booking', 4, 852, 'sdfghjsdf'),
    createData('#BR2152', '30 Mar, 2022', 'Office Rent', 5, 569),
    createData('#BR2153', '30 Aug, 2022', 'Salary Payment', 4, 545, 'hdsgf'),
    createData('#BR2154', '28 Mar, 2022', 'Online Product', 5, 230, 'shgdfh')
];

// ==============================|| PAGES - INVOICE ||============================== //

const TransactionList = () => {
    const navigate = useNavigate();
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12}>
                <Grid item xs={12} sm={5} md={3} lg={2}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate('/newTransaction');
                            }}
                        >
                            ADD TRANSACTION
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            <Grid item xs={12} md={12} lg={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ width: '100%' }}>
                        <CommonTable headCells={headCells} rows={rows} />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default TransactionList;
