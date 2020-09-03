import {
    SUBMIT_DATA_SUCCESS,
} from '../actions/action-type';

const INITIAL_STATE = {
    data: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBMIT_DATA_SUCCESS:
            return { ...state, data: action.data }
        default:
            return state
    }
}

