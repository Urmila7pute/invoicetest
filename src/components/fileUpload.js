import React, { useState } from 'react';

import { Box, Typography, Badge, Avatar } from '@mui/material';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';

const classes = {
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        borderStyle: 'dashed',
        borderColor: '#c8c6c6',
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        '&:hover p,&:hover svg,& img': {
            opacity: 1
        },
        '& p, svg': {
            opacity: 0.4
        },
        '&:hover img': {
            opacity: 0.3
        }
    },
    noMouseEvent: {
        pointerEvents: 'none'
    },
    iconText: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        width: '30%',
        padding: 10
    },
    hidden: {
        display: 'none'
    },
    onDragOver: {
        '& img': {
            opacity: 0.3
        },
        '& p, svg': {
            opacity: 1
        }
    }
};

export const FileUpload = ({
    accept,
    imageButton = true,
    hoverLabel = 'Click or drag to upload file',
    dropLabel = 'Drop file here',
    width = '600px',
    height = '100px',
    backgroundColor = '#fff',
    image: {
        url = null,
        imageStyle = {
            height: 'inherit'
        }
    } = {},
    onChange,
    onDrop,
    page
}) => {
    console.log('page', page);
    const [imageUrl, setImageUrl] = useState(url);
    const [labelText, setLabelText] = useState(hoverLabel);
    // const [isDragOver, setIsDragOver] = useState(false);
    // const [isMouseOver, setIsMouseOver] = useState(false);
    const stopDefaults = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const dragEvents = {
        // onMouseEnter: () => {
        //     setIsMouseOver(true);
        // },
        // onMouseLeave: () => {
        //     setIsMouseOver(false);
        // },
        onDragEnter: (e) => {
            stopDefaults(e);
            // setIsDragOver(true);
            setLabelText(dropLabel);
        },
        onDragLeave: (e) => {
            stopDefaults(e);
            // setIsDragOver(false);
            setLabelText(hoverLabel);
        },
        onDragOver: stopDefaults,
        onDrop: (e) => {
            stopDefaults(e);
            setLabelText(hoverLabel);
            // setIsDragOver(false);
            if (imageButton && e.dataTransfer.files[0]) {
                setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
            }
            onDrop(e);
        }
    };

    const handleChange = (event) => {
        if (imageButton && event.target.files[0]) {
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        }

        onChange(event);
    };
    return (
        <>
            <input onChange={handleChange} accept={accept} style={{ display: 'none' }} id="file-upload" type="file" />

            {page === 'addProduct' && (
                <label htmlFor="file-upload" {...dragEvents} style={{ ...classes.root }}>
                    <Box bgcolor={backgroundColor} style={{ ...classes.noMouseEvent }}>
                        <>
                            <Box className={classes.iconText}>
                                <CloudUploadOutlined />
                                <Typography>{labelText}</Typography>
                            </Box>
                        </>
                    </Box>
                </label>
            )}
            {page === 'user' && (
                <label htmlFor="file-upload" {...dragEvents} style={{ cursor: 'pointer' }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <Avatar style={{ width: 22, height: 22, border: `2px solid ` }}>
                                <PlusOutlined />
                            </Avatar>
                        }
                    >
                        <Avatar src={imageUrl} style={{ width: 56, height: 56 }} />
                    </Badge>
                </label>
            )}
        </>
    );
};
