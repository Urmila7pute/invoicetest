import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';

// material-ui
import {
    Tabs,
    Tab,
    Box,
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Select,
    MenuItem
} from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import AnimateButton from '../../components/@extended/AnimateButton';
import CommonTable from '../../components/Table';
import CustomizedDialogs from '../../components/modal';

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
        id: 'amount',
        align: 'left',
        disablePadding: false,
        label: 'amount'
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
        align: 'center',
        disablePadding: false,
        label: 'Action'
    }
];

function createData(trackingNo, name, amount, date, status, bill) {
    return { trackingNo, name, amount, date, status, bill };
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

const paidRows = [
    createData(84564564, 'Donald Risher', 'morbi.quis@protonmail.org', '20 Sep, 2022', 1, 40570),
    createData(98764564, ' Donald Risher', 'metus@protonmail.org', '28 Mar, 2022', 1, 180139),
    createData(98756325, 'Brody Holman', 'morbi.quis@protonmail.org', '18 Sep, 2022', 1, 90989),
    createData(98652366, ' Jolie Hood', 'neque.sed.dictum@icloud.org', '23 Aug, 2022', 1, 10239),
    createData(13286564, 'Buckminster Wong', 'metus@protonmail.org', '12 Feb, 2022', 1, 83348),
    createData(86739658, 'Howard Lyons', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 1, 410780),
    createData(13256498, 'Howard Oneal', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 1, 70999),
    createData(98753263, 'Jena Hall', 'dictum.phasellus.in@hotmail.org', '30 Aug, 2022', 1, 10570),
    createData(98753275, ' Paki Edwards', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 1, 98063),
    createData(98753291, 'James Diaz', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 1, 14001)
];

const pendingRows = [
    createData(84564564, 'Donald Risher', 'morbi.quis@protonmail.org', '20 Sep, 2022', 0, 40570),
    createData(98764564, ' Donald Risher', 'metus@protonmail.org', '28 Mar, 2022', 0, 180139),
    createData(98756325, 'Brody Holman', 'morbi.quis@protonmail.org', '18 Sep, 2022', 0, 90989),
    createData(98652366, ' Jolie Hood', 'neque.sed.dictum@icloud.org', '23 Aug, 2022', 0, 10239),
    createData(13286564, 'Buckminster Wong', 'metus@protonmail.org', '12 Feb, 2022', 0, 83348),
    createData(86739658, 'Howard Lyons', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 0, 410780),
    createData(13256498, 'Howard Oneal', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 0, 70999),
    createData(98753263, 'Jena Hall', 'dictum.phasellus.in@hotmail.org', '30 Aug, 2022', 0, 10570),
    createData(98753275, ' Paki Edwards', 'dictum.phasellus.in@hotmail.org', '30 Nov, 2022', 0, 98063),
    createData(98753291, 'James Diaz', 'dictum.phasellus.in@hotmail.org', '30 Mar, 2022', 0, 14001)
];

// ==============================|| PAGES - INVOICE ||============================== //

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function getStyles(name, paymentType, theme) {
    return {
        fontWeight: paymentType.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

const paymentTypeOptions = ['Credit Card', 'Google pay', 'Cash', 'Bank Transfer'];
const statusOptions = ['Paid', 'Pending', 'Failed'];

const Payments = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpenDialog] = useState(false);
    const [paymentType, setpaymentType] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValue] = useState({});

    const handleSelectChange = (event, name) => {
        const {
            target: { value }
        } = event;
        name === 'paymentType'
            ? setpaymentType(typeof value === 'string' ? value.split(',') : value)
            : setStatus(typeof value === 'string' ? value.split(',') : value);
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeForm = (event, newValue) => {
        // console.log(event.target.value);
    };

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
                            // type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setOpenDialog(true);
                            }}
                        >
                            ADD PAYMENT
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            <Grid item xs={12} md={12} lg={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="All" {...a11yProps(0)} />
                                <Tab label="Paid" {...a11yProps(1)} />
                                <Tab label="Pending" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabValue} index={0}>
                            <CommonTable headCells={headCells} rows={rows} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <CommonTable headCells={headCells} rows={paidRows} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <CommonTable headCells={headCells} rows={pendingRows} />
                        </TabPanel>
                    </Box>
                </MainCard>
                <CustomizedDialogs
                    open={open}
                    handleClose={() => {
                        setOpenDialog(false);
                    }}
                    title={'Add Payment'}
                    handleSave={() => {
                        setOpenDialog(false);
                    }}
                >
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup"> Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(errors.name)}
                                        id="name-login"
                                        type="text"
                                        value={values.name}
                                        name="name"
                                        onChange={handleChangeForm}
                                        placeholder="Enter Name"
                                        inputProps={{}}
                                    />
                                    {errors.name && (
                                        <FormHelperText error id="helper-text-name-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyamount-signup"> Amount*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(errors.companyamount)}
                                        id="companyamount-login"
                                        type="text"
                                        value={values.companyamount}
                                        name="companyamount"
                                        onChange={handleChangeForm}
                                        placeholder="Enter Amount"
                                        inputProps={{}}
                                    />
                                    {errors.companyamount && (
                                        <FormHelperText error id="helper-text-companyamount-signup">
                                            {errors.companyamount}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="shippingName-signup">Payment Type</InputLabel>
                                    <Select
                                        value={paymentType}
                                        name="paymentType"
                                        onChange={(e) => handleSelectChange(e, 'paymentType')}
                                        input={<OutlinedInput error={paymentType.length === 0 && Boolean(errors.paymentType)} />}
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Select Payment Type</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select Payment Type</em>
                                        </MenuItem>
                                        {paymentTypeOptions.map((ele) => (
                                            <MenuItem key={ele} value={ele} style={getStyles(ele, paymentType, theme)}>
                                                {ele}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.paymentType && paymentType.length === 0 && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.paymentType}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="shippingName-signup">Status</InputLabel>
                                    <Select
                                        value={status}
                                        name="status"
                                        onChange={(e) => handleSelectChange(e, 'status')}
                                        input={<OutlinedInput error={status.length === 0 && Boolean(errors.status)} />}
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Select Status</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select Status</em>
                                        </MenuItem>
                                        {statusOptions.map((ele) => (
                                            <MenuItem key={ele} value={ele} style={getStyles(ele, status, theme)}>
                                                {ele}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.status && status.length === 0 && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.status}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="paymentDetails-signup">Payment Details*</InputLabel>
                                    <OutlinedInput
                                        id="paymentDetails-login"
                                        type="paymentDetails"
                                        value={values.paymentDetails}
                                        name="paymentDetails"
                                        onChange={handleChangeForm}
                                        placeholder="Enter Payment Details"
                                        fullWidth
                                        error={Boolean(errors.paymentDetails)}
                                    />
                                    {errors.paymentDetails && (
                                        <FormHelperText error id="helper-text-paymentDetails-signup">
                                            {errors.paymentDetails}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </CustomizedDialogs>
            </Grid>
        </Grid>
    );
};

export default Payments;
