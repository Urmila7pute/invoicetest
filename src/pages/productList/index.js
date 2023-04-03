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
        id: 'productName',
        align: 'left',
        disablePadding: false,
        label: 'PRODUCT NAME'
    },
    {
        id: 'category',
        align: 'left',
        disablePadding: true,
        label: 'CATEGORY'
    },
    {
        id: 'inStock',
        align: 'left',
        disablePadding: false,
        label: 'IN STOCK'
    },
    {
        id: 'rating',
        align: 'left',
        disablePadding: false,
        label: 'RATE'
    },

    {
        id: 'price',
        align: 'right',
        disablePadding: false,
        label: 'PRICE'
    },
    {
        id: 'action',
        align: 'center',
        disablePadding: false,
        label: 'ACTION'
    }
];

function createData(productName, category, inStock, rating, price) {
    return { productName, category, inStock, rating, price };
}

const rows = [
    createData("World's most expensive t shirt", 'Fashion', '65 / 125', 3.9, 742),
    createData('Urban Ladder Pashe Chair', 'Furniture', '122 / 232', 4.1, 852),
    createData('350 ml Glass Grocery Container', 'Grocery', '14 / 36', 4.3, 569),
    createData('Fabric Dual Tone Living Room Chair', 'Furniture', '121/345', 3.9, 545),
    createData('Crux Motorsports Helmet', 'Accessories', '32 / 90', 4.5, 230)
];

// ==============================|| PAGES - INVOICE ||============================== //

const ProductList = () => {
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
                                navigate('/addProduct');
                            }}
                        >
                            ADD PRODUCT
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

export default ProductList;
