// material-ui
import { Box, Grid } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';

import CommonTable from '../../components/Table';

const headCells = [
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'DATE'
    },

    {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'INVOICE ID'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'CLIENT'
    },
    {
        id: 'paymentType',
        align: 'left',
        disablePadding: false,
        label: 'PAYMENT TYPE'
    },
    {
        id: 'bill',
        align: 'right',
        disablePadding: false,
        label: 'BILLED'
    },
    {
        id: 'action',
        align: 'center',
        disablePadding: false,
        label: 'ACTION'
    }
];
function createData(trackingNo, name, amount, date, paymentType, bill) {
    return { trackingNo, name, amount, date, paymentType, bill };
}

const rows = [
    createData(84564564, 'Donald Risher', 'morbi.quis@protonmail.org', '20 Sep, 2022', 'Google pay', 40570),
    createData(98764564, ' Donald Risher', 'metus@protonmail.org', '28 Mar, 2022', 'Cash', 180139),
    createData(98756325, 'Brody Holman', 'morbi.quis@protonmail.org', '18 Sep, 2022', 'Credit Card', 90989),
    createData(98652366, ' Jolie Hood', 'neque.sed.dictum@icloud.org', '23 Aug, 2022', 'Cash', 10239),
    createData(13286564, 'Buckminster Wong', 'metus@protonmail.org', '12 Feb, 2022', 'Google pay', 83348),
    createData(86739658, 'Howard Lyons', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 'Google pay', 410780),
    createData(13256498, 'Howard Oneal', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 'Google pay', 70999),
    createData(98753263, 'Jena Hall', 'dictum.phasellus.in@hotmail.org', '30 Aug, 2022', 'Credit Card', 10570),
    createData(98753275, ' Paki Edwards', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 'Cash', 98063),
    createData(98753291, 'James Diaz', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 'Credit Card', 14001)
];

const PaymentSummary = () => {
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

export default PaymentSummary;
