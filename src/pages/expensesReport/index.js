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
        label: 'EXPENSESD'
    },

    {
        id: 'company',
        align: 'left',
        disablePadding: true,
        label: 'COMPANY'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'EXPENSE DATE'
    },

    {
        id: 'amount',
        align: 'left',
        disablePadding: false,
        label: 'AMOUNT'
    },
    {
        id: 'expensesStatus',
        align: 'left',
        disablePadding: false,
        label: 'STATUS'
    }
];
function createData(trackingNo, company, amount, date, expensesStatus) {
    return { trackingNo, company, amount, date, expensesStatus };
}

const rows = [
    createData(84564564, 'Heidenreich-Kautzer', 3464, '20 Sep, 2022', 0),
    createData(98764564, 'Heidenreich-Kautzer', 23423, '28 Mar, 2022', 1),
    createData(98756325, 'Dare-Stark', 435345, '18 Sep, 2022', 1),
    createData(98652366, 'Jast, Hane and Bogan', 23424, '23 Aug, 2022', 1),
    createData(13286564, 'Jast, Hane and Bogan', 6546, '12 Feb, 2022', 0),
    createData(86739658, 'Dare-Stark', 6757, '30 Nov, 2022', 1),
    createData(13256498, 'Jast, Hane and Bogan', 67868, '30 Mar, 2022', 0),
    createData(98753263, 'Dare-Stark', 3242, '30 Aug, 2022', 0),
    createData(98753275, 'Heidenreich-Kautzer', 3424, '30 Nov, 2022', 0),
    createData(98753291, 'Dare-Starkz', 34247, '30 Mar, 2022', 1)
];

const ExpensesReport = () => {
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

export default ExpensesReport;
