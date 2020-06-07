
import {SET_STATUS} from '../actions';

const defaultState={
    link: [],
    status: 'checking'
}

export default function status(state = defaultState, action){
    switch (action.type){
        case SET_STATUS:
            return Object.assign({}, state, {
                isConnected: action.status
            })
        default:
            return state;
    }
}