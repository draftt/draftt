
import {SET_STATUS} from '../actions';

const defaultState={
    link: [],
    status: 'checking'
}

export default function pavilionInfo(state = defaultState, action){
    switch (action.type){
        case SET_STATUS:
            return Object.assign({}, state, {
                status: action.status
            })
        default:
            return state;
    }
}