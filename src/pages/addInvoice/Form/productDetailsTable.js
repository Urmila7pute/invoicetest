import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { OutlinedInput, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

const columns = [
    { id: 'index', label: '#', minWidth: 50 },
    { id: 'productDetails', label: 'Product Details', minWidth: 300 },
    {
        id: 'rate',
        label: 'Rate',
        minWidth: 100,
        format: (value) => value.toFixed(2)
    },
    {
        id: 'quantity',
        label: 'Quantity',
        minWidth: 170,
        maxWidth: 170,
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 100,
        align: 'center'
    }
];

export default function ColumnGroupingTable(props) {
    return (
        <Paper sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        // sx={{
                                        //     maxWidth: { xs: 10, lg: 100 }
                                        // }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            let cell = (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                            if (column.id === 'index') {
                                                cell = (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {i + 1}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'productDetails') {
                                                cell = (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Stack spacing={1}>
                                                            <OutlinedInput
                                                                id="invoiceNo-login"
                                                                type="invoiceNo"
                                                                name="invoiceNo"
                                                                placeholder="Product Name"
                                                                fullWidth
                                                                value={row[`productName`]}
                                                                onChange={(e) => props.onChange(e.target.value, 'productName', i)}
                                                            />
                                                            <OutlinedInput
                                                                id="invoiceNo-login"
                                                                type="invoiceNo"
                                                                name="invoiceNo"
                                                                placeholder="Product Detail"
                                                                fullWidth
                                                                value={row[column.id]}
                                                                onChange={(e) => props.onChange(e.target.value, column.id, i)}
                                                            />
                                                        </Stack>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'rate') {
                                                cell = (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Stack spacing={1}>
                                                            <OutlinedInput
                                                                id="invoiceNo-login"
                                                                type="invoiceNo"
                                                                name="Rate"
                                                                placeholder="0"
                                                                fullWidth
                                                                value={row[column.id]}
                                                                onChange={(e) => props.onChange(+e?.target?.value || 0, column.id, i)}
                                                            />
                                                        </Stack>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'quantity') {
                                                cell = (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Stack spacing={1}>
                                                            <OutlinedInput
                                                                id="invoiceNo-login"
                                                                type="invoiceNo"
                                                                name="invoiceNo"
                                                                placeholder="quantity"
                                                                value={row[column.id]}
                                                                onChange={(e) => props.onChange(+e?.target?.value || 0, column.id, i)}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="increase"
                                                                            onClick={() => {
                                                                                props.onChange(+row[column.id] + 1, column.id, i);
                                                                                // setCount(count + 1);
                                                                            }}
                                                                            edge="end"
                                                                        >
                                                                            <PlusOutlined />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                                startAdornment={
                                                                    <InputAdornment position="start">
                                                                        <IconButton
                                                                            aria-label="reduce"
                                                                            onClick={() => {
                                                                                props.onChange(
                                                                                    Math.max(+row[column.id] - 1, 0),
                                                                                    column.id,
                                                                                    i
                                                                                );
                                                                                // setCount(Math.max(count - 1, 0));
                                                                            }}
                                                                            edge="start"
                                                                        >
                                                                            <MinusOutlined />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </Stack>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'action') {
                                                cell = (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <DeleteOutlined style={{ fontSize: '20px' }} onClick={() => props.deleteRow(i)} />
                                                    </TableCell>
                                                );
                                            }
                                            return cell;
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid item xs={5} style={{ padding: 20 }}>
                    <Tooltip title={props.addFieldDisabled ? 'Please fill All the Field' : ''}>
                        <Fab
                            color="primary"
                            variant="extended"
                            onClick={() => props.addField()}
                            disabled={props.addFieldDisabled}
                            style={{ color: props.addFieldDisabled ? 'grey' : 'white' }}
                        >
                            <PlusOutlined style={{ margin: 2 }} />
                            Add Field
                        </Fab>
                    </Tooltip>
                </Grid>
            </Paper>
        </Paper>
    );
}
ColumnGroupingTable.propTypes = {
    rows: PropTypes.any,
    addField: PropTypes.func,
    deleteRow: PropTypes.func,
    onChange: PropTypes.func,
    addFieldDisabled: PropTypes.bool
};
