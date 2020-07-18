import initialState, { IAction } from '../initialState';
import * as ActionTypes from '../actionTypes';
import * as actions from '../actions/rantActions';

const reducer: Function = (state: Object =initialState.rant, action: IAction) => {
    switch(action.type) {
        case ActionTypes.HANDLE_RANT_FORM_CHANGE:
            return {};
        case ActionTypes.GET_RANTS:
            return {};
        case ActionTypes.GET_RANT:
            return {};
        case ActionTypes.CREATE_RANT:
            return {};
        case ActionTypes.UPDATE_RANT:
            return {};
        default:
            return state;
    }
}

export default reducer;