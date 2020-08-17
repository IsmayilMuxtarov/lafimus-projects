import React, {useEffect, useState} from 'react';
import style from './About.module.css';
import flag from '../../assets/img/lafimus_logo.png'
import {AiOutlineLike, IoMdArrowBack} from "react-icons/all";

// IoMdArrowBack
import {
    IonCol,
    IonContent, IonFooter,
    IonHeader,
    IonImg,
    IonPage,
    IonRow, IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {withRouter} from "react-router";
import {Plugins} from "@capacitor/core";
const { App } = Plugins;
const About = () => {
    App.addListener('backButton', (e) => {
        // return false
        // e.preventDefault()
// alert('ssdsd')

        window.location.assign('/language')

    });

    return (
        <IonPage>
            <IonHeader className='ion-text-center'>
                <IonToolbar>
                    <div className={style.header_area}>
                    {/*<label className={style.header_back_arrow}*/}
                    {/*      onClick={() => {*/}
                    {/*          window.location.assign('/language')*/}
                    {/*      }}*/}
                    {/*>*/}
                    {/*    <IoMdArrowBack size='2rem'*/}
                    {/*                   className={style.icons}/>*/}
                    {/*</label>*/}
                        <div className={style.header_text}>
                            <IonTitle
                                className={style.font}
                            >About Us</IonTitle>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-text-center'>
                <IonCol className={style.content}>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' className={style.selected_country_col}>
                            <IonImg src={flag} className={style.selected_country_logo}/>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' className={style.selected_country_col}>

                            <IonText>
                                <b>Company Name</b>: Lafimus Group
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' className={style.selected_country_col}>
                            <IonText>
                                <b>Email</b>: lafimusgroup@gmail.com
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' className={style.selected_country_col}>
                            <IonText>
                                <b>Phone</b>: +994 50 274 05 00
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <div className={style.like}>
                            {/*<AiOutlineLike/>*/}
                        </div>
                    </IonRow>
                </IonCol>
            </IonContent>
            <IonFooter>
                <div style={{display: "flex", alignItems: "center", padding: "0px 1rem"}}>
                    <IonRow className={style.aboutUs}>
                        <IonToolbar>
                            <label className={style.header_back_arrow}
                                  onClick={() => {
                                      window.location.assign('/language')
                                  }}
                            >
                                <IoMdArrowBack size='2rem'
                                               className={style.icons}/>
                            </label>
                        </IonToolbar>
                    </IonRow>
                </div>
            </IonFooter>
        </IonPage>
    );
}

export default withRouter(About);
