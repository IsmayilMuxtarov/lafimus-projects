import React, {useEffect, useState} from 'react';
import style from './Language.module.css';
import flag from '../../assets/img/earth.png'
import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent, IonFooter,
    IonHeader, IonIcon,
    IonImg,
    IonLabel,
    IonList,
    IonPage,
    IonRow, IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import se from '../../assets/img/se.png'
import tr from '../../assets/img/tr.png'
import ch from '../../assets/img/ch.png'
import es from '../../assets/img/es.png'
import Ge from '../../assets/img/ge.png'
import ru from '../../assets/img/ru.png'
import en from '../../assets/img/en.png'
import kr from '../../assets/img/kr.png'
import jp from '../../assets/img/jp.png'
import fr from '../../assets/img/fr.png'
import sa from '../../assets/img/sa.png'
import pt from '../../assets/img/pt.png'
// import about from '../../assets/img/aboutUs.png'
// import moreApps from '../../assets/img/grid-outline.svg'
import {languageApi} from "../../api/appApi";
import {readFromStorage, saveToStorage} from "../../api/deviceStorageApi";
import {useHistory, useParams} from "react-router-dom";
import {withRouter} from "react-router";
// import info_icon from '../../assets/img/information-outline.svg'
import {AiOutlineInfoCircle, AiOutlineShareAlt, AiOutlineStar, FiGrid} from "react-icons/all";
import {Market} from '@ionic-native/market';
import {WebIntent} from '@ionic-native/web-intent'
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;


