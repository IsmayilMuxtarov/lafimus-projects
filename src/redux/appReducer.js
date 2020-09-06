import React from 'react';
import {authMe} from "./loginReducer";
import {readFromStorage} from "../api/deviceStorageApi";

const SET_API_KEY = 'SET_API_KEY';
export const setApiKeyUser = (api_key) => {
    return {
        type: SET_API_KEY,
        api_key
    }
}
// const key='eff03cff98b9212e9b7f1c7ebbdd298a960eee5090f7e8a53a1339c4546a08626c45dd3a8c52603d';
// saveToStorage('api_key',key)

const loadApiKey=async ()=>{
    // debugger
    let data= await readFromStorage('api_key')
    if(data){
        return data.API_KEY
    }
}
let apiFromStorage=loadApiKey()
let initialState = {
    initialised: false,
    api_key:null|apiFromStorage,
    navbarToggle: false
}

let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_API_KEY:{
            return {
                ...state,
                api_key: action.api_key
            }
        }
        default :
            return state;
    }
}

export const setApiKey =  (api_key) => {
    return async (dispatch) => {
        let response= await authMe(api_key)
        if(response.resultCode==0){
            dispatch(setApiKeyUser())
        }
    }
}

export default appReducer;
