import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../actions/user";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {NavLink as ToLink} from "react-router-dom";
import Box from "@material-ui/core/Box";


const UserBar = () => {
    const user = useSelector(state => state.authorization.user);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                component={ToLink} to={'/addCocktail'}
                color="inherit"
            >
                Add cocktail
            </Button>
            <Button
                onClick={handleMenu}
                color="inherit"
                style={{textTransform: 'capitalize', marginLeft: 'auto'}}
            >
                    {user.avatar && <Avatar alt={user.displayName} src={user.avatar} />}
                    <Box m={1}>
                        <Typography m={2} variant='h6'>{user.displayName}</Typography>
                    </Box>
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem component={ToLink} to='/myPublications'>My publications</MenuItem>
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserBar;