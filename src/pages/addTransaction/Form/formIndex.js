import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Select, MenuItem, Box } from '@mui/material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { FileUpload } from '../../../components/fileUpload';

// ============================|| FIREBASE - REGISTER ||============================ //

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

function getStyles(name, category, theme) {
    return {
        fontWeight: category.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

const debitCreditOptions = ['Credit', 'Debit'];

const AddProduct = () => {
    const theme = useTheme();

    const [category, setCategory] = useState('');
    const [debitCredit, setSpecifications] = useState('');
    const [files, setFiles] = useState(null);

    const handleSelectChange = (event, name) => {
        const {
            target: { value }
        } = event;
        name === 'category'
            ? setCategory(
                  // On autofill we get a stringified value.
                  typeof value === 'string' ? value.split(',') : value
              )
            : setSpecifications(typeof value === 'string' ? value.split(',') : value);
    };

    const fileUploadProp = {
        accept: 'image/*',
        onChange: (event) => {
            if (event.target.files !== null && event.target?.files?.length > 0) {
                setFiles(event.target.files[0].name);
            }
        },
        onDrop: (event) => {
            console.log(`Drop ${event.dataTransfer.files[0].name}`);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    description: '',
                    productBrand: '',
                    amount: '',
                    category: '',
                    debitCredit: '',
                    productDescription: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    description: Yup.string().max(255).required('Product Name is required'),
                    productBrand: Yup.string().max(255).required('Product Brand is required'),
                    amount: Yup.string().max(255).required('Product Price is required'),
                    category: Yup.string().required('Category is required'),
                    debitCredit: Yup.string().required('debitCredit is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="description-signup">Description*</InputLabel>
                                    <OutlinedInput
                                        id="description-login"
                                        type="description"
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Description"
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-description-signup">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="debitCredit-signup">Credit / Debit </InputLabel>
                                    <Select
                                        value={debitCredit}
                                        name="debitCredit"
                                        onChange={(e) => {
                                            handleSelectChange(e, 'debitCredit');
                                        }}
                                        input={<OutlinedInput error={debitCredit.length === 0 && Boolean(errors.debitCredit)} />}
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Select Credit / Debit </em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select Credit / Debit </em>
                                        </MenuItem>
                                        {debitCreditOptions.map((ele) => (
                                            <MenuItem key={ele} value={ele} style={getStyles(ele, category, theme)}>
                                                {ele}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.debitCredit && debitCredit.length === 0 && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.debitCredit}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="amount-signup">Amount</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.amount && errors.amount)}
                                        id="amount-signup"
                                        value={values.amount}
                                        name="amount"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        placeholder="Enter Amount"
                                    />
                                    {touched.amount && errors.amount && (
                                        <FormHelperText error id="helper-text-amount-signup">
                                            {errors.amount}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="amount-signup">Attachment</InputLabel>
                                    <FileUpload {...fileUploadProp} page="addProduct" />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ height: 70 }}>
                                {files?.length ? <Box position="absolute">{files}</Box> : <Box position="absolute">No file selected</Box>}
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" justifyContent="flex-end">
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Pay Now
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} size="large" variant="text" color="primary">
                                            Discard
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddProduct;
