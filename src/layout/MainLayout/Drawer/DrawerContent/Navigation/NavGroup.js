import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// material-ui
import { Box, List, Typography, Collapse } from '@mui/material';

// project import
import NavItem from './NavItem';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;
    const [open, setOpen] = useState(true);
    const [openReport, setOpenReport] = useState(true);
    const [openTransaction, setOpenTransaction] = useState(true);

    const handleClick = (info) => {
        info === 'products' ? setOpen(!open) : info === 'reports' ? setOpenReport(!openReport) : setOpenTransaction(!openTransaction);
    };
    const navCollapse = item.children?.map((menuItem) => {
        switch (menuItem.type) {
            case 'collapse':
                return (
                    <div key={menuItem.id}>
                        <NavItem
                            key={menuItem.id}
                            item={menuItem}
                            level={1}
                            onClickCollapse={handleClick}
                            open={menuItem.id === 'products' ? open : menuItem.id === 'reports' ? openReport : openTransaction}
                        />
                        <Collapse
                            key={menuItem.id}
                            in={menuItem.id === 'products' ? open : menuItem.id === 'reports' ? openReport : openTransaction}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {menuItem.children.map((ele) => (
                                    <NavItem key={ele.id} item={ele} level={2} />
                                ))}
                            </List>
                        </Collapse>
                    </div>
                );
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });

    return (
        <List
            subheader={
                item.title &&
                drawerOpen && (
                    <Box sx={{ pl: 3, mb: 1.5 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.title}
                        </Typography>
                        {/* only available in paid version */}
                    </Box>
                )
            }
            sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
            {navCollapse}
        </List>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
