import React from 'react';
import {videoApi} from "../api/appApi";

const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const setVideosData = (videos) => {
    return {
        type: SET_VIDEO_DATA,
        videos
    }
}

const ERASE_VIDEO_DATA = 'ERASE_VIDEO_DATA';
export const eraseVideoData = () => {
    return {
        type: ERASE_VIDEO_DATA,
    }
}

let initialState = {
    videos: [],
    auditory: [{
        'Films': 1,
        'Cartoons': 2
    }]
}

let loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIDEO_DATA:
            return {
                ...state, videos: [...state.videos, ...action.videos]
            }
        case ERASE_VIDEO_DATA:
            return {
                ...state, videos: []
            }
        default :
            return state;
    }
}


export const getVideos = (video_type, language_id, page, api_key) => {
    return async (dispatch) => {
        let response = await videoApi.getVideos(video_type, language_id, page, api_key);
        if (response.resultCode === 0) {
            // debugger
            dispatch(setVideosData(response.data.data))
        }
    }
}

export const eraseVideos = () => {
    return (dispathc) => {
        dispathc(eraseVideoData())
    }
}
export default loginReducer;
