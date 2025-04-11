import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'rgba(0, 0, 255, 0.7)' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <ConstructionIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Construction Cost Estimator
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
