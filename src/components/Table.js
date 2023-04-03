import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Avatar
} from '@mui/material';
import { DeleteOutlined, EyeOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons';
import Rating from '@material-ui/lab/Rating';
// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from '../components/@extended/Dot';
     
// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Unpaid';
            break;
        case 1:
            color = 'success';
            title = 'Paid';
            break;
        case 2:
            color = 'error';
            title = 'Cancel';
            break;
        case 3:
            color = 'blue';
            title = 'Refund';
            break;
        case 4:
            color = 'purple';
            title = 'Enabled';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};
OrderStatus.propTypes = {
    status: PropTypes.number
};
const PaymentMethod = ({ paymentMethod }) => {
    let color;

    switch (paymentMethod) {
        case 'Google pay':
            color = 'primary';
            break;
        case 'Cash':
            color = 'success';
            break;
        case 'Credit Card':
            color = 'error';
            break;
        default:
            color = 'primary';
    }

    return <Chip label={paymentMethod} color={color} variant="outlined" size="small" />;
};
PaymentMethod.propTypes = {
    paymentMethod: PropTypes.string
};

const ExpenseReportStatus = ({ expensesStatus }) => {
    let color;
    let title;
    console.log('expensesStatus', expensesStatus);
    switch (expensesStatus) {
        case 0:
            color = 'success';
            title = 'Approved';
            break;
        case 1:
            color = 'error';
            title = 'Pending';
            break;
        case 2:
            color = 'success';
            title = 'Active';
            break;
        case 3:
            color = 'error';
            title = 'Disabled';
            break;
        case 4:
            color = 'success';
            title = 'Credit';
            break;
        case 5:
            color = 'error';
            title = 'Debit';
            break;
        default:
            color = 'primary';
            title = 'None';
            break;
    }
    console.log(color, title);
    return <Chip label={title} color={color} variant="outlined" size="small" />;
};

ExpenseReportStatus.propTypes = {
    expensesStatus: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable(props) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    const { headCells, rows } = props;
    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.align}
                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.trackingNo}
                                    selected={isItemSelected}
                                >
                                    {headCells.map((ele) => {
                                        if (ele.id === 'trackingNo') {
                                            return (
                                                <TableCell component="th" id={labelId} scope="row" align={`${ele.align}`}>
                                                    <Link color="secondary" component={RouterLink} to="">
                                                        {row[`${ele.id}`]}
                                                    </Link>
                                                </TableCell>
                                            );
                                        } else if (ele.id === 'orderStatus') {
                                            return (
                                                <TableCell align={`${ele.align}`}>
                                                    <OrderStatus status={row[`${ele.id}`]} />
                                                </TableCell>
                                            );
                                        } else if (ele.id === 'bill' || ele.id === 'price' || ele.id === 'amount') {
                                            return (
                                                <TableCell align={`${ele.align}`}>
                                                    {' '}
                                                    <span>
                                                        &#8377;
                                                        <NumberFormat value={row[`${ele.id}`]} displayType="text" thousandSeparator />
                                                    </span>
                                                </TableCell>
                                            );
                                        } else if (ele?.id === 'rating') {
                                            return (
                                                <TableCell align={`${ele.align}`}>
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            /* padding: 1px; */
                                                            backgroundColor: '#ececec',
                                                            width: '40px',
                                                            borderRadius: 5,
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        <Rating
                                                            name="customized-1"
                                                            defaultValue={1}
                                                            max={1}
                                                            style={{ fontSize: '0.7rem', alignItems: 'center', padding: 2 }}
                                                        />
                                                        {row[`${ele.id}`]}
                                                    </span>
                                                </TableCell>
                                            );
                                        } else if (ele?.id === 'paymentType') {
                                            return (
                                                <TableCell align={`${ele.align}`}>
                                                    <PaymentMethod paymentMethod={row[`${ele.id}`]} />
                                                    {/* <Chip label={row[`${ele.id}`]} color="primary" variant="outlined" /> */}
                                                </TableCell>
                                            );
                                        } else if (ele?.id === 'expensesStatus' || ele?.id === 'status') {
                                            return (
                                                <TableCell align={`${ele.align}`}>
                                                    <ExpenseReportStatus expensesStatus={row[`${ele.id}`]} />
                                                    {/* <Chip label={row[`${ele.id}`]} color="primary" variant="outlined" /> */}
                                                </TableCell>
                                            );
                                        } else if (ele?.id === 'action') {
                                            return (
                                                <TableCell key={ele?.id} align={ele?.align}>
                                                    <EyeOutlined style={{ fontSize: '20px', paddingRight: 10 }} />
                                                    <EditOutlined style={{ fontSize: '20px', paddingRight: 10 }} />
                                                    <DeleteOutlined
                                                        style={{ fontSize: '20px', paddingRight: 10 }} //onClick={() => props.deleteRow(i)}
                                                    />
                                                    <DownloadOutlined style={{ fontSize: '20px', paddingRight: 10 }} />
                                                </TableCell>
                                            );
                                        } else if (ele.id === 'usersName') {
                                            return (
                                                <TableCell key={ele?.id} align={ele?.align}>
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            gap: 5
                                                        }}
                                                    >
                                                        <Avatar alt={row[`${ele.id}`]} sx={{ width: 24, height: 24 }} src={row.avtar} />
                                                        {row[`${ele.id}`]}
                                                    </span>
                                                </TableCell>
                                            );
                                        } else if (ele.id === 'attachment') {
                                            return (
                                                <TableCell key={ele?.id} align={ele?.align}>
                                                    {row[`${ele.id}`] ? <DownloadOutlined style={{ fontSize: '20px' }} /> : `N/A`}
                                                </TableCell>
                                            );
                                        } else {
                                            return <TableCell align={`${ele.align}`}>{row[`${ele.id}`]}</TableCell>;
                                        }
                                    })}
                                    {/* <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.trackingNo}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus status={row.status} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <span>
                                            &#8377;
                                            <NumberFormat value={row.bill} displayType="text" thousandSeparator />
                                        </span>
                                    </TableCell>*/}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
