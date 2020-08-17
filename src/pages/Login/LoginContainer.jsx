import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

// const mapStateToProps = (state) => ({
//     isAuth: state.auth.isAuth,
//     selectedCountry: state.country.selectedCountry
// })

const LoginContainer = (props) => {

    return (
        <Login {...props}/>
    )
}

export default compose(
    withRouter,
    // connect(mapStateToProps, {})
)
(LoginContainer);
