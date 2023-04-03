import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

export default function ColumnGroupingTable(props) {
    // const subTotal = props.addFieldDisabled ? 0 : props.rows.map((row) => sum(row));

    var sum = 0;
    for (var el of props.rows) {
        console.log('element', el);
        if (el.hasOwnProperty('amount')) {
            sum += parseFloat(el.amount);
        }
    }
    const tax = 0.07 * sum;
    const total = tax + sum;
    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(sum)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(0.07 * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">{ccyFormat(tax)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(total)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
ColumnGroupingTable.propTypes = {
    rows: PropTypes.any,
    addField: PropTypes.func,
    deleteRow: PropTypes.func,
    onChange: PropTypes.func,
    addFieldDisabled: PropTypes.bool
};
