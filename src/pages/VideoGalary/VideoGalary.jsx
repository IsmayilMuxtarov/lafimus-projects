import React, {useEffect, useState} from 'react';
import style from './VideoGalary.module.css';
import {
    IonButton,
    IonCol,
    IonContent, IonFooter,
    IonHeader,
    IonImg, IonLabel,
    IonList, IonLoading,
    IonPage,
    IonRow,
    IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave
} from "@ionic/react";
import {readFromStorage, saveToStorage} from "../../api/deviceStorageApi";
import {useHistory} from "react-router";
import {connect} from "react-redux";
import {eraseVideos, getVideos} from "../../redux/videoGlaryReducer";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {IoMdArrowBack} from "react-icons/all";
import {Plugins} from "@capacitor/core";
import {addWatchCount} from "../../api/appApi";

let mapStateToProps = (state) => ({
    videos: state.video.videos
})
const { App } = Plugins;

const VideoGalary = React.memo((props) => {
    App.addListener('backButton', (e) => {
        // return false
        // e.preventDefault()
// alert('ssdsd')

        window.location.assign('/auditory')
    });// debugger
    let screenOrientation = ScreenOrientation
    screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)

    const [videos, setVideos] = useState(props.videos)
    const [apiKey, setApiKey] = useState()
    const [auditoryId, setAuditoryId] = useState()
    const [languageId, setLanguage] = useState()
    const [currentPage, setCurrentPage] = useState(2)
    const [showLoading, setShowLoading] = useState(false)

    let history = useHistory()
    const getSavedData = async () => {
        let data = await readFromStorage('api_key')
        if (data) {
            setApiKey(data.API_KEY)
        }
        let data1 = await readFromStorage('language')
        if (data1) {
            setLanguage(data1)
        }
        let data2 = await readFromStorage('auditory_id')
        if (data2) {
            setAuditoryId(data2)
        }
    }

    useEffect(() => {
        getSavedData()
        // setFlag(true)
    }, [])

    useEffect(() => {
        // debugger
        if (auditoryId && languageId && apiKey) {
            props.getVideos(auditoryId, languageId, 1, apiKey)
        } else {
            console.log(videos)
        }
    }, [auditoryId, languageId, apiKey])
    //setVideos([...videos,data.data.data])

    useEffect(() => {
        setVideos(props.videos)
    }, [props.videos])

    useEffect(() => {
        setShowLoading(true)
        // return ()=>{
        //     alert('kskks')
        // }
    }, [currentPage])


    useEffect(() => {
        // setShowLoading(true)
        // alert('1st')

        // return ()=>{alert('last')}
    }, [])
    const addWCount= async (video_id, apikey)=>{
        let response= await addWatchCount.addWatch(video_id,apikey)
        if(response){
            alert(JSON.stringify(response))
        }
    }
    let videoByThree = videos.map((video, key) => (
        <IonCol key={key}
                size='6'
                onClick={ () => {
                    // debugger
                    // alert(video.id)
                    addWCount(video.id,apiKey)
                    //Apiye videoId gonderilir   video.id
                    //video/watchCount/?id=de
                    // debugger


                }}>
            <IonImg
                className={style.video_snippet}
                onClick={() => {
                    saveToStorage('selected_video', video.id)
                    window.location.assign('/videoplayer')

                    // history.push('/videoplayer')
                }}
                src={`http://img.youtube.com/vi/${video.youtube_id}/0.jpg`}
            >
            </IonImg>
            {/*views and */}
            <IonLabel>455 <span> views</span></IonLabel>
        </IonCol>
    ))
    // ionViewDidEnter() {
    //     this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
    //         // do nothing
    //     }
    // }
    //
    // ionViewWillLeave() {
    //     this.subscription.unsubscribe();
    // }
    // useIonViewDidEnter(() => {
    //     // this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
    //         alert('ionViewDidEnter event fired');
    //     })


    // useIonViewDidLeave(() => {
    //     alert('ionViewDidLeave event fired');
    // });
    //
    // useIonViewWillEnter(() => {
    //     alert('ionViewWillEnter event fired');
    // });
    //
    // useIonViewWillLeave(() => {
    //     alert('ionViewWillLeave event fired');
    // });

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
                <IonHeader className='ion-text-center'>
                    <IonToolbar>
                        <IonTitle className={`ion-text-center ${style.font}`}>
                            Choose Video And Enjoy
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className={style.content}>
                    <IonRow>
                        <IonCol size='12'>
                        </IonCol>
                    </IonRow>
                    <IonList style={{backgroundColor: 'transparent'}}>
                        <IonRow>
                            {videoByThree}
                        </IonRow>
                    </IonList>

                </div>
                <IonButton
                    onClick={() => {
                        setCurrentPage(currentPage => currentPage + 1)
                        props.getVideos(auditoryId, languageId, currentPage, apiKey)

                    }}
                    expand='full'
                    shape='round'
                    color='success'
                    className={style.more_button}
                >
                    <p>
                        More
                    </p>
                </IonButton>
                {/*</IonCol>*/}

            </IonContent>
            <IonFooter>
                <div style={{display: "flex", alignItems: "center", padding: "0px 1rem"}}>
                    <IonRow className={style.aboutUs}>
                        <IonToolbar>
                            <label className={style.header_back_arrow}
                                   onClick={() => {
                                       window.location.assign('/auditory')
                                   }}
                            >
                                <IoMdArrowBack size='2rem'
                                               className={style.icons}/>
                            </label>
                        </IonToolbar>
                    </IonRow>
                </div>
            </IonFooter>
            {/*<IonFooter>*/}
                {/*<IonRow>*/}
                {/*    <IonCol className='ion-text-center ion-no-margin ion-no-padding'>*/}
                {/*        <IonButton*/}
                {/*            expand='full'*/}
                {/*            shape='round'*/}
                {/*            className='ion-no-padding  ion-text-center'*/}
                {/*            href='/auditory'*/}
                {/*            onClick={() => {*/}
                {/*                props.eraseVideos()*/}
                {/*            }}>*/}
                {/*            Prev*/}
                {/*        </IonButton>*/}
                {/*    </IonCol>*/}

                    {/*<IonCol className='ion-text-center ion-no-margin ion-no-padding'>*/}
                    {/*    <IonButton*/}
                    {/*        expand='full'*/}
                    {/*        shape='round'*/}
                    {/*        href='/videoplayer'*/}
                    {/*        className='ion-no-padding ion-text-center'*/}
                    {/*        // onClick={() => {*/}
                    {/*        //     history.push('/videoplayer')*/}
                    {/*        // }}*/}
                    {/*    >*/}
                    {/*        Next*/}
                    {/*    </IonButton>*/}
                    {/*</IonCol>*/}
                {/*</IonRow>*/}
            {/*</IonFooter>*/}
        </IonPage>
    );
})

export default connect(mapStateToProps, {getVideos,eraseVideos})(VideoGalary);
