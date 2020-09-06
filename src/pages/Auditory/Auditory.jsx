import React, {useEffect, useState} from 'react';
import style from './Auditory.module.css';
import film from '../../assets/img/film1.png'
import cartoon from '../../assets/img/cartoon1.png'
import lessons from '../../assets/img/Language.png'

import {
    IonCol,
    IonContent, IonFooter,
    IonHeader,
    IonImg, IonLabel,
    IonList,
    IonPage,
    IonRow, IonText, IonTitle, IonToolbar
} from "@ionic/react";

import {readFromStorage, saveToStorage} from "../../api/deviceStorageApi";
import {useHistory} from "react-router";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {connect} from "react-redux";
import {eraseVideos} from "../../redux/videoGlaryReducer";
import { IoMdArrowBack} from "react-icons/all";
import {Plugins} from "@capacitor/core";
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
import {useStorage} from "@ionic/react-hooks/storage";
const { AdMob, Toast } = Plugins;
const { App } = Plugins;

// const PHOTO_STORAGE = "photos";
// export function usePhotoGallery() {}

// const { get, set } = useStorage();

const Auditory = (props) => {

    // useEffect(() => {
    //     const loadSaved = async () => {
    //         const photosString = await get(PHOTO_STORAGE);
    //         const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
    //         for (let photo of photos) {
    //             const file = await readFile({
    //                 path: photo.filepath,
    //                 directory: FilesystemDirectory.Data
    //             });
    //             photo.base64 = `data:image/jpeg;base64,${file.data}`;
    //         }
    //         setPhotos(photos);
    //     };
    //     loadSaved();
    // }, [get, readFile]);



    // AdMob.initialize('ca-app-pub-9026860289947957/7169746763');

    AdMob.initialize('ca-app-pub-9026860289947957~9632258574');
    const options = {
        adId: 'ca-app-pub-9026860289947957/7169746763',
        // adId: 'ca-app-pub-3940256099942544/6300978111',
        adSize: AdSize.SMART_BANNER,
        position: AdPosition.BOTTOM_CENTER,
        hasTabBar: true,  // make it true if you have TabBar Layout.
        tabBarHeight: 56  // you can assign custom margin in pixel default is 56
    };

    const showBanner=()=>{
        AdMob.showBanner(options)
            .then(
                async (value) => {
                    console.log(value);  // true
                    // alert(JSON.stringify(value))
                    await Toast.show({
                        text: 'Showing Banner AD.'
                    })
                },
                (error) => {
                    console.error(error); // show error
                }
            );
    }
    AdMob.addListener('onAdLoaded', async (info) => {
       // alert('Showing TabBar Banner AD.');
    });

    const hideBanner=()=> {
        AdMob.hideBanner().then(
            async (value) => {
                await Toast.show({
                    text: 'Banner AD Hidden'
                })
                console.log(value);  // true
            },
            (error) => {
                console.error(error); // show error
            }
        );
    }

    App.addListener('backButton', (e) => {
        window.location.assign('/language')
    });

    let screenOrientation = ScreenOrientation
    screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
    let history = useHistory()

    const [selectedAuditory, setSelectedAuditory] = useState(null)

    const loadAuditory = async () => {
        let data = await readFromStorage('auditory_id')
        if (data) {
            setSelectedAuditory(data)
        }
    }
    // const saveFilms = () => {
    //     saveToStorage('auditory_id', 1)
    // }
    // const saveCartoons = () => {
    //     saveToStorage('auditory_id', 2)
    // }
    // const saveLessons = () => {
    //     saveToStorage('auditory_id', 2)
    // }
    useEffect(() => {
        if (selectedAuditory) {
        } else {
            loadAuditory()
        }
    }, [selectedAuditory])
    useEffect(()=>{
        // alert('ok')
        showBanner()
        saveToStorage('last_page_size',1)
        props.eraseVideos()
    },[])
    return (
        <IonPage>
            <IonHeader className='ion-text-center'>
                <IonToolbar>
                   <div className={style.header_area}>
                        {/*<label className={style.header_back_arrow}*/}
                        {/*       onClick={() => {*/}
                        {/*           window.location.assign('/language')*/}
                        {/*       }}*/}
                        {/*>*/}
                        {/*    <IoMdArrowBack size='2rem'*/}
                        {/*                   className={style.icons}/>*/}
                        {/*</label>*/}
                        <div className={style.header_text}>
                            <IonTitle
                                className={style.font}
                            >Please Select</IonTitle>
                        </div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={style.content}>
                    <IonCol className={style.auditory_slogan}>
                        <IonText className={style.auditory_slogan_text}>
                            Watch Learn
                        </IonText>
                    </IonCol>
                    <IonList className={style.content_auditory}
                             style={{backgroundColor: 'transparent'}}
                    >
                        <IonRow>
                            <IonCol
                                onClick={
                                    () => {
                                        // saveFilms()
                                        saveToStorage('auditory_id', 3)
                                        hideBanner()
                                        setSelectedAuditory(3)
                                        window.location.assign('/videogalary')
                                    }
                                }
                                className='ion-text-center'
                            >
                                <IonImg
                                    className={style.logo}
                                    src={lessons}/>
                                <IonLabel
                                    className={selectedAuditory == 3 && style.active}
                                >Lessons</IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                         <div className={style.logos}>
                             <IonCol
                                 onClick={
                                     () => {
                                         saveToStorage('auditory_id', 1)
                                         hideBanner()
                                         setSelectedAuditory(1)
                                         window.location.assign('/videogalary')
                                     }
                                 }
                                 className='ion-text-center'
                             >
                                 <IonImg
                                     className={style.logo}
                                     src={film}/>
                                 <IonLabel
                                     className={selectedAuditory == 1 && style.active}
                                 >Films</IonLabel>
                             </IonCol>
                             <IonCol
                                 onClick={
                                     ()=>{
                                         saveToStorage('auditory_id', 2)
                                         hideBanner()
                                         setSelectedAuditory(2)
                                         window.location.assign('/videogalary')
                                     }
                                 }
                                 className='ion-text-center'
                             >
                                 <IonImg
                                     className={style.logo}
                                     src={cartoon}/>
                                 <IonLabel
                                     className={selectedAuditory == 2 && style.active}
                                 >Cartoons</IonLabel>
                             </IonCol>
                         </div>
                        </IonRow>
                    </IonList>
                </div>
            </IonContent>
            <IonFooter>
                <div style={{display: "flex", alignItems: "center", padding: "0px 1rem"}}>
                    <IonRow className={style.aboutUs}>
                        <IonToolbar>
                            <label className={style.header_back_arrow}
                                   onClick={() => {
                                       hideBanner()
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
            {/*<IonFooter>*/}
            {/*    <IonRow>*/}
            {/*        <IonCol className='ion-text-center ion-no-margin ion-no-padding'>*/}
            {/*            <IonButton*/}
            {/*                expand='full'*/}
            {/*                shape='round'*/}
            {/*                href='/language'*/}
            {/*                className='ion-no-padding  ion-text-center'*/}
            {/*                // onClick={() => {*/}
            {/*                //     history.goBack()*/}
            {/*                // }}*/}
            {/*            >*/}
            {/*                Prev*/}
            {/*            </IonButton>*/}
            {/*        </IonCol>*/}
            {/*        <IonCol className='ion-text-center ion-no-margin ion-no-padding'>*/}
            {/*            <IonButton*/}
            {/*                expand='full'*/}
            {/*                shape='round'*/}
            {/*                href='/videogalary'*/}
            {/*                className='ion-no-padding ion-text-center'*/}
            {/*                // onClick={() => {*/}
            {/*                //     history.push('/videogalary')*/}
            {/*                // }}*/}
            {/*            >*/}
            {/*                Next*/}
            {/*            </IonButton>*/}
            {/*        </IonCol>*/}
            {/*    </IonRow>*/}
            {/*</IonFooter>*/}
        </IonPage>
    );
}

export default connect (null,{eraseVideos})(Auditory);
