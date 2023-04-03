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

const categoryOptions = ['Electronic', 'Fashion', 'Fitness'];
const specificationsOptions = ['High Quality', 'Sizes', 'Different Color'];

const AddProduct = () => {
    const theme = useTheme();

    const [category, setCategory] = useState('');
    const [specifications, setSpecifications] = useState('');
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
                setFiles(URL.createObjectURL(event.target.files[0]));
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
                    productName: '',
                    productBrand: '',
                    productPrice: '',
                    category: '',
                    specifications: '',
                    productDescription: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    productName: Yup.string().max(255).required('Product Name is required'),
                    productBrand: Yup.string().max(255).required('Product Brand is required'),
                    productPrice: Yup.string().max(255).required('Product Price is required'),
                    category: Yup.string().required('Category is required'),
                    specifications: Yup.string().required('Specifications is required')
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
                                    <InputLabel htmlFor="productName-signup">Product Name*</InputLabel>
                                    <OutlinedInput
                                        id="productName-login"
                                        type="productName"
                                        value={values.productName}
                                        name="productName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Product Name"
                                        fullWidth
                                        error={Boolean(touched.productName && errors.productName)}
                                    />
                                    {touched.productName && errors.productName && (
                                        <FormHelperText error id="helper-text-productName-signup">
                                            {errors.productName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FileUpload {...fileUploadProp} page="addProduct" />
                            </Grid>
                            <Grid item xs={12} md={6} style={{ height: 70 }}>
                                {files?.length ? (
                                    <Box position="absolute">
                                        <img alt="file upload" src={files} width={'150px'} height={'60px'} />
                                    </Box>
                                ) : (
                                    <Box position="absolute">No file selected</Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="productBrand-signup">Product Brand*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.productBrand && errors.productBrand)}
                                        id="productBrand-signup"
                                        type="productBrand"
                                        value={values.productBrand}
                                        name="productBrand"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Product Brand"
                                        inputProps={{}}
                                    />
                                    {touched.productBrand && errors.productBrand && (
                                        <FormHelperText error id="helper-text-productBrand-signup">
                                            {errors.productBrand}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="productPrice-signup">Product Price</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.productPrice && errors.productPrice)}
                                        id="productPrice-signup"
                                        value={values.productPrice}
                                        name="productPrice"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.productPrice && errors.productPrice && (
                                        <FormHelperText error id="helper-text-productPrice-signup">
                                            {errors.productPrice}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="shippingName-signup">Category</InputLabel>
                                    <Select
                                        value={category}
                                        name="category"
                                        onChange={(e) => handleSelectChange(e, 'category')}
                                        input={<OutlinedInput error={category.length === 0 && Boolean(errors.category)} />}
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Select</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        {categoryOptions.map((ele) => (
                                            <MenuItem key={ele} value={ele} style={getStyles(ele, category, theme)}>
                                                {ele}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.category && category.length === 0 && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.category}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="specifications-signup">Specifications</InputLabel>
                                    <Select
                                        value={specifications}
                                        name="specifications"
                                        onChange={(e) => {
                                            handleSelectChange(e, 'specifications');
                                        }}
                                        input={<OutlinedInput error={specifications.length === 0 && Boolean(errors.specifications)} />}
                                        displayEmpty={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <em>Select</em>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        {specificationsOptions.map((ele) => (
                                            <MenuItem key={ele} value={ele} style={getStyles(ele, category, theme)}>
                                                {ele}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.category && category.length === 0 && (
                                        <FormHelperText error id="helper-text-shippingName-signup">
                                            {errors.category}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="billingAddress-signup">Product Description</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.productDescription && errors.productDescription)}
                                        id="productDescription-signup"
                                        type="productDescription"
                                        value={values.productDescription}
                                        name="productDescription"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter Product Description"
                                        inputProps={{}}
                                    />
                                    {touched.productDescription && errors.productDescription && (
                                        <FormHelperText error id="helper-text-productDescription-signup">
                                            {errors.productDescription}
                                        </FormHelperText>
                                    )}
                                </Stack>
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
