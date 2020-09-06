import React from 'react';
import {countryApi} from "../api/appApi";
// import img1 from '../assets/img/slide_photo.png'

const SET_COUNTRIES = 'SET_COUNTRIES';
export const setCountries = (countries) => {
    return {
        type: SET_COUNTRIES,
        countries
    }
}
const SET_SELECT_COUNTRY='SET_SELECT_COUNTRY'
export const set_selected_country=(selectedCountry)=>({
    type:SET_SELECT_COUNTRY,
    selectedCountry
})
const CHANGE_NAVBAR_TOGGLE_STATUS='CHANGE_NAVBAR_TOGGLE_STATUS'
export const setNavbarToggleStatus=(toggleStatus)=>{
    return{
        type:CHANGE_NAVBAR_TOGGLE_STATUS,
        toggleStatus
    }
}

let initialState = {
    countries:[
        {
            // id: 0,
            // code: 'az',
            // name:'aze'
        }
    ],
    selectedCountry:null,
    welcomeText:'Welcome to our friendly application',
    textForLangChoose:'Please Select Your Country',
    textNextButton:'Next'
}

let languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.countries
            }
        case SET_SELECT_COUNTRY:{
            return {
                ...state,
                selectedCountry: action.selectedCountry
            }
        }
        // case SAVE_DATA_LOCAL:{
        //    setCountryStorage(action.payload.countryKey, action.payload.countryValue)
        // }
        default :
            return state;
    }
}


export const getCountryList=()=>
{
    return async (dispatch)=>{
        let response= await countryApi.getCountry()
        // alert(JSON.stringify(response))
        if(response.resultCode==0){
            // alert(response.data)
            dispatch(setCountries(response.data))
        }else (
            alert('sorry API problem..')
        )
    }
}
export const setSelectedCountry=(countryName)=>{
    return (dispatch)=>{
        dispatch(set_selected_country(countryName))
    }
}



export default countryReducer;
