import {LOGOUT_USER, REGISTER_USER_RES} from "../actions/user";

const initialState = {
    user: {},
};

const user = (state = initialState, action) => {
    if(action.type === REGISTER_USER_RES){
        return {...state, user: action.data, errorReg: false};
    }
    if(action.type === LOGOUT_USER){
        return {...state, user: {}}
    }
    return state;
};

export default user;