import React, {useEffect, useState} from 'react';
import style from './Login.module.css';
import '../../theme/variables.css';
import google from '../../assets/img/google-logo.png'
import fb from '../../assets/img/fb-logo.png'
import logo from '../../assets/img/wl_logo_1024.png'
import {
    IonCol,
    IonContent,
    IonGrid,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    IonImg,
    IonHeader, IonAlert
} from "@ionic/react";
import {readFromStorage, saveToStorage} from "../../api/deviceStorageApi";
import {authApi} from "../../api/appApi";
import {useHistory} from "react-router";
import "@codetrix-studio/capacitor-google-auth";
import * as axios from "axios";
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

const Login = (props) => {

    const [showAlert1, setShowAlert1] = useState(false);
    const [apiKey, setApiKey] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    let [countryId, setStoredCountry] = useState(null)
    let [fbUser, setFbUser] = useState()
    const ownLoginId = 1
    const googleId = 2
    const facebookId = 3
    let history = useHistory()

    const googleSignIn = async () => {
        setShowLoading(true)

        let googleData = await Plugins.GoogleAuth.signIn()
        if (googleData) {
            setShowLoading(true)
            // alert(JSON.stringify(googleData))
            let email = googleData.email
            let password = googleData.email
            let data = await authApi.registerSosial(email, password, countryId, googleId)
            // debugger
            if (data) {
                setShowLoading(true)
                setApiKey(data.data)
            } else {
                alert(data.messagess)
            }
        }
    }

    const signInFb = async (props) => {
        const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
        const result = await Plugins.FacebookLogin.login({permissions: FACEBOOK_PERMISSIONS});
        if (result && result.accessToken) {
            // alert('userId:' + result.accessToken.userId)
            // alert('token:' + result.accessToken.token)
            const response = await axios.get(
                `https://graph.facebook.com/
                ${result.accessToken.userId}?fields=name,email&
                access_token=${result.accessToken.token}`)
            if (response) {
                setFbUser(response.data.email)
                setShowLoading(true)

                let email = response.data.email
                let password = response.data.email
                let data = await authApi.registerSosial(email, password, countryId, facebookId)
                // debugger
                if (data) {
                    setShowLoading(true)
                    setApiKey(data.data)
                } else {
                    alert(data.messagess)
                }
            } else {
                alert('something wrong FacebookApi')
            }
        }
    }

    const loggin = async (email, password) => {
        let data = await authApi.login(email, password)
        // alert('loggin')
        // debugger
        if (data.resultCode == 0) {
            setApiKey(data.data)
        } else {
            alert('email or password is wrong')
        }
    }
    const registerUser = async (email, password, country) => {
        let data = await authApi.register(email, password, country, ownLoginId)
        if (data.resultCode == 0) {
            setApiKey(data.data)
        } else {
            alert(data.messagess)
        }
    }

    // const getStoredCountry = async (key) => {
    //     let data = await readFromStorage(key)
        // setStoredCountry(data)
    // }
    useEffect(() => {
        if (apiKey) {
            // alert('api key yazilid')
            saveToStorage('api_key', apiKey)
            window.location.assign('/language')
            // setTimeout(() => {
            //     history.push("/language")
            // }, [1000])
        } else {
            // getStoredCountry('country_id')
        }
    }, [apiKey])

    useEffect(()=>{
        App.addListener('backButton', (e) => {
            setShowAlert1(true)
        });
    },[])
    return (
        <IonPage>
            <IonContent>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                    duration={2000}
                />
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    cssClass='my-custom-class'
                    header={''}
                    subHeader={''}
                    message={'Are you sure?'}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                // console.log('Confirm Cancel');
                                window.location.assign('/login')

                            }
                        },
                        {
                            text: 'Ok',
                            handler: () => {
                                // console.log('Confirm Ok');
                                App.exitApp()
                            }
                        }
                    ]}
                />
                {/*<IonHeader>*/}
                {/*    <IonToolbar>*/}
                {/*        <IonTitle>*/}
                {/*            /!*jdsjhdfkhjdfhjkshf*!/*/}
                {/*        </IonTitle>*/}
                {/*    </IonToolbar>*/}
                {/*</IonHeader>*/}
                <div className={style.content}>
                    <IonGrid className={style.margin_top_content}>
                        <IonRow>
                            <IonImg src={logo}/>
                        </IonRow>
                        <IonToolbar color='transparent'>
                            <IonTitle>
                                <IonText
                                    className={`ion-text-wrap ion-text-center ion-text-capitalize ion-align-items-center`}
                                    color='light'
                                    size='small'>
                                    <p
                                        className={style.bordered_text}
                                    >
                                        Login With
                                    </p>
                                </IonText>
                            </IonTitle>
                        </IonToolbar>
                        <IonRow className={style.sosial_row}>
                            <IonCol onClick={() => {
                                    signInFb()
                                }}
                                className={style.sosialFb}
                            >
                                <IonImg
                                    className={style.col_fb}
                                    src={fb}/>
                            </IonCol>
                            <IonCol onClick={() => {
                                    googleSignIn()
                                }}
                                className={style.sosialGg}
                            >
                                <IonImg
                                    className={style.col_gg}
                                    src={google}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow className='ion-align-self-end ion-justify-content-center'>
                            <a className={style.font}
                                href="https://video.shahin-electronics.com/watchLearn">Terms Of Use User Data</a>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Login;
