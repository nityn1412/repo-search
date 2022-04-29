import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Avatar} from "@mui/material";

const HeaderBar = () => {
    /* Standard App Bar */
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <Avatar alt="logo" src="db_icon_orange.png" sx={{ width: 25, height: 25, ml: -1 }} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Repository List
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderBar;
