import {
    AUTHOR_ERROR,
    IS_AUTHOR,
    PROFILE_LOADED,
    PROFILE_ERROR,
    PUBLISH_LOADED,
    PUBLISH_ERROR,
    PUBLISH_POSTED
} from '../actions/types'

const initialState = {
    publishes: [],
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
        case PUBLISH_LOADED:
            return{
                ...state,
                publishes : payload
        }
        case PUBLISH_POSTED:
            return{
                ...state,
                loading: false
            }
        case PUBLISH_ERROR:
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