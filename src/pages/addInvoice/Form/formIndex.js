import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// material-ui
import {
    Button,
    Divider,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import ProductDetailsTable from './productDetailsTable';
import TotalCalculations from './totalCalculationForm';

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

function getStyles(name, paymentMethod, theme) {
    return {
        fontWeight: paymentMethod.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

const paymentMethodOptions = ['Credit Card', 'Mastercard', 'Paypal', 'Visa'];

const AddInvoice = () => {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [addFieldDisabled, setAddFieldDisabled] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSelectChange = (event) => {
        const {
            target: { value }
        } = event;
        setPaymentMethod(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const changePassword = (value) => {
        // const temp = strengthIndicator(value);
        // setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, [rows]);

    const addField = () => {
        const row = rows;
        const emptyValueInTable = (row.length !== 0 && checkAllRowsFull(row)) || false;
        if (!emptyValueInTable) {
            row.push({ index: rows.length + 1, productDetails: '', productName: '', rate: 0, quantity: 0, amount: 0, action: 'delete' });
            setRows([...row]);
        }
        setAddFieldDisabled(true);
    };

    const deleteRow = (index) => {
        const row = rows;
        row.splice(index, 1);
        setRows([...row]);
        const emptyValueInTable = checkAllRowsFull(row);
        if (!emptyValueInTable) {
            setAddFieldDisabled(false);
        }
    };
    const onChange = (value, name, index) => {
        rows[`${index}`][`${name}`] = value;
        if (name === 'rate' || name === 'quantity') {
            rows[`${index}`].amount = 0;
            if (
                (name === 'rate' && rows[`${index}`].quantity !== 0 && value !== 0) ||
                (name === 'quantity' && rows[`${index}`].rate !== 0 && value !== 0)
            ) {
                const check = name === 'quantity' ? rows[`${index}`].rate : rows[`${index}`].quantity;
                rows[`${index}`].amount = value * check;
            }
        }
        setRows([...rows]);
        const emptyValueInTable = checkAllRowsFull([...rows]);
        if (emptyValueInTable) {
            setAddFieldDisabled(true);
        } else {
            setAddFieldDisabled(false);
        }
    };

    const checkAllRowsFull = (row) => {
        let emptyValueInTable = false;
        for (var i = 0; i < row.length; i++) {
            if (Object.values(row[i]).some((v) => v === null || v === '' || v === 0)) {
                emptyValueInTable = true;
                break;
            }
        }
        return emptyValueInTable;
    };

    return (
        <>
            <Formik
                initialValues={{
                    invoiceNo: '',
                    paymentStatus: '',
                    date: '',
                    companyAddress: '',
                    companyPostalCode: '',
                    companyEmail: '',
                    companyWebsite: '',
                    companyContactNo: '',
                    billingName: '',
                    billingAddress: '',
                    billingContactNo: '',
                    billingTaxNumber: '',
                    shippingName: '',
                    shippingAddress: '',
                    shippingContactNo: '',
                    shippingTaxNumber: '',
                    cardHolderName: '',
                    cardNumber: '',
                    totalForCard: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    invoiceNo: Yup.string().max(255).required('Invoice Number is required'),
                    paymentStatus: Yup.string().max(255).required('Payment Status is required'),
                    date: Yup.string().required('date is required'),
                    companyAddress: Yup.string().max(255).required('Address is required'),
                    companyPostalCode: Yup.string().max(255).required('Postal Code is required'),
                    companyEmail: Yup.string().max(255).required('Email is required'),
                    companyWebsite: Yup.string().max(255).required('Website is required'),
                    companyContactNo: Yup.string().max(255).required('Contact No is required'),
                    billingName: Yup.string().max(255).required('Name is required'),
                    billingAddress: Yup.string().max(255).required('Address is required'),
                    billingContactNo: Yup.string().max(255).required('Contact No is required'),
                    billingTaxNumber: Yup.string().max(255).required('Tax Number is required'),
                    shippingName: Yup.string().max(255).required('Name is required'),
                    shippingAddress: Yup.string().max(255).required('Address is required'),
                    shippingContactNo: Yup.string().max(255).required('Contact No is required'),
                    cardHolderName: Yup.string().max(255).required('Card Holder Name is required'),
                    cardNumber: Yup.string().max(16).required('Card Number is required'),
                    totalForCard: Yup.string().max(16).required('Total amount required'),
                    paymentMethod: Yup.string().required('Payment method required')
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
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="invoiceNo-signup">Invoice No*</InputLabel>
                                    <OutlinedInput
                                        id="invoiceNo-login"
                                        type="invoiceNo"
                                        value={values.invoiceNo}
                                        name="invoiceNo"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="#VL79216985"
                                        fullWidth
                                        error={Boolean(touched.invoiceNo && errors.invoiceNo)}
                                    />
                                    {touched.invoiceNo && errors.invoiceNo && (
                                        <FormHelperText error id="helper-text-invoiceNo-signup">
                                            {errors.invoiceNo}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="paymentStatus-signup">Payment Status*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.paymentStatus && errors.paymentStatus)}
                                        id="paymentStatus-signup"
                                        type="paymentStatus"
                                        value={values.paymentStatus}
                                        name="paymentStatus"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Paid/Refund/Unpaid"
                                        inputProps={{}}
                                    />
                                    {touched.paymentStatus && errors.paymentStatus && (
                                        <FormHelperText error id="helper-text-paymentStatus-signup">
                                            {errors.paymentStatus}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="totalAmount-signup">Total Amount</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.totalAmount && errors.totalAmount)}
                                        id="totalAmount-signup"
                                        value={values.totalAmount}
                                        name="totalAmount"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.totalAmount && errors.totalAmount && (
                                        <FormHelperText error id="helper-text-totalAmount-signup">
                                            {errors.totalAmount}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="date-signup">Date Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.date && errors.date)}
                                        id="date-login"
                                        type="date"
                                        value={values.date}
                                        name="date"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.date && errors.date && (
                                        <FormHelperText error id="helper-text-date-signup">
                                            {errors.date}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Company Address</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyAddress-signup"> Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.companyAddress && errors.companyAddress)}
                                        id="companyAddress-login"
                                        type="text"
                                        value={values.companyAddress}
                                        name="companyAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Company Address"
                                        inputProps={{}}
                                    />
                                    {touched.companyAddress && errors.companyAddress && (
                                        <FormHelperText error id="helper-text-companyAddress-signup">
                                            {errors.companyAddress}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyPostalCode-signup"> Postal Code*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.companyPostalCode && errors.companyPostalCode)}
                                        id="companyPostalCode-login"
                                        type="text"
                                        value={values.companyPostalCode}
                                        name="companyPostalCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Company Postal code"
                                        inputProps={{}}
                                    />
                                    {touched.companyPostalCode && errors.companyPostalCode && (
                                        <FormHelperText error id="helper-text-companyPostalCode-signup">
                                            {errors.companyPostalCode}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyEmail-signup"> Email*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.companyEmail && errors.companyEmail)}
                                        id="companyEmail-login"
                                        type="text"
                                        value={values.companyEmail}
                                        name="companyEmail"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Company Email"
                                        inputProps={{}}
                                    />
                                    {touched.companyEmail && errors.companyEmail && (
                                        <FormHelperText error id="helper-text-companyEmail-signup">
                                            {errors.companyEmail}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyWebsite-signup">Website*</InputLabel>
                                    <OutlinedInput
                                        id="companyWebsite-login"
                                        type="companyWebsite"
                                        value={values.companyWebsite}
                                        name="companyWebsite"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        fullWidth
                                        error={Boolean(touched.companyWebsite && errors.companyWebsite)}
                                    />
                                    {touched.companyWebsite && errors.companyWebsite && (
                                        <FormHelperText error id="helper-text-companyWebsite-signup">
                                            {errors.companyWebsite}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyContactNo-signup">Contact No*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.companyContactNo && errors.companyContactNo)}
                                        id="companyContactNo-signup"
                                        type="companyContactNo"
                                        value={values.companyContactNo}
                                        name="companyContactNo"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.companyContactNo && errors.companyContactNo && (
                                        <FormHelperText error id="helper-text-companyContactNo-signup">
                                            {errors.companyContactNo}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Billing & Shipping Address</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12} container>
                                <Grid item xs={12} md={5}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="billingAddress-signup">Billing Address</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.billingName && errors.billingName)}
                                            id="billingName-signup"
                                            type="billingName"
                                            value={values.billingName}
                                            name="billingName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Billing name"
                                            inputProps={{}}
                                        />
                                        {touched.billingName && errors.billingName && (
                                            <FormHelperText error id="helper-text-billingName-signup">
                                                {errors.billingName}
                                            </FormHelperText>
                                        )}
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.billingAddress && errors.billingAddress)}
                                            id="billingAddress-signup"
                                            type="billingAddress"
                                            value={values.billingAddress}
                                            name="billingAddress"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Billing Address"
                                            inputProps={{}}
                                        />
                                        {touched.billingAddress && errors.billingAddress && (
                                            <FormHelperText error id="helper-text-billingAddress-signup">
                                                {errors.billingAddress}
                                            </FormHelperText>
                                        )}
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.billingContactNo && errors.billingContactNo)}
                                            id="billingContactNo-signup"
                                            type="billingContactNo"
                                            value={values.billingContactNo}
                                            name="billingContactNo"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Shipping Contact No"
                                            inputProps={{}}
                                        />
                                        {touched.billingContactNo && errors.billingContactNo && (
                                            <FormHelperText error id="helper-text-billingContactNo-signup">
                                                {errors.billingContactNo}
                                            </FormHelperText>
                                        )}
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.billingTaxNumber && errors.billingTaxNumber)}
                                            id="billingTaxNumber-signup"
                                            type="billingTaxNumber"
                                            value={values.billingTaxNumber}
                                            name="billingTaxNumber"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Tax Number"
                                            inputProps={{}}
                                        />
                                        {touched.billingTaxNumber && errors.billingTaxNumber && (
                                            <FormHelperText error id="helper-text-billingTaxNumber-signup">
                                                {errors.billingTaxNumber}
                                            </FormHelperText>
                                        )}
                                        <FormControlLabel
                                            control={<Checkbox name="SomeName" value="SomeValue" />}
                                            label="Will your Billing and Shipping address same?"
                                        />
                                    </Stack>
                                </Grid>
                                <Divider orientation="vertical" sx={{ margin: { xs: 0, sm: 1, md: 7, xl: 8 } }} flexItem />
                                <Grid item xs={12} md={5}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="shippingName-signup">Shipping Address</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.shippingName && errors.shippingName)}
                                            id="shippingName-signup"
                                            type="shippingName"
                                            value={values.shippingName}
                                            name="shippingName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Shipping name"
                                            inputProps={{}}
                                        />
                                        {touched.shippingName && errors.shippingName && (
                                            <FormHelperText error id="helper-text-shippingName-signup">
                                                {errors.shippingName}
                                            </FormHelperText>
                                        )}
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.shippingAddress && errors.shippingAddress)}
                                            id="shippingAddress-signup"
                                            type="shippingAddress"
                                            value={values.shippingAddress}
                                            name="shippingAddress"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Shipping Address"
                                            inputProps={{}}
                                        />
                                        {touched.shippingAddress && errors.shippingAddress && (
                                            <FormHelperText error id="helper-text-shippingAddress-signup">
                                                {errors.shippingAddress}
                                            </FormHelperText>
                                        )}
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.shippingContactNo && errors.shippingContactNo)}
                                            id="shippingContactNo-signup"
                                            type="shippingContactNo"
                                            value={values.shippingContactNo}
                                            name="shippingContactNo"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Billing Contact No"
                                            inputProps={{}}
                                        />
                                        {touched.shippingContactNo && errors.shippingContactNo && (
                                            <FormHelperText error id="helper-text-shippingContactNo-signup">
                                                {errors.shippingContactNo}
                                            </FormHelperText>
                                        )}
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.shippingTaxNumber && errors.shippingTaxNumber)}
                                            id="shippingTaxNumber-signup"
                                            type="shippingTaxNumber"
                                            value={values.shippingTaxNumber}
                                            name="shippingTaxNumber"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter Tax Number"
                                            inputProps={{}}
                                        />
                                        {touched.shippingTaxNumber && errors.shippingTaxNumber && (
                                            <FormHelperText error id="helper-text-shippingTaxNumber-signup">
                                                {errors.shippingTaxNumber}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <ProductDetailsTable
                                    rows={rows}
                                    addField={addField}
                                    deleteRow={deleteRow}
                                    onChange={onChange}
                                    addFieldDisabled={addFieldDisabled}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}></Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <TotalCalculations rows={rows} addFieldDisabled={addFieldDisabled} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="shippingName-signup">Payment Details</InputLabel>
                                    <Select
                                        value={paymentMethod}
                                        name="paymentMethod"
                                        onChange={handleSelectChange}
                                        input={<OutlinedInput error={paymentMethod.length === 0 && Boolean(errors.paymentMethod)} />}
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Payment Method</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Payment Method</em>
                                        </MenuItem>
                                        {paymentMethodOptions.map((ele) => (
                                            <MenuItem key={ele} value={ele} style={getStyles(ele, paymentMethod, theme)}>
                                                {ele}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.paymentMethod && paymentMethod.length === 0 && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.paymentMethod}
                                        </FormHelperText>
                                    )}
                                    {/* {touched.shippingName && errors.shippingName && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.shippingName}
                                        </FormHelperText>
                                    )} */}
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.cardHolderName && errors.cardHolderName)}
                                        id="cardHolderName-signup"
                                        type="cardHolderName"
                                        value={values.cardHolderName}
                                        name="cardHolderName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Card Holder Name"
                                        inputProps={{}}
                                    />
                                    {touched.cardHolderName && errors.cardHolderName && (
                                        <FormHelperText error id="helper-text-cardHolderName-signup">
                                            {errors.cardHolderName}
                                        </FormHelperText>
                                    )}
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.cardNumber && errors.cardNumber)}
                                        id="cardNumber-signup"
                                        type="cardNumber"
                                        value={values.cardNumber}
                                        name="cardNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="xxxx xxxx xxxx xxxx"
                                        inputProps={{}}
                                    />
                                    {touched.cardNumber && errors.cardNumber && (
                                        <FormHelperText error id="helper-text-cardNumber-signup">
                                            {errors.cardNumber}
                                        </FormHelperText>
                                    )}
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.totalForCard && errors.totalForCard)}
                                        id="totalForCard-signup"
                                        type="totalForCard"
                                        value={values.totalForCard}
                                        name="totalForCard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        inputProps={{}}
                                    />
                                    {touched.totalForCard && errors.totalForCard && (
                                        <FormHelperText error id="helper-text-totalForCard-signup">
                                            {errors.totalForCard}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card
                                    or direct payment online. If account is not paid within 7 days the credits details supplied as
                                    confirmation of work undertaken will be charged the agreed quoted fee noted above.
                                </Typography>
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
                                            Save
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            send Invoice
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

export default AddInvoice;