const LanguageContainer = ({match}) => {
    App.addListener('backButton', (e) => {
        // return false
        // e.preventDefault()
// alert('ssdsd')

        window.location.assign('/language')

    });
    const [showAlert1, setShowAlert1] = useState(false);
    const [language, setLanguage] = useState(null)
    const [apiKey, setApiKey] = useState(null)
    const [selectedLang, setSelectedLang] = useState(null)

    let url=JSON.stringify(match)
    // alert(url)

    const getLanguages = async (apiKey) => {
        let data = await languageApi.get(apiKey)
        if (data.resultCode === 0) {
            setLanguage(data.data)
        } else {
            alert('LangApi something is wrong')
        }
    }
    const getApiKey = async (key) => {
        let data = await readFromStorage(key)
        if (data) {
            setApiKey(data.API_KEY)
        }
    }
    const loadLang = async (key) => {
        let data = await readFromStorage(key)
        if (data) {
            setSelectedLang(data)
        }
    }
    useEffect(() => {
        if (apiKey) {
            getLanguages(apiKey)
        } else {
            getApiKey('api_key')
        }
    }, [apiKey])
    let history = useHistory()
    useEffect(() => {
        if (selectedLang) {
            saveToStorage('language', selectedLang)
        } else {
            loadLang('language')
        }
    }, [selectedLang])
    let flagArray = [
        {'name': 'SE', 'url': se},
        {'name': 'TR', 'url': tr},
        {'name': 'ES', 'url': es},
        {'name': 'CN', 'url': ch},
        {'name': 'GE', 'url': Ge},
        {'name': 'RU', 'url': ru},
        {'name': 'KR', 'url': kr},
        {'name': 'PT', 'url': pt},
        {'name': 'SA', 'url': sa},
        {'name': 'JP', 'url': jp},
        {'name': 'FR', 'url': fr},
        {'name': 'EN', 'url': en}]
    let [flagUrl, setFlagUrl] = useState()
    let languages;
    const flagSort = (key) => {
        return flagArray[1]`.${key}`
    }
    if (language) {
        languages = language.map((lang, key) => {
            let code = lang.name
            let url
            if (flagArray.filter((val) => {
                    if (val.name == code) url = val.url
                }
            ))
                return (
                    <IonCol key={key} size='4 '
                            style={{backgroundColor: 'transparent'}}
                            className={style.flags_center}
                    >
                        <IonImg src={url ? url : flag}
                                className={style.flags}
                                onClick={(e) => {
                                    setSelectedLang(lang.id)
                                    window.location.assign('/auditory')

                                    // setTimeout(() => {
                                    //     history.push('/auditory')
                                    // }, 500)
                                }}
                        >
                        </IonImg>
                        <IonLabel className={(selectedLang == lang.id) && style.active || style.country_text}>
                            {lang.title}
                        </IonLabel>
                    </IonCol>
                )
        })
    }


    let webIntent = WebIntent

    const options = {
        action: webIntent.ACTION_SEND,
        type: "text/plain",
        extras: {
            'android.intent.extra.TEXT': "https://play.google.com/store/apps/details?id=com.laf_vid.com"
        }
    }
    return (

        <IonPage>
            <IonHeader className='ion-text-center'>
                <IonToolbar>
                    <IonTitle
                        className={style.font}
                    >Choose Video Language</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-text-center'>
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    cssClass='my-custom-class'
                    header={''}
                    subHeader={''}
                    message={'Will Soon..'}
                    buttons={['OK']}
                />
                <IonCol className={style.content}>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' className={style.selected_country_col}>
                            <IonImg src={flag} className={style.selected_country_logo}/>
                        </IonCol>
                    </IonRow>
                    <IonList style={{backgroundColor: 'transparent'}}
                             className={style.flags_center}>
                        <IonRow className='ion-justify-content-center'>
                            {languages}
                        </IonRow>
                    </IonList>
                </IonCol>
            </IonContent>
            <IonFooter>
                <div style={{display: "flex", alignItems: "center", padding: "0px 1rem"}}>
                    <IonRow className={style.aboutUs}>
                        <IonCol size='3' className={style.aboutUs_col}>
                            <IonLabel onClick={() => {
                                // alert('test1')
                                window.location.assign('/about')

                            }}
                                      className={style.info_btns}>
                                <div className={style.icon_text_center}>
                                    <AiOutlineInfoCircle size='2rem'
                                                         className={style.icons}/>
                                </div>
                                <IonText className={style.info_texts}

                                >About Us</IonText>
                            </IonLabel>
                        </IonCol>
                        <IonCol size='3' className={style.aboutUs_col}>
                            <IonLabel onClick={() => {
                                webIntent.startActivity(
                                    options,
                                    () => {
                                        // alert('Success')
                                    },
                                    () => {
                                        alert('Failed to open URL via Android Intent')
                                    }
                                )
                            }
                            } className={style.info_btns}>
                                <div className={style.icon_text_center}>
                                    <AiOutlineShareAlt size='2rem' className={style.icons}/>
                                </div>
                                <IonText className={style.info_texts}>Share</IonText>
                            </IonLabel>
                        </IonCol>
                        <IonCol size='3' className={style.aboutUs_col}>
                            <IonLabel onClick={() => {
                                // window.location.assign('https://play.google.com/store/apps/details?id=com.laf_vid.com')
                                Market.open('com.laf_vid.com');
                            }} className={style.info_btns}>
                                <div className={style.icon_text_center}>
                                    <AiOutlineStar size='2rem'
                                                   className={style.icons}/>
                                </div>
                                <IonText className={style.info_texts}>Rate</IonText>
                            </IonLabel>
                        </IonCol>
                        <IonCol size='3' className={style.aboutUs_col}>
                            <IonLabel onClick={() => {
                                // alert('Will soon ")')
                                setShowAlert1(true)

                            }} className={style.info_btns}>
                                <div className={style.icon_text_center}>
                                    <FiGrid size='2rem'
                                            className={style.icons}/>
                                </div>
                                {/*<IonIcon icon={moreApps}/>*/}
                                <IonText className={style.info_texts}>More</IonText>
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                </div>
            </IonFooter>
        </IonPage>
    );
}

export default withRouter(LanguageContainer);
