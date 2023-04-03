import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { CloseOutlined } from '@ant-design/icons';
import AnimateButton from '../components/@extended/AnimateButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(4)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialog-container': {
        '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '500px' // Set your width here
        }
    }
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseOutlined />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default function CustomizedDialogs(props) {
    return (
        <div>
            <BootstrapDialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    {props.title}
                </BootstrapDialogTitle>
                <DialogContent dividers>{props.children}</DialogContent>
                <DialogActions>
                    <AnimateButton>
                        <Button fullWidth size="large" variant="text" onClick={props.handleClose}>
                            Close
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button fullWidth size="large" variant="contained" color="primary" onClick={props.handleSave}>
                            Save
                        </Button>
                    </AnimateButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
