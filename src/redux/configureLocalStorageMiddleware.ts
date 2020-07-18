import * as _ from 'lodash';
import * as reduxStorage from 'redux-storage';
import * as redux from 'redux';
import reduxStorageEngine from 'redux-storage-engine-localstorage';
import store from './store';

const engine = reduxStorageEngine('my-save-key');
const whiteList: Function = (action: redux.AnyAction, actionWhiteList: any) => {
    if(Array.isArray(actionWhiteList)) {
        return actionWhiteList.length === 0 ? true : actionWhiteList.indexOf(action.type) !== -1;
    }

    return actionWhiteList(action.type);
}

const storeWhiteList: Function = (currentState: any, persistedStoreWhitelist: any) => {
    let saveState = {};

    persistedStoreWhitelist.forEach((storeKey: any) => {
        _.merge(saveState, {[storeKey]: {}});
        // const saveStateKey = saveState[storeKey];
        // _.merge({[storeKey]: saveState }, currentState[storeKey]);
    });

    return saveState;
}

export default (actionBlacklist = [], actionWhitelist = [], persistentStoresWhitelist = []) => {
    const blackListActions = [...actionBlacklist, reduxStorage.LOAD, reduxStorage.SAVE];
    return ({dispatch, getState}: any) => {
        return (next: any) => (action: redux.AnyAction) => {
            const result = next(action);
            
            const isOnBlacklist = blackListActions.indexOf(action.type) !== -1;
            const isOnWhitelist = whiteList(action, actionWhitelist);

            if(!isOnBlacklist && isOnWhitelist) {
                const currentState = getState();
                const saveState = persistentStoresWhitelist.length > 0 
                    ? storeWhiteList(currentState, persistentStoresWhitelist)
                    : currentState;

                const dispatchSave = () => dispatch({type: reduxStorage.SAVE});
                return engine.save(saveState).then(dispatchSave); 
            }
            
            return result;
        }
    }

}

