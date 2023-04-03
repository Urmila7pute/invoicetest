
// material-ui
import { Box, Grid } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';

import CommonTable from '../../components/Table';

const headCells = [
    {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'INVOICE ID'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'DATE'
    },

    {
        id: 'category',
        align: 'left',
        disablePadding: true,
        label: 'CATEGORY'
    },
    {
        id: 'price',
        align: 'left',
        disablePadding: true,
        label: 'PRICE'
    },
    {
        id: 'discount',
        align: 'left',
        disablePadding: false,
        label: 'DISCOUNT'
    },
    {
        id: 'amount',
        align: 'left',
        disablePadding: false,
        label: 'AMOUNT'
    }
];
function createData(trackingNo, category, price, date, discount, amount) {
    return { trackingNo, category, price, date, discount, amount };
}

const rows = [
    createData(84564564, 'Fashion', 3464, '20 Sep, 2022', '10%', 40570),
    createData(98764564, 'Fashion', 23423, '28 Mar, 2022', '20%', 180139),
    createData(98756325, 'Accessories', 435345, '18 Sep, 2022', '30%', 90989),
    createData(98652366, 'Furniture', 23424, '23 Aug, 2022', '10%', 10239),
    createData(13286564, 'Furniture', 6546, '12 Feb, 2022', '5%', 83348),
    createData(86739658, 'Accessories', 6757, '30 Nov, 2022', '5%', 410780),
    createData(13256498, 'Furniture', 67868, '30 Mar, 2022', '5%', 70999),
    createData(98753263, 'Accessories', 3242, '30 Aug, 2022', '15%', 10570),
    createData(98753275, 'Fashion', 3424, '30 Nov, 2022', '10%', 98063),
    createData(98753291, 'Accessoriesz', 34247, '30 Mar, 2022', '15%', 14001)
];

const SaleReport = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
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

export default SaleReport;
