import React from 'react';
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from "@material-ui/core/Button";
import {loginAdmin} from "../../actions/user";
import {useDispatch} from "react-redux";

const AnonimusBar = () => {
    const dispatch = useDispatch();
    return (
        <>
            <FacebookLogin/>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => dispatch(loginAdmin())}
                startIcon={<AccountCircleIcon/>}
                style={{marginLeft: '10px'}}
            >
                Login in admin
            </Button>
        </>
    );
};

export default AnonimusBar;