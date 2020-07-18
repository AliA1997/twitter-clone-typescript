import * as redux from 'redux';
import * as Thunk from 'redux-thunk';
import *  as localStorageMiddleware from './configureLocalStorageMiddleware';
import * as initialState from './initialState';
import * as ActionTypes from './actionTypes';
import * as rootReducer from './reducers';

const middlewares: any[] = [
    Thunk,
    localStorageMiddleware
];

export default redux.createStore(
    rootReducer as any,
    redux.applyMiddleware(...middlewares)
);

