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
    MenuItem,
} from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import AnimateButton from '../../components/@extended/AnimateButton';

import CommonTable from '../../components/Table';
import CustomizedDialogs from '../../components/modal';
import { FileUpload } from '../../components/fileUpload';

const headCells = [
    {
        id: 'usersName',
        align: 'left',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'EMAIL'
    },

    {
        id: 'contact',
        align: 'left',
        disablePadding: false,
        label: 'MOBILE'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'REGISTRED ON'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'STATUS'
    },
    {
        id: 'action',
        align: 'center',
        disablePadding: false,
        label: 'ACTION'
    }
];

function createData(usersName, email, contact, date, status, avtar) {
    return { usersName, email, contact, date, status, avtar };
}

const rows = [
    createData('Donald Risher', 'morbi.quis@protonmail.org', 3093009739, '20 Sep, 2022', 2, 'https://mui.com/static/images/avatar/3.jpg'),
    createData('Donald Risher', 'metus@protonmail.org', 2532057394, '28 Mar, 2022', 2, 'https://mui.com/static/images/avatar/3.jpg'),
    createData('Brody Holman', 'morbi.quis@protonmail.org', 8323304300, '18 Sep, 2022', 3, `https://mui.com/static/images/avatar/2.jpg`),
    createData('Jolie Hood', 'neque.sed.dictum@icloud.org', 785345743, '23 Aug, 2022', 2),
    createData('Buckminster Wong', 'metus@protonmail.org', 7464357432, '12 Feb, 2022', 3),
    createData('Howard Lyons', 'dictum.phasellus.in@hotmail.org', 2345644563, '30 Nov, 2022', 3),
    createData('Howard Oneal', 'dictum.phasellus.in@hotmail.org', 1325784567, '30 Mar, 2022', 2),
    createData('Jena Hall', 'dictum.phasellus.in@hotmail.org', 3435345323, '30 Aug, 2022', 2),
    createData('Paki Edwards', 'dictum.phasellus.in@hotmail.org', 7896532468, '30 Nov, 2022', 3),
    createData('James Diaz', 'dictum.phasellus.in@hotmail.org', 98765324569, '30 Mar, 2022', 3)
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

function getStyles(usersName, paymentType, theme) {
    return {
        fontWeight: paymentType.indexOf(usersName) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

const CountryOptions = ['Active', 'Disabled'];

const Users = () => {
    const theme = useTheme();
    const [open, setOpenDialog] = useState(false);
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValue] = useState({});
    const [files, setFiles] = useState(null);

    const handleSelectChange = (event) => {
        const {
            target: { value }
        } = event;
        setStatus(typeof value === 'string' ? value.split(',') : value);
    };

    const handleChangeForm = (event, newValue) => {
        console.log(event.target.value,  files);
    };

    const fileUploadProp = {
        accept: 'image/*',
        onChange: (event) => {
            if (event.target.files !== null && event.target?.files?.length > 0) {
                setFiles(URL.createObjectURL(event.target.files[0]));
            }
        },
        onDrop: (event) => {
            console.log(`Drop ${event.dataTransfer.files[0].name}`);
        }
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
                            ADD USER
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
                title={'Add User'}
                handleSave={() => {
                    setOpenDialog(false);
                }}
            >
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <FileUpload {...fileUploadProp} page="user" />
                        </Grid>
                        <Grid item xs={12} md={12}>
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
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="email-signup">Email*</InputLabel>
                                <OutlinedInput
                                    id="email-login"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onChange={handleChangeForm}
                                    placeholder="Enter Email"
                                    fullWidth
                                    error={Boolean(errors.email)}
                                />
                                {errors.email && (
                                    <FormHelperText error id="helper-text-email-signup">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="phone-signup">Phone*</InputLabel>
                                <OutlinedInput
                                    id="phone-login"
                                    type="phone"
                                    value={values.phone}
                                    name="phone"
                                    onChange={handleChangeForm}
                                    placeholder="Enter phone"
                                    fullWidth
                                    error={Boolean(errors.phone)}
                                />
                                {errors.phone && (
                                    <FormHelperText error id="helper-text-phone-signup">
                                        {errors.phone}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="shippingName-signup">Status</InputLabel>
                                <Select
                                    value={status}
                                    name="status"
                                    onChange={handleSelectChange}
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
                                    {CountryOptions.map((ele) => (
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
                    </Grid>
                </form>
            </CustomizedDialogs>
        </Grid>
    );
};

export default Users;
