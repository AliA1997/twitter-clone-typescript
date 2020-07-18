import initialState, { IAction } from '../initialState';
import * as ActionTypes from '../actionTypes';
import * as actions from '../actions/authActions';

const reducer: Function = (state: Object =initialState.auth, action: IAction) => {
    switch(action.type) {
        case ActionTypes.HANDLE_AUTH_FORM_CHANGE:
            return {};
        case ActionTypes.GET_USERS:
            return {};
        case ActionTypes.GET_USER:
            return {};
        case ActionTypes.LOGIN:
            return {};
        case ActionTypes.LOGOUT:
            return {};
        case ActionTypes.REGISTER:
            return {};
        default:
            return state;
    }
}

export default reducer;