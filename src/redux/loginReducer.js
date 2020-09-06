import React from 'react';
import {authApi} from "../api/appApi";

const SET_USER_DATA='SET_USER_DATA';
export const setUserData=(id,email,login,isAuth)=>{
    return{
        type:SET_USER_DATA,
        payload:{
            id,email,login,isAuth
        }
    }
}


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth:false,
    isLoadingStatus:false
}
let loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: action.payload.isAuth
            }
        default :
            return state;
    }
}

export const authMe=()=>{
    return async (dispatch)=>{
        let response= await authApi.auth()
        // debugger;
        if(response.resultCode===0){                //user eger saytda qeydiyyatdan kecibse sifir qaytarir
            let {id, login, email}=response.data;   // datani parchalayiriq
            dispatch(setUserData(id, email, login,true)); // datani gonderirik yeni state kimi
        }
    }
}


export default loginReducer;
