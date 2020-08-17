import React, {useEffect, useState} from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
import Country from "./Country";
import {getCountryList, getCountryStorage, setCountryStorage, setSelectedCountry} from "../../redux/countryReducer";

let mapStateToProps = (state) => ({
    countries: state.country.countries,
    welcomeText: state.country.welcomeText,
    textForLangChoose: state.country.textForLangChoose,
    textNextButton: state.country.textNextButton,
    selectedCountry:state.country.selectedCountry
})

const CountryContainer = ({countries, getCountryList,...props}) => {
    const [countrie, setCountries] = useState(countries)
    useEffect(() => {
        getCountryList()
        console.log('component did mount')
    }, [])

    useEffect(() => {
        setCountries(countries)
        // console.log('component shall mount')
    }, [countries])
    return (
        <Country countries={countrie} {...props}/>
    )
}

export default compose(
    connect(mapStateToProps, {getCountryList,setSelectedCountry}),
    // withRouter
)(CountryContainer)
