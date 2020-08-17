import React, {useEffect, useState} from 'react';
import style from './VideoPlayer.module.css';
import {
    IonButton, IonCol,
    IonContent, IonFooter,
    IonImg, IonItem,
    IonList, IonPage, IonRow,
    IonText, IonThumbnail, IonToolbar
} from "@ionic/react";
import {readFromStorage} from "../../api/deviceStorageApi";
import {videoApi} from "../../api/appApi";
import {useHistory} from "react-router";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {IoMdArrowBack} from "react-icons/all";
import {Plugins} from "@capacitor/core";
const { App } = Plugins;


const VideoPlayer = React.memo(() => {
    App.addListener('backButton', (e) => {
         window.location.assign('/videogalary')
    });
    let screenOrientation = ScreenOrientation
    screenOrientation.unlock()
    let history = useHistory()
    const [savedVideo, setSavedVideo] = useState()
    const [showedVideo, setShowedVideo] = useState(
        {
            id: '',
        }
    )
    const [sameTypeVideo, setSameTypeVideo] = useState()
    const [apiKey, setApiKey] = useState()

    const loadFromStorage = async () => {
        let data = await readFromStorage('selected_video')
        if (data) {
            setSavedVideo(data)
        }
        let data1 = await readFromStorage('api_key')
        if (data1) {
            setApiKey(data1.API_KEY)
        }
    }
    const getVideo = async (video, apiKey) => {
        let data = await videoApi.getVideo(video, apiKey)
        if (data.resultCode == 0) {
            // console.log(data)
            setShowedVideo(data.data.video.youtube_id)
            // setShowedVideo(Object.entries(data.data.video))
            setSameTypeVideo(data.data.uygun_video)
        }
    }
    // console.log(sameTypeVideo)
    useEffect(() => {
        if (!savedVideo) {
            loadFromStorage()
        } else if (savedVideo && apiKey) {
            getVideo(savedVideo, apiKey)
        } else if (savedVideo) {
        }
    }, [savedVideo, apiKey])
    // console.log(showedVideo)
    // youtube.openVideo()
    //https://www.youtube.com/embed/CRXAKiXFfuc

    const Video = (props) => {
        return (
            <iframe
                allowFullScreen
                className={style.iframe}
                // key={props.value.id}
                src={`https://www.youtube.com/embed/${props.value}`}
                frameBorder="0">
            </iframe>
        )
    }
    let sameVideos
    if (sameTypeVideo) {
        sameVideos = sameTypeVideo.map((value, key) =>
            (<IonList key={key} onClick={() => {
                setShowedVideo(value.youtube_id)
            }}>
                <IonItem>
                    <IonCol size='2'>
                        <IonThumbnail>
                            <IonImg src={`http://img.youtube.com/vi/${value.youtube_id}/0.jpg`}/>
                        </IonThumbnail>
                    </IonCol>
                    <IonCol size='10'>
                        <div className={style.textArea}>
                            <IonText>
                                {value.name}
                            </IonText>
                        </div>
                    </IonCol>
                </IonItem>
            </IonList>)
        )
    }
    return (
        <IonPage>
            <IonContent>
                <IonCol
                    size='12'
                    className={style.frame_div}
                >
                    <Video value={showedVideo}/>
                </IonCol>
                <IonCol
                    className={style.same_div}
                >
                    {sameVideos}
                </IonCol>
                <IonButton
                    onClick={() => {
                        window.location.assign('/videogalary')
                    }}
                    expand='full'
                    shape='round'
                    color='light'
                    className={style.more_button}>
                    <p>
                        <IoMdArrowBack size='2rem' className={style.icons}/>
                    </p>
                </IonButton>
            </IonContent>
            {/*<IonFooter>*/}
            {/*    <div style={{display: "flex", alignItems: "center", padding: "0px 1rem"}}>*/}
            {/*        <IonRow className={style.aboutUs}>*/}
            {/*            <IonToolbar>*/}
            {/*                <label className={style.header_back_arrow}*/}
            {/*                       onClick={() => {*/}
            {/*                           window.location.assign('/videogalary')*/}
            {/*                       }}*/}
            {/*                >*/}
            {/*                    <IoMdArrowBack size='2rem'*/}
            {/*                                   className={style.icons}/>*/}
            {/*                </label>*/}
            {/*            </IonToolbar>*/}
            {/*        </IonRow>*/}
            {/*    </div>*/}
            {/*</IonFooter>*/}
            {/*<IonFooter>*/}
            {/*    /!*<IonRow>*!/*/}
            {/*    <IonToolbar className='ion-text-center ion-no-margin ion-no-padding'>*/}
            {/*        <IonButton*/}
            {/*            expand='full'*/}
            {/*            shape='round'*/}
            {/*            className='ion-no-padding  ion-text-center'*/}
            {/*            href='/videogalary'*/}
            {/*            onClick={(e) => {*/}
            {/*                // screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)*/}
            {/*                // console.log(screenOrientation.type)*/}
            {/*                // e.preventDefault()*/}
            {/*                // history.push('/videogalary')*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Prev*/}
            {/*        </IonButton>*/}
            {/*    </IonToolbar>*/}
            {/*    /!*</IonRow>*!/*/}
            {/*</IonFooter>*/}
        </IonPage>
    );
})

export default VideoPlayer;
