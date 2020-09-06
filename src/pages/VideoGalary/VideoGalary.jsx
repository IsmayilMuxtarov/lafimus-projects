import React, {useEffect, useState} from 'react';
import style from './VideoGalary.module.css';
import {
    IonButton,
    IonCol,
    IonContent, IonFooter,
    IonHeader,  IonImg,
    IonList, IonLoading,
    IonPage,  IonRow,
    IonTitle, IonToolbar
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
        window.location.assign('/auditory')
        // setCurrentPage(2)
    });

    let screenOrientation = ScreenOrientation
    screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)

    const [videos, setVideos] = useState(props.videos)
    const [apiKey, setApiKey] = useState()
    const [auditoryId, setAuditoryId] = useState()
    const [languageId, setLanguage] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [showLoading, setShowLoading] = useState(false)
    const [map,setMap] =useState()

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
        let data3 = await readFromStorage('selected_video')
        if (data3) {
            setMap(data3)
        }
        let data4 = await readFromStorage('last_page_size')
        if (data4) {
            // alert('klsksk')
            setCurrentPage(data4)
        }
    }
// const saveVideoId= async ()=>{
//        let data=await saveToStorage('video_id')
//     if(data){
//         alert(data)
//     }
// }

    useEffect(() => {
        getSavedData()

    }, [])

    useEffect(()=>{
        if(map){
            // alert('ok')

        }
    },[map])

    useEffect(() => {
        // debugger
        if ((auditoryId && languageId && apiKey )&& (currentPage==1)) {
            props.getVideos(auditoryId, languageId, 1, apiKey)
        } else {
            console.log(videos)
        }
    }, [auditoryId, languageId, apiKey])
    //setVideos([...videos,data.data.data])

    useEffect(() => {
        setVideos(props.videos)

        console.log(props.videos)
    }, [props.videos])

    useEffect(() => {
        setShowLoading(true)

        // debugger
        if(currentPage!=1){
            // alert('lll')
            saveToStorage('last_page_size',currentPage)
            props.getVideos(auditoryId, languageId, currentPage, apiKey)
        }
    }, [currentPage])


    // useEffect(() => {
    //     // setShowLoading(true)
    //     // alert('1st')
    //
    //     // return ()=>{alert('last')}
    // }, [])


    const addWatchCnt= async (video_id, apikey)=>{
        let response= await addWatchCount.addWatch(video_id,apikey)
        if(response){
            // alert(JSON.stringify(response))
            window.location.assign('/videoplayer')
        }
    }
    let videoByThree = videos.map((video, key) => (
        <IonCol key={key}
                size='6'
                onClick={ () => {
                    saveToStorage('selected_video', video.id)
                    addWatchCnt(video.id,apiKey)
                    // saveToStorage('video_id', video.id)
                    // console.log(video)
                }}>
            {/*<a id={video.id}></a>*/}
            {/*<a href={`#`+video.id}></a>*/}
            <IonImg
                className={style.video_snippet}
                onClick={() => {
                    // history.push('/videoplayer')
                }}
                src={`http://img.youtube.com/vi/${video.youtube_id}/0.jpg`}
            >
            </IonImg>
            {/*views and */}
            <p className={style.views}>Viewed<span> {video.id>10000? video.look_count+(video.id-5000) :video.id }</span></p>
            <p className={style.video_name}>{video.name}</p>

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
                        // props.getVideos(auditoryId, languageId, currentPage, apiKey)
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
        </IonPage>
    );
})

export default connect(mapStateToProps, {getVideos,eraseVideos})(VideoGalary);
