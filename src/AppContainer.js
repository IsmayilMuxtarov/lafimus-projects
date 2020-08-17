import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import App from "./App";
import {compose} from "redux";
import {readFromStorage} from "./api/deviceStorageApi";
import {withRouter} from "react-router";

let mapStateToProps = (state) => ({
    initialised: state.app.initialised,
    api_key: state.app.api_key
})

const AppContainer=(props)=> {
    const [apiKey, setApiKey]=useState(props.api_key)

    const getStoredApiKey = async (key) => {
        let data = await readFromStorage(key)
        // console.log(data)
        setApiKey(data)
    }
    useEffect(() => {
        if(!apiKey){
            getStoredApiKey( 'api_key')
        }
    }, [apiKey])

    return (
        <App apiKey={apiKey}/>
    );
}

export default compose(
    connect(mapStateToProps, {}),
    // withRouter
)(AppContainer);
