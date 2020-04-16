import axios from "axios";
import Toast from "light-toast";
import {push} from 'connected-react-router';

export const REGISTER_USER_RES = 'REGISTER_USER_RES';

export const LOGOUT_USER = 'LOGOUT_USER';


export const regUserRes = data => ({type: REGISTER_USER_RES, data});

export const logoutUserSuc = () => ({type: LOGOUT_USER});

export const loginWithFacebook = (facebookData) => async dispatch => {
    const data = await axios.post('http://localhost:8000/user/facebook', facebookData);
    dispatch(regUserRes(data.data));
    dispatch(push('/'))
};

export const loginAdmin = () => async dispatch => {
    const user = await axios.post('http://localhost:8000/user/sessions', {username : "Admin",password: '12345'});
    dispatch(regUserRes(user.data));
    dispatch(push('/'))
};

export const logoutUser = () => async (dispatch, getState) => {
    const user = getState().authorization.user;
    const header = {'Authorization': "Token " + user.token};

    await axios.delete('http://localhost:8000/user/sessions', {headers: header});
    dispatch(logoutUserSuc());
    dispatch(push('/login'));
    Toast.success('Logout success!', 500);
};