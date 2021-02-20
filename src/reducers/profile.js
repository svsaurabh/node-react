import {
    AUTHOR_ERROR,
    IS_AUTHOR,
    PROFILE_LOADED,
    PROFILE_ERROR
} from '../actions/types'

const initialState = {
    profile: null,
    loading : true,
    errors: {}
}

export default function (state = initialState, action) {
    const {type, payload } = action;
    switch(type){
        case PROFILE_LOADED:{
            return {
                ...state,
            loading : false,
            profile: payload
            }
        }
        case IS_AUTHOR:
            return {
                ...state,
                loading: true,
                profile: payload
            }
        case PROFILE_ERROR:
        case AUTHOR_ERROR:
            return {
                ...state,
                loading: true,
                errors: payload 
            }
        default:
            return state;
    }
}