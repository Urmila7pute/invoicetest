import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Grid, Box, Tooltip, IconButton } from '@mui/material';
import { FileExcelOutlined } from '@ant-design/icons';

// project import
import MainCard from '../../components/MainCard';
import AnalyticEcommerce from '../../components/cards/statistics/AnalyticEcommerce';
import AnimateButton from '../../components/@extended/AnimateButton';
import CommonTable from '../../components/Table';

const headCells = [
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
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'EMAIL'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'DATE'
    },

    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'STATUS'
    },
    {
        id: 'bill',
        align: 'right',
        disablePadding: false,
        label: 'BILLED'
    },
    {
        id: 'action',
        align: 'right',
        disablePadding: false,
        label: 'ACTION'
    }
];

function createData(trackingNo, name, email, date, status, bill) {
    return { trackingNo, name, email, date, status, bill };
}

const rows = [
    createData(84564564, 'Donald Risher', 'morbi.quis@protonmail.org', '20 Sep, 2022', 0, 40570),
    createData(98764564, ' Donald Risher', 'metus@protonmail.org', '28 Mar, 2022', 2, 180139),
    createData(98756325, 'Brody Holman', 'morbi.quis@protonmail.org', '18 Sep, 2022', 1, 90989),
    createData(98652366, ' Jolie Hood', 'neque.sed.dictum@icloud.org', '23 Aug, 2022', 1, 10239),
    createData(13286564, 'Buckminster Wong', 'metus@protonmail.org', '12 Feb, 2022', 3, 83348),
    createData(86739658, 'Howard Lyons', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 0, 410780),
    createData(13256498, 'Howard Oneal', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 2, 70999),
    createData(98753263, 'Jena Hall', 'dictum.phasellus.in@hotmail.org', '30 Aug, 2022', 2, 10570),
    createData(98753275, ' Paki Edwards', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 3, 98063),
    createData(98753291, 'James Diaz', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 0, 14001)
];
// ==============================|| PAGES - INVOICE ||============================== //

const Invoice = () => {
    const navigate = useNavigate();
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid
                item
                xs={12} //sx={{ mb: -2.25 }}
                container
                justifyContent="space-between"
            >
                <Grid
                    item //item xs={6} sm={5} md={3} lg={2}
                >
                    <AnimateButton>
                        <Button
                            disableElevation
                            // disabled={isSubmitting}
                            fullWidth
                            size="large"
                            // type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate('/addInvoice');
                            }}
                        >
                            ADD INVOICE
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid
                    item //item xs={6}
                >
                    <Tooltip title="Export to Excel">
                        <IconButton>
                            <FileExcelOutlined style={{ fontSize: '30px' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="INVOICES SENT" count="4,42,236" percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="PAID INVOICES" count="78,250" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="UNPAID INVOICES" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="CANCELLED INVOICES" count="35,078" percentage={27.4} isLoss color="warning" extra="20,395" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={12} lg={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    {/* <OrdersTable /> */}
                    <Box sx={{ width: '100%' }}>
                        <CommonTable headCells={headCells} rows={rows} />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Invoice;
