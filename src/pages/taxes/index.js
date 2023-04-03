import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
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
        id: 'taxName',
        align: 'left',
        disablePadding: false,
        label: 'Tax Name'
    },
    {
        id: 'country',
        align: 'left',
        disablePadding: true,
        label: 'Country'
    },
    {
        id: 'region',
        align: 'left',
        disablePadding: false,
        label: 'Region'
    },
    {
        id: 'taxRate',
        align: 'left',
        disablePadding: false,
        label: 'Tax Rate(%)'
    },

    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'status'
    },
    {
        id: 'switch',
        align: 'center',
        disablePadding: false,
        label: ''
    }
];

function createData(taxName, country, region, taxRate, status) {
    return { taxName, country, region, taxRate, status };
}

const rows = [
    createData('Sales Tax', 'United States', '(any)', '10%', 4, true),
    createData('Value Added Tax(VAT)', 'Australia', '(any)', '20%', 4, true),
    createData('Goods & Service Tax(GST)', 'New Zealand', '(any)', '15%', 4, true),
    createData('Excise', 'Italy', '(any)', '10%', 4, true)
];

// ==============================|| PAGES - INVOICE ||============================== //

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

const CountryOptions = ['India', 'United states'];
const RegionOptions = ['(any)'];

const Taxes = () => {
    const theme = useTheme();
    const [open, setOpenDialog] = useState(false);
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValue] = useState({});

    const handleSelectChange = (event, name) => {
        const {
            target: { value }
        } = event;
        name === 'country'
            ? setCountry(typeof value === 'string' ? value.split(',') : value)
            : setRegion(typeof value === 'string' ? value.split(',') : value);
    };

    const handleChangeForm = (event, newValue) => {
        // console.log(event.target.value);
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid
                item
                xs={12} //sx={{ mb: -2.25 }}
            >
                <Grid item xs={12} sm={5} md={3} lg={2}>
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
                                setOpenDialog(true);
                            }}
                        >
                            ADD TAXES
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 2 */}
            <Grid item xs={12} md={12} lg={12}>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ width: '100%' }}>
                        <CommonTable headCells={headCells} rows={rows} />
                    </Box>
                </MainCard>
            </Grid>
            <CustomizedDialogs
                open={open}
                handleClose={() => {
                    setOpenDialog(false);
                }}
                title={'Add Taxes'}
                handleSave={() => {
                    setOpenDialog(false);
                }}
            >
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="taxName-signup"> Tax Name*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(errors.taxName)}
                                    id="taxName-login"
                                    type="text"
                                    value={values.taxName}
                                    name="taxName"
                                    onChange={handleChangeForm}
                                    placeholder="Enter Tax Name"
                                    inputProps={{}}
                                />
                                {errors.taxName && (
                                    <FormHelperText error id="helper-text-taxName-signup">
                                        {errors.taxName}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="shippingName-signup">Country</InputLabel>
                                <Select
                                    value={country}
                                    name="country"
                                    onChange={(e) => handleSelectChange(e, 'country')}
                                    input={<OutlinedInput error={country.length === 0 && Boolean(errors.country)} />}
                                    displayEmpty={true}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Select Country</em>;
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select Country</em>
                                    </MenuItem>
                                    {CountryOptions.map((ele) => (
                                        <MenuItem key={ele} value={ele} style={getStyles(ele, country, theme)}>
                                            {ele}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.country && country.length === 0 && (
                                    <FormHelperText error id="helper-text-shippingName-signup">
                                        {errors.country}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="shippingName-signup">Region</InputLabel>
                                <Select
                                    value={region}
                                    name="region"
                                    onChange={(e) => handleSelectChange(e, 'region')}
                                    input={<OutlinedInput error={region.length === 0 && Boolean(errors.region)} />}
                                    displayEmpty={true}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Select Region</em>;
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select Region</em>
                                    </MenuItem>
                                    {RegionOptions.map((ele) => (
                                        <MenuItem key={ele} value={ele} style={getStyles(ele, region, theme)}>
                                            {ele}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.region && region.length === 0 && (
                                    <FormHelperText error id="helper-text-shippingName-signup">
                                        {errors.region}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="taxRate-signup">Tax Rate*</InputLabel>
                                <OutlinedInput
                                    id="taxRate-login"
                                    type="taxRate"
                                    value={values.taxRate}
                                    name="taxRate"
                                    onChange={handleChangeForm}
                                    placeholder="Enter Tax Rate"
                                    fullWidth
                                    error={Boolean(errors.taxRate)}
                                />
                                {errors.taxRate && (
                                    <FormHelperText error id="helper-text-taxRate-signup">
                                        {errors.taxRate}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </CustomizedDialogs>
        </Grid>
    );
};

export default Taxes;
