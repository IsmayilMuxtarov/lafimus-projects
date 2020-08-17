import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonCard, IonCardContent,
    IonContent, IonFooter, IonImg, IonLabel,
    IonPage, IonSelect, IonSelectOption, IonThumbnail,
} from "@ionic/react";
import style from './Country.module.css'
import {readFromStorage, saveToStorage} from "../../api/deviceStorageApi";
import img1 from '../../assets/img/slide_photo.png'
// import { browserHistory } from '../History';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions'
import {Plugins} from '@capacitor/core';


const Country = React.memo((props) => {

    // const ionViewWillLeave=()=> {
    //     let options = {
    //         direction: 'up',
    //         duration: 500,
    //         slowdownfactor: 3,
    //         slidePixels: 20,
    //         iosdelay: 100,
    //         androiddelay: 150,
    //         fixedPixelsTop: 0,
    //         fixedPixelsBottom: 60
    //     }
    //
    //     NativePageTransitions.slide(options)
    //         .then(alert('success'))
    //         .catch(alert('error'));
    // }
    // NativePageTransitions.slide(options);
    // history.push(page);
    // const openPage=(page)=> {
    //
    //
    // }
    // let transitionPageEffect=NativePageTransitions
    //
    // const slidePage=(href)=> {
    //     // debugger
    //     NativePageTransitions.slide({
    //         "href" : href
    //     });
    // }

    // function slide(href) {
    //     NativePageTransitions.slide({
    //         "href" : href
    //     });
    // }
    //
    // var options = {
    //     "direction"      : "up", // 'left|right|up|down', default 'left' (which is like 'next')
    //     "duration"       :  500, // in milliseconds (ms), default 400
    //     "slowdownfactor" :    4, // overlap views (higher number is more) or no overlap (1), default 3
    //     "iosdelay"       :  100, // ms to wait for the iOS webview to update before animation kicks in, default 50
    //     "androiddelay"   :  150  // same as above but for Android, default 50
    // };
    //
    // NativePageTransitions.slide(
    //     options,
    //     function (msg) {console.log("success: " + msg)}, // called when the animation has finished
    //     function (msg) {alert("error: " + msg)} // called in case you pass in weird values
    // );
    // // const slidePage=()=>{
    // //     transitionPageEffect.slide()
    // //
    // //     // NavController.setRoot('login')
    // // }

    let [countryId, setCountryId] = useState(props.selectedCountry)
    let [storedCountry, setStoredCountry] = useState(null)
    let [isSelectedCountry, setSelectedCountry] = useState(null)
    const [visibleBtn, setVisibleBtn] = useState(true)

    const getStoredCountry = async (key) => {
        let data = await readFromStorage(key)
        setStoredCountry(data)
    }
    const getStoredIsSelected = async (key) => {
        let data = await readFromStorage(key)        // console.log(data)
        setSelectedCountry(data)
    }
    const getStoredBtnVisible = async (key) => {
        let data = await readFromStorage(key)
        setVisibleBtn(data)
    }

    getStoredIsSelected('isCountrySelected')
    useEffect(() => {
        props.setSelectedCountry(countryId)
        if (isSelectedCountry) {
            // debugger
            saveToStorage('country_id', countryId)
            saveToStorage('isCountrySelected', true)
            saveToStorage('isBtnVisible', false)
            getStoredCountry('country_id')
            getStoredBtnVisible('isBtnVisible')
        }
        // console.log('will Mount')
        return () => {

        }
    }, [countryId])

    const countries = props.countries.map((value, id) => {
        return (
            <IonSelectOption key={id} value={value.id}>
                {value.name}
            </IonSelectOption>
        )
    })
    // clearAll();
    const selectCountry = (event) => {
        setSelectedCountry(true)
        setVisibleBtn(false)
        // setStoredCountry(event.detail.value)
        setCountryId(event.detail.value)
    }


    return (
        <IonPage>
            <IonContent>
                <div className={style.content}>
                    <IonCard className={style.card_content}>
                        <IonCardContent>
                            <IonThumbnail className={style.slideImg}>
                                <IonImg src={img1}/>
                            </IonThumbnail>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardContent>
                            <IonLabel>
                                {props.textForLangChoose}
                            </IonLabel>
                            <IonSelect
                                onIonChange={selectCountry}
                                value={storedCountry ? storedCountry : null}
                            >
                                {countries}
                            </IonSelect>
                        </IonCardContent>
                    </IonCard>

                </div>
            </IonContent>
            <IonFooter>
                <IonButton
                    expand='full'
                    disabled={visibleBtn}
                    className='ion-padding-horizontal'
                    shape='round'
                    // onClick={()=>slide('/login')
                    // }
                    href='/login'
                >
                    {props.textNextButton}
                </IonButton>
            </IonFooter>
        </IonPage>
    )
})

export default Country;

