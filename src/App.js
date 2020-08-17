import React, {useEffect, useState} from 'react';
// import style from './App.css';
import './theme/variables.css';
import {
    IonApp,
    IonRouterOutlet,
} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import {Redirect, Route, Switch} from "react-router";
import Auditory from "./pages/Auditory/Auditory";
import Language from "./pages/Language/Language";
import VideoGalary from "./pages/VideoGalary/VideoGalary";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
// import NoPage from "./pages/NoPage/NoPage";
import Login from "./pages/Login/Login";
import CountryContainer from "./pages/Country/CountryContainer";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {readFromStorage} from "./api/deviceStorageApi";
// import Test from "./pages/Test";
import LoginContainer from "./pages/Login/LoginContainer";
import { browserHistory } from './pages/History';
import About from "./pages/About/About";


const App = (props) => {
    let screenOrientation = ScreenOrientation
    screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
    // let history = createBrowserHistory()
    const [apiKey, setApiKey] = useState()
    const [checkToRedirect, setCheckToRedirect] = useState(false)
    // const [checkToCountrySelected, setCheckToCountrySelected] = useState(false)

    // const history = createBrowserHistory()
    const getStoredApiKey = async (key) => {
        let data = await readFromStorage(key)
        // console.log(data)
        if (data) {
            setApiKey(data.API_KEY)
        }
    }

    useEffect(() => {
        if (apiKey) {
            setCheckToRedirect(true)
        } else {
            getStoredApiKey('api_key')
            setCheckToRedirect(false)
        }
    }, [apiKey])

    useEffect(() => {

    }, [checkToRedirect])

    return (
        <IonApp>
            <IonReactRouter
                history={browserHistory}
            >
                <IonRouterOutlet>
                    {/*<Route path="/country" render={() =>*/}
                    {/*    checkToRedirect ?<Language/>*/}
                    {/*    :<LoginContainer/>*/}
                    {/*    // :<CountryContainer/>*/}
                    {/*}/>*/}
                    <Route path="/login"
                           render={()=><LoginContainer/>}
                    />
                    <Route path="/auditory" render={()=><Auditory/>}/>
                    <Route path="/about" render={()=><About/>}/>
                    <Route path="/language" render={()=><Language/>}/>
                    <Route path="/videogalary" render={()=><VideoGalary/>}/>
                    <Route path="/videoplayer" render={()=><VideoPlayer/>}/>
                    <Route exact path="/" render={() =>
                        checkToRedirect ?<Language/>:<LoginContainer/>
                    }/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>

    );
}

export default App;
